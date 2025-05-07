// components/SearchResultsView.tsx
import React, { useEffect, useState, useRef } from "react";
import { AppToastProvider, useToast } from "../ToastProvider";
import CustomerAnalyzer from "../../../services/CustomerAI";
import AutomateWorkflowModal from "./AutomateWorkflowModal";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";

// Import our modular components
import ChatView from "./chatUI/ChatView";
import CanvasPanel from "./chatUI/CanvasPanel";

// Define a message type for the conversation
interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
    response?: {
        analysis: string;
        sections: any[];
        recommendation?: string;
    };
    emailSent?: {
        count: number;
        sentAt: Date;
        fromEmail?: string;
    };
    workflowAutomated?: boolean;
    customerList?: boolean;
    timestamp: Date;
}

interface SearchResultsViewProps {
    query: string;
    onBack: () => void;
    onSearch: (query: string) => void;
}

// Inner component that uses the toast hook
const SearchResultsViewInner: React.FC<SearchResultsViewProps> = ({
                                                                      query,
                                                                      onBack,
                                                                      onSearch
                                                                  }) => {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState<Message[]>([]);

    // Use refs to keep track of the current state without causing re-renders
    const processingQueryRef = useRef<string | null>(null);
    const initialQueryProcessedRef = useRef(false);

    // Canvas states
    const [canvasOpen, setCanvasOpen] = useState(false);
    const [canvasContentType, setCanvasContentType] = useState<'customers' | 'workflow' | 'email'>('customers');

    // Common states
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isSelectCustomersMode, setIsSelectCustomersMode] = useState(false);
    const [emailCustomers, setEmailCustomers] = useState<any[]>([]);
    const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);

    // Workflow state (for canvas)
    const [daysBeforeExpiry, setDaysBeforeExpiry] = useState(5);
    const [days, setDays] = useState(5);
    const [isPaused, setIsPaused] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Modal state
    const [isAutomateModalOpen, setIsAutomateModalOpen] = useState(false);

    // Email review state
    const [emailReviewData, setEmailReviewData] = useState({
        customerCount: 0,
        sentAt: new Date(),
        fromEmail: 'billing@yourcompany.com'
    });

    // Generate unique ID for messages
    const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Initialize customer data
    const [customerData, setCustomerData] = useState(() => {
        // Get analyzer data
        const analyzer = CustomerAnalyzer;
        const analysis = analyzer.analyzeCustomerData(analyzer.customerData || []);

        return {
            missing: analysis.paymentIssues.missing,
            expired: analysis.paymentIssues.expired,
            expiring: analysis.paymentIssues.expiring
        };
    });

    // Get all customer data
    const getAllCustomers = () => {
        const analyzer = CustomerAnalyzer;
        return analyzer.customerData || [];
    };

    // Get customer data for canvas
    const getCustomerDataForCanvas = () => {
        return isSelectCustomersMode ? emailCustomers : getCustomerData(activeSection || "");
    };

    // Get customer count for display
    const getCustomerCount = () => {
        return getCustomerDataForCanvas().length;
    };

    // Get total customer count
    const totalCustomerCount = customerData.missing.count + customerData.expired.count + customerData.expiring.count;

    // Initialize conversation with the first query
    useEffect(() => {
        // Only process initial query once
        if (query && !initialQueryProcessedRef.current) {
            initialQueryProcessedRef.current = true;

            // Add user message
            const newMessage: Message = {
                id: generateId(),
                type: 'user',
                content: query,
                timestamp: new Date()
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

        // Check for specific queries
        if (userQuery.toLowerCase().includes("list customers")) {
            // Handle list customers action
            setTimeout(() => {
                const allCustomers = getAllCustomers();

                // Add AI message to conversation with customers list
                setConversation(prev => [
                    ...prev,
                    {
                        id: generateId(),
                        type: 'ai',
                        content: `I found ${allCustomers.length} customers in your account. Here's the complete list with their details.`,
                        customerList: true,
                        timestamp: new Date()
                    }
                ]);

                // Open canvas with customer data
                setActiveSection("All Customers");
                setIsSelectCustomersMode(false);
                setCanvasContentType('customers');
                setCanvasOpen(true);

                setIsLoading(false);
                processingQueryRef.current = null;
            }, 1500);
            return;
        }

        // Use the CustomerAnalyzer service to generate a response
        const analyzer = CustomerAnalyzer;

        // Simulate processing time
        setTimeout(() => {
            // Get the AI response
            const aiResponse = analyzer.generateResponse(userQuery);

            // Add AI message to conversation with response sections
            setConversation(prev => [
                ...prev,
                {
                    id: generateId(),
                    type: 'ai',
                    content: aiResponse.analysis,
                    response: {
                        analysis: aiResponse.analysis,
                        sections: aiResponse.sections,
                        recommendation: aiResponse.recommendation
                    },
                    timestamp: new Date()
                }
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
            type: 'user',
            content: newQuery,
            timestamp: new Date()
        };

        setConversation(prev => [...prev, newMessage]);

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
        if (sectionKey.toLowerCase() === "all customers") {
            return getAllCustomers();
        }

        // Get analyzer data
        const analyzer = CustomerAnalyzer;
        const customerData = analyzer.customerData || [];

        // Filter based on section title
        if (sectionKey.toLowerCase().includes('without payment')) {
            return customerData.filter(c => !c.paymentMethod);
        } else if (sectionKey.toLowerCase().includes('expired')) {
            return customerData.filter(c => c.paymentMethod?.isExpired);
        } else if (sectionKey.toLowerCase().includes('soon-to-expire')) {
            return customerData.filter(c =>
                c.paymentMethod &&
                !c.paymentMethod.isExpired &&
                c.paymentMethod.expiresIn < 30
            );
        } else if (sectionKey.toLowerCase().includes('at risk')) {
            return customerData.filter(c => c.status === 'at_risk');
        } else if (sectionKey.toLowerCase().includes('active')) {
            return customerData.filter(c => c.status === 'active');
        } else if (sectionKey.toLowerCase().includes('churned')) {
            return customerData.filter(c => c.status === 'churned');
        }

        // Default return all customers
        return customerData;
    };

    // Handle opening customer canvas
    const handleViewCustomers = (sectionKey: string) => {
        setActiveSection(sectionKey);
        setIsSelectCustomersMode(false); // Default view mode
        setSelectedCustomerIds([]); // Clear selection
        setCanvasContentType('customers');
        setCanvasOpen(true);
    };

    // Handle send emails to all customers
    const handleSendAllEmails = () => {
        console.log('Preparing to send emails to all customers');
    };

    // Handle customer selection change
    const handleCustomerSelectionChange = (selectedIds: number[]) => {
        setSelectedCustomerIds(selectedIds);
    };

    // Handle selecting customers to email
    const handleSelectCustomersToEmail = () => {
        // Set up the data for the email customer selection
        const analyzer = CustomerAnalyzer;

        // Combine all customers with payment issues
        const allCustomersWithIssues = [
            ...analyzer.customerData.filter(c => !c.paymentMethod), // Missing
            ...analyzer.customerData.filter(c => c.paymentMethod?.isExpired), // Expired
            ...analyzer.customerData.filter(c =>
                c.paymentMethod &&
                !c.paymentMethod.isExpired &&
                c.paymentMethod.expiresIn < 30
            ) // Soon to expire
        ];

        // Remove duplicates (a customer might appear in multiple categories)
        const uniqueCustomers = [...new Map(allCustomersWithIssues.map(c => [c.id, c])).values()];

        // Set the customers for email selection
        setEmailCustomers(uniqueCustomers);
        setSelectedCustomerIds([]);

        // Set to selection mode and open canvas
        setIsSelectCustomersMode(true);
        setActiveSection("Select Customers to Email");
        setCanvasContentType('customers');
        setCanvasOpen(true);
    };

    // Handle undoing email send
    const handleUndoEmailSend = () => {
        showToast({
            title: "Emails Cancelled",
            description: "Email sending has been cancelled.",
            variant: "warning",
            duration: 3000
        });
    };

    // Handle sending emails to selected customers
    const handleSendEmailToSelected = (selectedIds: number[]) => {
        // Close the canvas
        setCanvasOpen(false);

        // Set the email data for review
        const now = new Date();
        const fromEmail = 'billing@yourcompany.com';

        // Store the email data for review
        setEmailReviewData({
            customerCount: selectedIds.length,
            sentAt: now,
            fromEmail: fromEmail
        });

        // Add confirmation message
        setConversation(prev => [
            ...prev,
            {
                id: generateId(),
                type: 'ai',
                content: `I've sent the payment method update request email to ${selectedIds.length} selected customers.`,
                emailSent: {
                    count: selectedIds.length,
                    sentAt: now,
                    fromEmail: fromEmail
                },
                timestamp: new Date()
            }
        ]);

        // Show toast notification
        showToast({
            title: "Emails Sent Successfully",
            description: `Payment method update request sent to ${selectedIds.length} customers.`,
            variant: "success",
            duration: 5000,
            action: {
                label: "Undo",
                onClick: handleUndoEmailSend
            }
        });
    };

    // Handle confirming email send from modal
    const handleConfirmSendEmails = (fromEmail: string) => {
        // Get total customer count
        const totalCustomers = customerData.missing.count + customerData.expired.count + customerData.expiring.count;
        const now = new Date();

        // Store the email data for review
        setEmailReviewData({
            customerCount: totalCustomers,
            sentAt: now,
            fromEmail: fromEmail
        });

        // Add confirmation message
        setConversation(prev => [
            ...prev,
            {
                id: generateId(),
                type: 'ai',
                content: `I've sent the payment method update request email to ${totalCustomers} customers.`,
                emailSent: {
                    count: totalCustomers,
                    sentAt: now,
                    fromEmail: fromEmail
                },
                timestamp: new Date()
            }
        ]);

        // Show toast notification
        showToast({
            title: "Emails Sent Successfully",
            description: `Payment method update request sent to ${totalCustomers} customers.`,
            variant: "success",
            duration: 5000,
            action: {
                label: "Undo",
                onClick: handleUndoEmailSend
            }
        });
    };

    // Handle showing email review in canvas
    const handleShowEmail = () => {
        setCanvasContentType('email');
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
        setConversation(prev => [
            ...prev,
            {
                id: generateId(),
                type: 'ai',
                content: "The payment method update workflow has been automated. Customers will receive an email 5 days before their payment method expires.",
                workflowAutomated: true,
                timestamp: new Date()
            }
        ]);

        // Show toast notification
        showToast({
            title: "Workflow Automated",
            description: "Payment method update workflow has been set up successfully.",
            variant: "success",
            duration: 5000
        });
    };

    // Handle viewing workflow in canvas
    const handleViewWorkflow = () => {
        setCanvasContentType('workflow');
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
                        duration: 3000
                    });
                }
            }
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
                            duration: 3000
                        });
                    }
                }
            });
        } else {
            // Workflow resumed
            showToast({
                title: "Workflow Resumed",
                description: "The payment method update workflow is now active.",
                variant: "success",
                duration: 5000
            });
        }
    };

    // Format date for display
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date).replace(',', '');
    };

    // Get canvas title based on content type
    const getCanvasTitle = () => {
        if (canvasContentType === 'customers') {
            return activeSection || "Customer Data";
        } else if (canvasContentType === 'email') {
            return "Payment Method Update Request";
        } else if (canvasContentType === 'workflow') {
            return "Payment Method Update Workflow";
        }
        return "Canvas";
    };

    return (
        <div className="flex flex-col fixed top-16 left-0 right-0 bottom-0">
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
                            onSendAllEmails={handleSendAllEmails}
                            onConfirmSendEmails={handleConfirmSendEmails}
                            totalCustomerCount={totalCustomerCount}
                        />
                    </div>
                </ResizablePanel>

                {canvasOpen && (
                    <>
                        <ResizableHandle withHandle />
                        <ResizablePanel minSize={30}>
                            {/* Canvas Panel */}
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
                                    hasUnsavedChanges
                                }}
                                onDaysChange={handleDaysChange}
                                onSaveWorkflowChanges={handleSaveWorkflowChanges}
                                onToggleWorkflowStatus={handleToggleWorkflowStatus}

                                getCustomerCount={getCustomerCount}
                            />
                        </ResizablePanel>
                    </>
                )}
            </ResizablePanelGroup>

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