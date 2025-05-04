// components/SearchResultsView.tsx
import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, Save, Eye, Mail } from "lucide-react";
import SearchBar from "../SearchBar";
import CustomerAnalyzer from "../../../services/CustomerAI";
import Drawer from "./Drawer";
import CustomerTable from "./CustomerTable";
import EmailModal from "./EmailModal";
import AutomateWorkflowModal from "./AutomateWorkflowModal";
import WorkflowDrawer from "./WorkflowDrawer";
import ReviewEmailDrawer from "./ReviewEmailDrawer";
import { AppToastProvider, useToast } from "../ToastProvider";
import { Button } from "cb-sting-react-ts";

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

    // Ref for auto-scrolling to the latest message
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    // Add auto-scroll effect when conversation changes
    useEffect(() => {
        if (conversation.length > 0 && endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    // Drawer and modal states
    const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);
    const [isAutomateModalOpen, setIsAutomateModalOpen] = useState(false);
    const [isWorkflowDrawerOpen, setIsWorkflowDrawerOpen] = useState(false);
    const [isReviewEmailDrawerOpen, setIsReviewEmailDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isSelectCustomersMode, setIsSelectCustomersMode] = useState(false);
    const [emailCustomers, setEmailCustomers] = useState<any[]>([]);
    const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);

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

    // Handle opening customer drawer
    const handleViewCustomers = (sectionKey: string) => {
        setActiveSection(sectionKey);
        setIsSelectCustomersMode(false); // Default view mode
        setSelectedCustomerIds([]); // Clear selection
        setIsCustomerDrawerOpen(true);
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
        // @ts-ignore
        const uniqueCustomers = [...new Map(allCustomersWithIssues.map(c => [c.id, c])).values()];

        // Set the customers for email selection
        setEmailCustomers(uniqueCustomers);
        setSelectedCustomerIds([]);

        // Set to selection mode and open drawer
        setIsSelectCustomersMode(true);
        setActiveSection("Select Customers to Email");
        setIsCustomerDrawerOpen(true);
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

    // Handle sending emails to selected customers from the drawer
    const handleSendEmailToSelected = (selectedIds: number[]) => {
        // Close the drawer
        setIsCustomerDrawerOpen(false);

        // Set the email data for the review drawer
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

    // Handle showing email review drawer
    const handleShowEmail = () => {
        setIsReviewEmailDrawerOpen(true);
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

    // Handle viewing workflow
    const handleViewWorkflow = () => {
        setIsWorkflowDrawerOpen(true);
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

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col h-full">
                {/* Top navigation */}
                <div className="flex justify-between items-center bg-purple-50 p-3 shadow-sm">
                    <button onClick={onBack} className="flex items-center text-gray-600 hover:bg-violet-600 hover:text-white rounded-md px-2 py-1">
                        <ArrowLeft size={14} className="mr-1" />
                        <span>Back</span>
                    </button>

                    <button className="flex items-center text-gray-600 hover:bg-violet-600 hover:text-white rounded-md px-2 py-1">
                        <Save size={16} className="mr-2" />
                        <span>Save View</span>
                    </button>
                </div>

                {/* Conversation area - with more spacing between messages */}
                <div className="flex-1 p-6 pt-12 pb-24 max-w-4xl mx-auto w-full overflow-y-auto scrollbar-hide">
                    <div className="space-y-5"> {/* Spacing between messages */}
                        {/* Render all messages in the conversation */}
                        {conversation.map((message) => (
                            <div key={message.id}>
                                {/* User message */}
                                {message.type === 'user' && (
                                    <div className="flex justify-end mb-20">
                                        <div className="bg-purple-500 text-white rounded-lg px-4 py-2 max-w-md">
                                            {message.content}
                                        </div>
                                    </div>
                                )}

                                {/* AI response with sections */}
                                {message.type === 'ai' && message.response && (
                                    <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                                        <p className="mb-6">{message.response.analysis}</p>

                                        {/* Result sections */}
                                        {message.response.sections.map((section, sectionIndex) => (
                                            <div key={sectionIndex} className="mb-6">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className="font-semibold">{section.title}</h3>
                                                    <button
                                                        className="text-gray-400 hover:text-gray-600"
                                                        onClick={() => handleViewCustomers(section.title)}
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                                                <div className="flex items-center">
                                                    <span className="text-3xl font-bold mr-2">{section.count}</span>
                                                    <span className="text-gray-600">items</span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Recommendation */}
                                        {message.response.recommendation && (
                                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                                <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
                                                <p className="text-blue-700">{message.response.recommendation}</p>
                                            </div>
                                        )}

                                        {/* Action buttons - only on payment-related responses */}
                                        {message.response.sections.some(s =>
                                            s.title.toLowerCase().includes('payment') ||
                                            s.description.toLowerCase().includes('payment')
                                        ) && (
                                            <div className="flex space-x-4 mt-8">
                                                {/* Send emails to all - wrapped in EmailModal */}
                                                <EmailModal
                                                    onSend={handleConfirmSendEmails}
                                                    customerCount={totalCustomerCount}
                                                >
                                                    <button
                                                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
                                                        onClick={handleSendAllEmails}
                                                    >
                                                        <Mail size={16} className="mr-2" />
                                                        Send emails to all ({totalCustomerCount})
                                                    </button>
                                                </EmailModal>

                                                {/* Button to select customers to email - opens drawer */}
                                                <button
                                                    className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center"
                                                    onClick={handleSelectCustomersToEmail}
                                                >
                                                    <Mail size={16} className="mr-2" />
                                                    Select customers to email
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Email sent confirmation */}
                                {message.type === 'ai' && message.emailSent && (
                                    <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                                        <p className="mb-4">{message.content}</p>

                                        <div className="mb-4">
                                            <h4 className="font-semibold">Payment Method Update Request</h4>
                                            <p className="text-sm text-gray-600">Sent to: {message.emailSent.count} customers</p>
                                            <p className="text-sm text-gray-600">{formatDate(message.emailSent.sentAt)}</p>
                                        </div>

                                        <div className="flex space-x-4">
                                            <button
                                                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
                                                onClick={handleShowEmail}
                                            >
                                                Show email
                                            </button>
                                            <button
                                                className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center"
                                                onClick={handleAutomateWorkflow}
                                            >
                                                Automate this workflow
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Workflow automated confirmation */}
                                {message.type === 'ai' && message.workflowAutomated && (
                                    <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                                        <p className="mb-4">{message.content}</p>

                                        <button
                                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
                                            onClick={handleViewWorkflow}
                                        >
                                            View Workflow
                                        </button>
                                    </div>
                                )}

                                {/* Simple AI response (error) */}
                                {message.type === 'ai' && !message.response && !message.emailSent && !message.workflowAutomated && (
                                    <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                                        <p>{message.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="bg-white rounded-lg p-6 shadow-sm flex items-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                                <span className="ml-3">Thinking...</span>
                            </div>
                        )}

                        {/* Empty div for scrolling to the end of messages */}
                        <div ref={endOfMessagesRef} />
                    </div>
                </div>

                {/* SearchBar at bottom */}
                <div className="border-t border-gray-200 bg-white">
                    <SearchBar
                        position="bottom"
                        initialValue=""
                        onSearch={handleNewQuery}
                    />
                </div>

                {/* Automate Workflow Modal */}
                <AutomateWorkflowModal
                    isOpen={isAutomateModalOpen}
                    onClose={() => setIsAutomateModalOpen(false)}
                    onEnable={handleConfirmAutomateWorkflow}
                />

                {/* Customer List Drawer */}
                {isSelectCustomersMode ? (
                    <Drawer
                        isOpen={isCustomerDrawerOpen}
                        onClose={() => setIsCustomerDrawerOpen(false)}
                        title={activeSection || "Select Customers to Email"}
                        onSendEmail={handleSendEmailToSelected}
                    >
                        <CustomerTable
                            customers={emailCustomers}
                            selectable={true}
                            onSelectionChange={handleCustomerSelectionChange}
                        />
                    </Drawer>
                ) : (
                    <Drawer
                        isOpen={isCustomerDrawerOpen}
                        onClose={() => setIsCustomerDrawerOpen(false)}
                        title={activeSection || "Customers"}
                        sectionKey={activeSection}
                        onSendEmail={handleSendEmailToSelected}
                    />
                )}

                {/* Workflow Drawer */}
                <WorkflowDrawer
                    isOpen={isWorkflowDrawerOpen}
                    onClose={() => setIsWorkflowDrawerOpen(false)}
                />

                {/* Review Email Drawer */}
                <ReviewEmailDrawer
                    isOpen={isReviewEmailDrawerOpen}
                    onClose={() => setIsReviewEmailDrawerOpen(false)}
                    customerCount={emailReviewData.customerCount}
                    sentAt={emailReviewData.sentAt}
                    fromEmail={emailReviewData.fromEmail}
                />
            </div>
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