// components/SearchResultsView.tsx
import React, { useEffect, useState, useRef } from "react";
import { AppToastProvider, useToast } from "../ToastProvider";
import CustomerAnalyzer, { Customer } from "../../../services/CustomerAI";
import AutomateWorkflowModal from "./AutomateWorkflowModal";
import PauseSubscriptionsModal from "../GenerativeAI/overdueFlow/PauseSubscriptionModal";
import CancelSubscriptionsModal from "../GenerativeAI/overdueFlow/CancelSubscriptionModal";
import EmailModal from "./EmailModal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Mail, X } from "lucide-react";

// Import our modular components
import ChatView from "./chatUI/ChatView";
import CanvasPanel from "./chatUI/CanvasPanel";
import ARAgingSummary from "./ARAgingSummary";
import SubscriptionForm from "./SubscriptionFlow";
import PaymentRemainderModal from "@/app/(billing)/revenuebee/[[...index]]/_components/GenerativeAI/overdueFlow/PaymentRemainderModal";
import { Button } from "cb-sting-react-ts";

// Define a message type for the conversation
interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  response?: {
    analysis: string;
    sections: any[];
    recommendation?: string;
    suggestedActions?: string[];
  };
  emailSent?: {
    count: number;
    sentAt: Date;
    fromEmail?: string;
  };
  emailReview?: {
    count: number;
    fromEmail: string;
    country?: string;
  };
  workflowAutomated?: boolean;
  customerList?: boolean;
  arAgingSummary?: boolean;
  revenueGrowth?: boolean;
  subscriptionFlow?: {
    stage:
      | "initial"
      | "uploadedDocument"
      | "processing"
      | "extracted"
      | "created";
    filename?: string;
  };
  sendToUSCustomers?: boolean;
  sendToEUCustWithoutOffer?: boolean;
  showABExperiment?: boolean;
  upgradeEmailSent?: {
    count: number;
    sentAt: Date;
    country?: string;
  };
  timestamp: Date;
}

interface SearchResultsViewProps {
  query: string;
  onBack: () => void;
  onSearch: (query: string) => void;
}

// Subscription data interface
interface SubscriptionData {
  customerId: string;
  customerEmail: string;
  plan: string;
  billingCycles: string;
  startDate: string;
  trialEnd: string;
  quantity: number;
  autoCollection: string;
}

// Empty subscription data for initial form
const emptySubscriptionData: SubscriptionData = {
  customerId: "",
  customerEmail: "",
  plan: "premium-annual",
  billingCycles: "12 cycles",
  startDate: new Date().toISOString().split("T")[0],
  trialEnd: "No trial",
  quantity: 1,
  autoCollection: "on",
};

// Default subscription data for document upload flow
const defaultSubscriptionData: SubscriptionData = {
  customerId: "CUST83797",
  customerEmail: "customer3796@example.com",
  plan: "premium-annual",
  billingCycles: "12 cycles",
  startDate: "2025-05-07",
  trialEnd: "No trial",
  quantity: 2,
  autoCollection: "on",
};

