import React, { useEffect, useRef } from "react";
import { Eye, Mail } from "lucide-react";
import { Button } from "cb-sting-react-ts";
import SearchBar from "../../SearchBar";
import EmailModal from "../EmailModal";
import ShrinkableHeader from "./ChatHeader";

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

interface ChatViewProps {
    conversation: Message[];
    isLoading: boolean;
    formatDate: (date: Date) => string;
    canvasOpen: boolean;
    onBack: () => void;
    onToggleCanvas: () => void;
    onNewQuery: (query: string) => void;
    onViewCustomers: (sectionKey: string) => void;
    onSelectCustomersToEmail: () => void;
    onShowEmail: () => void;
    onAutomateWorkflow: () => void;
    onViewWorkflow: () => void;
    onSendAllEmails: () => void;
    onConfirmSendEmails: (fromEmail: string) => void;
    totalCustomerCount: number;
}

const ChatView: React.FC<ChatViewProps> = ({
                                               conversation,
                                               isLoading,
                                               formatDate,
                                               canvasOpen,
                                               onBack,
                                               onToggleCanvas,
                                               onNewQuery,
                                               onViewCustomers,
                                               onSelectCustomersToEmail,
                                               onShowEmail,
                                               onAutomateWorkflow,
                                               onViewWorkflow,
                                               onSendAllEmails,
                                               onConfirmSendEmails,
                                               totalCustomerCount
                                           }) => {
    // Ref for auto-scrolling to the latest message
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Add auto-scroll effect when conversation changes
    useEffect(() => {
        if (conversation.length > 0 && endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    return (
        <div className="h-full flex flex-col overscroll-none" ref={containerRef}>
            {/* Use the new ShrinkableHeader component */}
            <ShrinkableHeader
                onBack={onBack}
                onToggleCanvas={onToggleCanvas}
                canvasOpen={canvasOpen}
            />

            {/* Conversation area - SCROLLABLE */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-5">
                        {/* Render all messages in the conversation */}
                        {conversation.map((message) => (
                            <div key={message.id}>
                                {/* User message */}
                                {message.type === 'user' && (
                                    <div className="flex justify-end mb-10">
                                        <div className="bg-brand-deep-dark text-white rounded-lg px-4 py-2 max-w-md">
                                            {message.content}
                                        </div>
                                    </div>
                                )}

                                {/* AI response with customer list */}
                                {message.type === 'ai' && message.customerList && (
                                    <div className="bg-neutral-300 rounded-lg p-6 shadow-sm max-w-xl">
                                        <p className="mb-4">{message.content}</p>
                                        <div className="flex justify-end">
                                            <Button
                                                onClick={() => onViewCustomers("All Customers")}
                                            >
                                                View All Customers
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* AI response with sections */}
                                {message.type === 'ai' && message.response && (
                                    <div className="bg-neutral-25 rounded-lg p-6 shadow-sm max-w-xl">
                                        <p className="mb-6">{message.response.analysis}</p>

                                        {/* Result sections */}
                                        {message.response.sections.map((section, sectionIndex) => (
                                            <div key={sectionIndex} className="mb-6">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className="font-semibold">{section.title}</h3>
                                                    <Button
                                                        styleType={'icon-borderless'}
                                                        variant={'neutral'}
                                                        onClick={() => onViewCustomers(section.title)}
                                                    >
                                                        <Eye size={18} />
                                                    </Button>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                                                <div className="flex items-center">
                                                    <span className="text-3xl font-bold mr-2">{section.count}</span>
                                                    <span className="text-gray-600">Items</span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Recommendation */}
                                        {message.response.recommendation && (
                                            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                                                <h4 className="font-semibold text-primary-600 mb-2">Recommendation</h4>
                                                <p className="text-primary-700">{message.response.recommendation}</p>
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
                                                    onSend={onConfirmSendEmails}
                                                    customerCount={totalCustomerCount}
                                                >
                                                    <Button
                                                        onClick={onSendAllEmails}
                                                    >
                                                        <Mail size={16} className="mr-2" />
                                                        Send emails to all ({totalCustomerCount})
                                                    </Button>
                                                </EmailModal>

                                                <Button
                                                    variant="neutral"
                                                    onClick={onSelectCustomersToEmail}
                                                >
                                                    <Mail size={16} className="mr-2" />
                                                    Select customers to email
                                                </Button>
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
                                            <Button
                                                onClick={onShowEmail}
                                            >
                                                Show email
                                            </Button>
                                            <Button
                                                variant="neutral"
                                                onClick={onAutomateWorkflow}
                                            >
                                                Automate this workflow
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Workflow automated confirmation */}
                                {message.type === 'ai' && message.workflowAutomated && (
                                    <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                                        <p className="mb-4">{message.content}</p>

                                        <Button
                                            onClick={onViewWorkflow}
                                        >
                                            View Workflow
                                        </Button>
                                    </div>
                                )}

                                {/* Simple AI response (error) */}
                                {message.type === 'ai' && !message.response && !message.emailSent && !message.workflowAutomated && !message.customerList && (
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
            </div>

            {/* SearchBar at bottom - FIXED */}
            <div className=" pb-2 px-2 bg-white p-1 ">
                <SearchBar
                    onSearch={onNewQuery}
                    initialValue=""
                    isCanvasOpen={canvasOpen}
                />
            </div>
        </div>
    );
};

export default ChatView;