// Inner component that uses the toast hook
const SearchResultsViewInner: React.FC<SearchResultsViewProps> = ({
  query,
  onBack,
  onSearch,
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);

  // Use refs to keep track of the current state without causing re-renders
  const processingQueryRef = useRef<string | null>(null);
  const initialQueryProcessedRef = useRef(false);

  // Canvas states
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [canvasContentType, setCanvasContentType] = useState<
    | "customers"
    | "workflow"
    | "email"
    | "upgradeEmail"
    | "subscription"
    | "abTesting"
    | "remainderEmail"
    | "abExperiment"
  >("customers");

  // Form mode for subscription
  const [formMode, setFormMode] = useState<"edit" | "preview">("edit");

  // Common states
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSelectCustomersMode, setIsSelectCustomersMode] = useState(false);
  const [emailCustomers, setEmailCustomers] = useState<any[]>([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);

  // Subscription state
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>(
    emptySubscriptionData
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Workflow state (for canvas)
  const [daysBeforeExpiry, setDaysBeforeExpiry] = useState(5);
  const [days, setDays] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Modal states
  const [isAutomateModalOpen, setIsAutomateModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isRemainderEmailModalOpen, setRemainderIsEmailModalOpen] =
    useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // File input ref for document upload
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // Email review state
  const [emailReviewData, setEmailReviewData] = useState({
    customerCount: 0,
    sentAt: new Date(),
    fromEmail: "billing@yourcompany.com",
    content: "",
  });

  // Generate unique ID for messages
  const generateId = () =>
    `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Initialize customer analyzer
  const [customerAnalyzer] = useState(() => CustomerAnalyzer);

  // Get total customer count
  const getTotalOverdueCount = () => {
    return customerAnalyzer.getTotalOverdueCount();
  };

  // Get total payment issues count
  const getTotalPaymentIssuesCount = () => {
    return customerAnalyzer.getTotalPaymentIssuesCount();
  };

  // Get customer data
  const [customerData, setCustomerData] = useState(() => {
    // Get analyzer data
    const analysis = customerAnalyzer.analyzeCustomerData();

    return {
      missing: analysis.paymentIssues.noPaymentMethod,
      expired: analysis.paymentIssues.expiredPaymentMethod,
      expiring: analysis.paymentIssues.expiring || {
        count: 0,
        items: [],
      },
    };
  });

  // Get all customer data
  const getAllCustomers = () => {
    return customerAnalyzer.customerData || [];
  };

  // Initialize conversation with the first query
  useEffect(() => {
    // Only process initial query once
    if (query && !initialQueryProcessedRef.current) {
      initialQueryProcessedRef.current = true;

      // Add user message
      const newMessage: Message = {
        id: generateId(),
        type: "user",
        content: query,
        timestamp: new Date(),
      };

      setConversation([newMessage]);

      // Process the initial query
      processQuery(query);
    }
  }, [query]);

  // Process a query and generate a response
  const processQuery = (userQuery: string) => {
    // Skip if already processing this query
    if (processingQueryRef.current === userQuery) return;

    processingQueryRef.current = userQuery;
    setIsLoading(true);

    // Check for subscription creation query
    if (userQuery.toLowerCase().includes("create subscription")) {
      setTimeout(() => {
        // Add AI message to conversation with subscription flow flag
        setConversation((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "ai",
            content:
              "I can help you create a new subscription. How would you like to proceed?",
            subscriptionFlow: {
              stage: "initial",
            },
            timestamp: new Date(),
          },
        ]);

        setIsLoading(false);
        processingQueryRef.current = null;

        showToast({
          title: "Subscription Creator",
          description: "Choose how you'd like to create a subscription",
          variant: "primary",
          duration: 3000,
        });
      }, 1000);
      return;
    }

    // Check for specific queries
    if (userQuery.toLowerCase().includes("list customers")) {
      // Handle list customers action
      setTimeout(() => {
        const allCustomers = getAllCustomers();

        // Add AI message to conversation with customers list
        setConversation((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "ai",
            content: `I found ${allCustomers.length} customers in your account. Here's the complete list with their details.`,
            customerList: true,
            timestamp: new Date(),
          },
        ]);

        // Open canvas with customer data
        setActiveSection("All Customers");
        setIsSelectCustomersMode(false);
        setCanvasContentType("customers");
        setCanvasOpen(true);

        setIsLoading(false);
        processingQueryRef.current = null;
      }, 1500);
      return;
    } else if (
      userQuery
        .toLowerCase()
        .includes("what opportunities do i have to improve my revenue growth?")
    ) {
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "ai",
            content:
              "I've identified these revenue growth opportunities for your business:",
            response: null,
            revenueGrowth: true,
            timestamp: new Date(),
          },
        ]);

        setIsLoading(false);
        processingQueryRef.current = null;
      }, 1500);
      return;
    } else if (
      userQuery.toLowerCase().includes("send this email only to us customers")
    ) {
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "ai",
            content:
              "Sure, I'll send this email to 350 US customers. Should I proceed?",
            sendToUSCustomers: true,
            response: null,
            timestamp: new Date(),
          },
        ]);

        setIsLoading(false);
        processingQueryRef.current = null;
      }, 1500);
      return;
    } else if (
      userQuery
        .toLowerCase()
        .includes("send the same email to eu customers without the offer")
    ) {
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "ai",
            content:
              "Yes, I can send the email to 200 EU customers without the discount and also create an A/B experiment. Should I proceed?",
            sendToEUCustWithoutOffer: true,
            response: null,
            timestamp: new Date(),
          },
        ]);

        setIsLoading(false);
        processingQueryRef.current = null;
      }, 1500);
      return;
    }

    // Check for overdue or payment-related queries
    const isOverdueQuery =
      userQuery.toLowerCase().includes("overdue") ||
      userQuery.toLowerCase().includes("unpaid") ||
      userQuery.toLowerCase().includes("aging");

    const isPaymentMethodQuery =
      userQuery.toLowerCase().includes("payment method") ||
      userQuery.toLowerCase().includes("update payment");

    if (isOverdueQuery || isPaymentMethodQuery) {
      // Simulate processing time
      setTimeout(() => {
        // Get the AI response
        const aiResponse = customerAnalyzer.generateResponse(userQuery);

        // Add AI message to conversation with AR aging summary for overdue queries
        if (isOverdueQuery) {
          setConversation((prev) => [
            ...prev,
            {
              id: generateId(),
              type: "ai",
              content: aiResponse.analysis,
              arAgingSummary: true,
              response: {
                analysis: aiResponse.analysis,
                sections: aiResponse.sections,
                recommendation: aiResponse.recommendation,
                suggestedActions: aiResponse.suggestedActions,
              },
              timestamp: new Date(),
            },
          ]);
        } else {
          // Add AI message to conversation with payment method sections
          setConversation((prev) => [
            ...prev,
            {
              id: generateId(),
              type: "ai",
              content: aiResponse.analysis,
              response: {
                analysis: aiResponse.analysis,
                sections: aiResponse.sections,
                recommendation: aiResponse.recommendation,
              },
              timestamp: new Date(),
            },
          ]);
        }

        setIsLoading(false);
        processingQueryRef.current = null;
      }, 1500);
      return;
    }

    // Use the CustomerAnalyzer service for other queries
    setTimeout(() => {
      // Get the AI response
      const aiResponse = customerAnalyzer.generateResponse(userQuery);

      // Add AI message to conversation with response sections
      setConversation((prev) => [
        ...prev,
        {
          id: generateId(),
          type: "ai",
          content: aiResponse.analysis,
          response: {
            analysis: aiResponse.analysis,
            sections: aiResponse.sections,
            recommendation: aiResponse.recommendation,
          },
          timestamp: new Date(),
        },
      ]);

      setIsLoading(false);
      processingQueryRef.current = null;
    }, 1500);
  };

  // Handle new user query
  const handleNewQuery = (newQuery: string) => {
    // Skip if already processing a query or loading
    if (isLoading || processingQueryRef.current) return;

    // Add user message to conversation
    const newMessage: Message = {
      id: generateId(),
      type: "user",
      content: newQuery,
      timestamp: new Date(),
    };

    setConversation((prev) => [...prev, newMessage]);

    // Process the new query
    processQuery(newQuery);

    // Notify the parent component
    onSearch(newQuery);
  };

  // Toggle canvas visibility
  const toggleCanvas = () => {
    setCanvasOpen(!canvasOpen);
  };

  // Get filtered customer data based on section key
  const getCustomerData = (sectionKey: string) => {
    // If "All Customers" is selected, return all customers
    if (sectionKey?.toLowerCase() === "all customers") {
      return getAllCustomers();
    }

    const analysis = customerAnalyzer.analyzeCustomerData();

    // Filter based on section title
    if (sectionKey?.toLowerCase().includes("overdue < 30")) {
      return analysis.overdueSummary.lessThan30.items;
    } else if (sectionKey?.toLowerCase().includes("overdue 30-60")) {
      return analysis.overdueSummary.between30And60.items;
    } else if (sectionKey?.toLowerCase().includes("overdue 60-90")) {
      return analysis.overdueSummary.between60And90.items;
    } else if (sectionKey?.toLowerCase().includes("overdue > 90")) {
      return analysis.overdueSummary.moreThan90.items;
    } else if (
      sectionKey?.toLowerCase().includes("without payment") ||
      sectionKey?.toLowerCase().includes("no payment")
    ) {
      return analysis.paymentIssues.noPaymentMethod.items;
    } else if (sectionKey?.toLowerCase().includes("expired")) {
      return analysis.paymentIssues.expiredPaymentMethod.items;
    } else if (sectionKey?.toLowerCase().includes("soon-to-expire")) {
      return analysis.paymentIssues.expiring?.items || [];
    } else if (sectionKey?.toLowerCase().includes("at risk")) {
      return getAllCustomers().filter((c) => c.status === "at_risk");
    } else if (sectionKey?.toLowerCase().includes("active")) {
      return getAllCustomers().filter((c) => c.status === "active");
    } else if (sectionKey?.toLowerCase().includes("churned")) {
      return getAllCustomers().filter((c) => c.status === "churned");
    }

    // Default return all customers
    return getAllCustomers();
  };

  // Get customer data for canvas
  const getCustomerDataForCanvas = () => {
    return isSelectCustomersMode
      ? emailCustomers
      : getCustomerData(activeSection || "");
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadedFileName(file.name);

      // Add document upload message to conversation
      setConversation((prev) => [
        ...prev,
        {
          id: generateId(),
          type: "ai",
          content: "",
          subscriptionFlow: {
            stage: "uploadedDocument",
            filename: file.name,
          },
          timestamp: new Date(),
        },
      ]);

      // Add processing message after a delay
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "ai",
            content:
              "I'm processing your uploaded document. This will take just a moment...",
            subscriptionFlow: {
              stage: "processing",
            },
            timestamp: new Date(),
          },
        ]);

        // Add extracted message after a delay
        setTimeout(() => {
          setSubscriptionData(defaultSubscriptionData);
          setConversation((prev) => [
            ...prev,
            {
              id: generateId(),
              type: "ai",
              content:
                "I've successfully extracted subscription details from your document. You can review them now.",
              subscriptionFlow: {
                stage: "extracted",
              },
              timestamp: new Date(),
            },
          ]);

          showToast({
            title: "Processing Complete",
            description: "Subscription details extracted successfully",
            variant: "success",
            duration: 3000,
          });
        }, 2000);
      }, 1500);
    }
  };

  // Subscription Flow Handlers
  const handleUploadDocument = () => {
    // Trigger the hidden file input click
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleCreateManually = () => {
    // Reset form with empty data
    setSubscriptionData(emptySubscriptionData);
    setFormMode("edit");

    // Open canvas with empty form
    setCanvasContentType("subscription");
    setCanvasOpen(true);
  };

  const handlePreviewSubscription = () => {
    // Open canvas with form in preview mode using extracted data
    setFormMode("preview");
    setSubscriptionData(defaultSubscriptionData); // Use the extracted data
    setCanvasContentType("subscription");
    setCanvasOpen(true);
  };

  const handleSubscriptionCreated = () => {
    // Close canvas
    setCanvasOpen(false);

    // Add confirmation message
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content: `Subscription created successfully for ${subscriptionData.customerEmail}`,
        subscriptionFlow: {
          stage: "created",
        },
        timestamp: new Date(),
      },
    ]);

    showToast({
      title: "Subscription Created",
      description: "Your subscription has been created successfully",
      variant: "success",
      duration: 3000,
    });
  };

  const handleSubscriptionFormSubmit = (data: SubscriptionData) => {
    // Update subscription data
    setSubscriptionData(data);

    // Handle subscription creation
    handleSubscriptionCreated();
  };

  // Handle opening customer canvas
  const handleViewCustomers = (sectionKey: string) => {
    setActiveSection(sectionKey);
    setIsSelectCustomersMode(false); // Default view mode
    setSelectedCustomerIds([]); // Clear selection
    setCanvasContentType("customers");
    setCanvasOpen(true);
  };

  // Handle request payment method update
  const handleRequestPaymentMethodUpdate = () => {
    const analysis = customerAnalyzer.analyzeCustomerData();

    // Add AI message to conversation with payment method issues
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content:
          "I'll help you request updated payment methods from these customers with payment issues:",
        response: {
          analysis:
            "I'll help you request updated payment methods from these customers with payment issues:",
          sections: [
            {
              title: "Customers Without Payment Methods",
              description: "These customers have no payment method on file",
              count: analysis.paymentIssues.noPaymentMethod.count,
              items: analysis.paymentIssues.noPaymentMethod.items,
            },
            {
              title: "Customers With Expired Payment Methods",
              description:
                "These customers have payment methods that have expired",
              count: analysis.paymentIssues.expiredPaymentMethod.count,
              items: analysis.paymentIssues.expiredPaymentMethod.items,
            },
          ],
          recommendation:
            "Send emails to request updated payment methods from these customers.",
        },
        timestamp: new Date(),
      },
    ]);
  };

  // Handle send payment reminders
  const handleSendPaymentReminders = () => {
    setIsEmailModalOpen(true);
  };

  // Handle pause subscriptions
  const handlePauseSubscriptions = () => {
    setIsPauseModalOpen(true);
  };

  // Handle cancel subscriptions
  const handleCancelSubscriptions = () => {
    setIsCancelModalOpen(true);
  };

  // Handle customer selection change
  const handleCustomerSelectionChange = (selectedIds: string[]) => {
    setSelectedCustomerIds(selectedIds);
  };

  // Handle selecting customers to email
  const handleSelectCustomersToEmail = () => {
    const analysis = customerAnalyzer.analyzeCustomerData();

    // Combine all customers with payment issues
    const allCustomersWithIssues = [
      ...analysis.paymentIssues.noPaymentMethod.items,
      ...analysis.paymentIssues.expiredPaymentMethod.items,
    ];

    // Remove duplicates (a customer might appear in multiple categories)
    // @ts-ignore
    const uniqueCustomers = Array.from(
      new Map(allCustomersWithIssues.map((c) => [c.id, c])).values()
    );

    // Set the customers for email selection
    setEmailCustomers(uniqueCustomers);
    setSelectedCustomerIds([]);

    // Set to selection mode and open canvas
    setIsSelectCustomersMode(true);
    setActiveSection("Select Customers to Email");
    setCanvasContentType("customers");
    setCanvasOpen(true);
  };

  // Handle undoing email send
  const handleUndoEmailSend = () => {
    showToast({
      title: "Emails Cancelled",
      description: "Email sending has been cancelled.",
      variant: "warning",
      duration: 3000,
    });
  };

  // Handle sending emails to selected customers
  const handleSendEmailToSelected = (selectedIds: string[]) => {
    // Close the canvas
    setCanvasOpen(false);

    // Set the email data for review
    const now = new Date();
    const fromEmail = "billing@yourcompany.com";

    // Store the email data for review
    setEmailReviewData({
      customerCount: selectedIds.length,
      sentAt: now,
      fromEmail: fromEmail,
      content: "",
    });

    // Add confirmation message
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content: `I've sent the payment method update request email to ${selectedIds.length} selected customers.`,
        emailSent: {
          count: selectedIds.length,
          sentAt: now,
          fromEmail: fromEmail,
        },
        timestamp: new Date(),
      },
    ]);

    // Show toast notification
    showToast({
      title: "Emails Sent Successfully",
      description: `Payment method update request sent to ${selectedIds.length} customers.`,
      variant: "success",
      duration: 5000,
      action: {
        label: "Undo",
        onClick: handleUndoEmailSend,
      },
    });
  };

  // Handle confirming email send from modal
  const handleConfirmSendEmails = (fromEmail: string) => {
    // Get total customer count with payment issues
    const totalCustomers = getTotalPaymentIssuesCount();
    const now = new Date();

    // Store the email data for review
    setEmailReviewData({
      customerCount: totalCustomers,
      sentAt: now,
      fromEmail: fromEmail,
      content: "",
    });

    // Add confirmation message
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content: `I've sent the payment method update request email to ${totalCustomers} customers.`,
        emailSent: {
          count: totalCustomers,
          sentAt: now,
          fromEmail: fromEmail,
        },
        timestamp: new Date(),
      },
    ]);

    // Show toast notification
    showToast({
      title: "Emails Sent Successfully",
      description: `Payment method update request sent to ${totalCustomers} customers.`,
      variant: "success",
      duration: 5000,
      action: {
        label: "Undo",
        onClick: handleUndoEmailSend,
      },
    });
  };

  // Handle confirming pause subscriptions
  const handleConfirmPauseSubscriptions = () => {
    setIsPauseModalOpen(false);

    // Add confirmation message
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content: `I've paused subscriptions for ${getTotalOverdueCount()} customers with overdue invoices.`,
        timestamp: new Date(),
      },
    ]);

    // Show toast notification
    showToast({
      title: "Subscriptions Paused",
      description: `Successfully paused subscriptions for ${getTotalOverdueCount()} customers.`,
      variant: "success",
      duration: 5000,
    });
  };

  // Handle confirming cancel subscriptions
  const handleConfirmCancelSubscriptions = () => {
    // Close the modal
    setIsCancelModalOpen(false);

    // Add confirmation message
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content: `I've cancelled subscriptions for ${getTotalOverdueCount()} customers with overdue invoices.`,
        timestamp: new Date(),
      },
    ]);

    // Show toast notification
    showToast({
      title: "Subscriptions Cancelled",
      description: `Successfully cancelled subscriptions for ${getTotalOverdueCount()} customers.`,
      variant: "danger",
      duration: 5000,
    });
  };

  const onEditPreview = (customerCount: number) => {
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content: `Here's a preview of the upgrade email for ${customerCount} customers. You can edit it before sending.`,
        emailReview: {
          count: customerCount,
          fromEmail: "",
        },
        timestamp: new Date(),
      },
    ]);
  };

  const handlePreviewForEU = () => {
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content:
          "Here's a preview of the email for EU customers without the discount offer.",
        emailReview: {
          count: 200,
          fromEmail: "",
          country: "eu",
        },
        timestamp: new Date(),
      },
    ]);
  };

  const handleShowUpgradeEmail = (emailData) => {
    setCanvasContentType("upgradeEmail");
    setCanvasOpen(true);
    setEmailReviewData((prev) => ({
      ...prev,
      content: emailData.content,
      customerCount: emailData.count,
    }));
  };

  const handleSendUpgradeEmail = (count, country = null) => {
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content: `I've sent the upgrade email to ${count} customers ✅`,
        upgradeEmailSent: {
          count,
          sentAt: new Date(),
          country,
        },
        timestamp: new Date(),
      },
    ]);

    if (country === "eu") {
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            id: generateId(),
            type: "ai",
            content:
              "✅ I've also created an A/B experiment: 'Free to Paid – US (with offer) vs EU (no offer)'",
            showABExperiment: true,
            timestamp: new Date(),
          },
        ]);
      }, 1500);
    }
  };

  // Handle showing email review in canvas
  const handleShowEmail = () => {
    setCanvasContentType("email");
    setCanvasOpen(true);
  };

  const handleShowRemainerEmail = () => {
    setCanvasContentType("remainderEmail");
    setCanvasOpen(true);
  };

  // Handle automating workflow
  const handleAutomateWorkflow = () => {
    setIsAutomateModalOpen(true);
  };

  // Handle confirming workflow automation
  const handleConfirmAutomateWorkflow = () => {
    // Close the modal
    setIsAutomateModalOpen(false);

    // Add workflow automation message
    setConversation((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "ai",
        content:
          "The payment method update workflow has been automated. Customers will receive an email 5 days before their payment method expires.",
        workflowAutomated: true,
        timestamp: new Date(),
      },
    ]);

    // Show toast notification
    showToast({
      title: "Workflow Automated",
      description:
        "Payment method update workflow has been set up successfully.",
      variant: "success",
      duration: 5000,
    });
  };

  // Handle viewing workflow in canvas
  const handleViewWorkflow = () => {
    setCanvasContentType("workflow");
    setCanvasOpen(true);
  };

  // Update days before expiry (for workflow canvas)
  const handleDaysChange = (value: number) => {
    setDays(value);
    // If the value is different from saved value, mark as unsaved
    setHasUnsavedChanges(value !== daysBeforeExpiry);
  };

  // Save workflow changes (for workflow canvas)
  const handleSaveWorkflowChanges = () => {
    setDaysBeforeExpiry(days);
    setHasUnsavedChanges(false);

    // Show success toast
    showToast({
      title: "Settings Saved",
      description: `Emails will now be sent ${days} days before payment method expiry.`,
      variant: "success",
      duration: 5000,
      action: {
        label: "Undo",
        onClick: () => {
          setDays(daysBeforeExpiry);
          setHasUnsavedChanges(false);
          showToast({
            title: "Changes Reverted",
            description: "Workflow settings have been restored.",
            variant: "warning",
            duration: 3000,
          });
        },
      },
    });
  };

  // Toggle workflow status (for workflow canvas)
  const handleToggleWorkflowStatus = () => {
    const newStatus = !isPaused;
    setIsPaused(newStatus);

    if (newStatus) {
      // Workflow paused
      showToast({
        title: "Workflow Paused",
        description: "The payment method update workflow has been paused.",
        variant: "warning",
        duration: 5000,
        action: {
          label: "Resume",
          onClick: () => {
            setIsPaused(false);
            showToast({
              title: "Workflow Resumed",
              description: "The payment method update workflow is now active.",
              variant: "success",
              duration: 3000,
            });
          },
        },
      });
    } else {
      // Workflow resumed
      showToast({
        title: "Workflow Resumed",
        description: "The payment method update workflow is now active.",
        variant: "success",
        duration: 5000,
      });
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .format(date)
      .replace(",", "");
  };

  // Get canvas title based on content type
  const getCanvasTitle = () => {
    if (canvasContentType === "customers") {
      return activeSection || "Customer Data";
    } else if (canvasContentType === "email") {
      return "Payment Method Update Request";
    } else if (canvasContentType === "workflow") {
      return "Payment Method Update Workflow";
    } else if (canvasContentType === "subscription") {
      return formMode === "edit"
        ? "Create Subscription"
        : "Subscription Preview";
    } else if (canvasContentType === "upgradeEmail") {
      return "Upgrade Email Preview";
    } else if (canvasContentType === "abExperiment") {
      return "A/B Experiment Setup";
    }
    return "Canvas";
  };

  // Get customer count for canvas
  const getCustomerCount = () => {
    return getCustomerDataForCanvas().length;
  };

  // Get customer count for display
  return (
    <div className="flex flex-col fixed top-16 left-0 right-0 bottom-0">
      {/* Hidden file input for document upload */}
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      {/* Main content with resizable panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel
          defaultSize={canvasOpen ? 40 : 100}
          minSize={30}
          className="bg-white flex justify-center"
        >
          <div className="w-full">
            <ChatView
              conversation={conversation}
              isLoading={isLoading}
              formatDate={formatDate}
              canvasOpen={canvasOpen}
              onBack={onBack}
              onToggleCanvas={toggleCanvas}
              onNewQuery={handleNewQuery}
              onViewCustomers={handleViewCustomers}
              onSelectCustomersToEmail={handleSelectCustomersToEmail}
              onShowEmail={handleShowEmail}
              onAutomateWorkflow={handleAutomateWorkflow}
              onViewWorkflow={handleViewWorkflow}
              onSendAllEmails={handleSendPaymentReminders}
              onConfirmSendEmails={handleConfirmSendEmails}
              onShowRemainerEmail={handleShowRemainerEmail}
              totalCustomerCount={getTotalPaymentIssuesCount()}
              // AR Aging Summary actions
              onRequestPaymentMethodUpdate={handleRequestPaymentMethodUpdate}
              onSendPaymentReminders={handleSendPaymentReminders}
              onPauseSubscriptions={handlePauseSubscriptions}
              onCancelSubscriptions={handleCancelSubscriptions}
              // Subscription actions
              onUploadSubscriptionDocument={handleUploadDocument}
              onCreateSubscriptionManually={handleCreateManually}
              onPreviewSubscription={handlePreviewSubscription}
              // Upgrade email actions
              onEditPreview={onEditPreview}
              handleShowUpgradeEmail={handleShowUpgradeEmail}
              handleSendUpgradeEmail={handleSendUpgradeEmail}
              handlePreviewForEU={handlePreviewForEU}
              showABExperiment={() => {
                setCanvasContentType("abExperiment");
                setCanvasOpen(true);
              }}
            />
          </div>
        </ResizablePanel>

        {canvasOpen && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={30}>
              {/* Canvas Panel */}
              {canvasContentType === "subscription" ? (
                <div className="h-full flex flex-col">
                  <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">{getCanvasTitle()}</h2>
                      <button
                        onClick={toggleCanvas}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <SubscriptionForm
                      initialData={subscriptionData}
                      onSubmit={handleSubscriptionFormSubmit}
                      initialMode={formMode}
                    />
                  </div>
                </div>
              ) : (
                <CanvasPanel
                  contentType={canvasContentType}
                  isOpen={canvasOpen}
                  title={getCanvasTitle()}
                  activeSection={activeSection}
                  onClose={toggleCanvas}
                  customers={getCustomerDataForCanvas()}
                  isSelectMode={isSelectCustomersMode}
                  selectedCustomerIds={selectedCustomerIds}
                  onCustomerSelectionChange={handleCustomerSelectionChange}
                  onSendEmailToSelected={handleSendEmailToSelected}
                  emailData={emailReviewData}
                  workflowData={{
                    isPaused,
                    daysBeforeExpiry,
                    days,
                    hasUnsavedChanges,
                  }}
                  onDaysChange={handleDaysChange}
                  onSaveWorkflowChanges={handleSaveWorkflowChanges}
                  onToggleWorkflowStatus={handleToggleWorkflowStatus}
                  getCustomerCount={getCustomerCount}
                />
              )}
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={handleConfirmSendEmails}
        customerCount={getTotalPaymentIssuesCount()}
      />

      {/* Pause Subscriptions Modal */}
      <PauseSubscriptionsModal
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        onConfirm={handleConfirmPauseSubscriptions}
        customerCount={getTotalOverdueCount()}
      />

      {/* Cancel Subscriptions Modal */}
      <CancelSubscriptionsModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancelSubscriptions}
        customerCount={getTotalOverdueCount()}
      />

      {/* Payment Remainder Modal */}
      <PaymentRemainderModal
        isOpen={isRemainderEmailModalOpen}
        onClose={() => setRemainderIsEmailModalOpen(false)}
        onSend={() => {}}
        customerCount={getTotalOverdueCount()}
      />

      {/* Automate Workflow Modal */}
      <AutomateWorkflowModal
        isOpen={isAutomateModalOpen}
        onClose={() => setIsAutomateModalOpen(false)}
        onEnable={handleConfirmAutomateWorkflow}
      />
    </div>
  );
};

// Wrapper component that provides toast context
const SearchResultsView: React.FC<SearchResultsViewProps> = (props) => {
  return (
    <AppToastProvider>
      <SearchResultsViewInner {...props} />
    </AppToastProvider>
  );
};

export default SearchResultsView;
