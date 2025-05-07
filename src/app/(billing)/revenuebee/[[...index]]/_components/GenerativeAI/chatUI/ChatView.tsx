import React, { useEffect, useRef } from "react";
import { Eye, Mail } from "lucide-react";
import { Button } from "cb-sting-react-ts";
import SearchBar from "../../SearchBar";
import EmailModal from "../EmailModal";
import ShrinkableHeader from "./ChatHeader";

interface Message {
  id: string;
  type: "user" | "ai";
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
  emailReview?: {
    count: number;
    fromEmail?: string;
    country?: string;
  };
  upgradeEmailSent?: {
    count: number;
    country?: string;
  };
  sendToEUCustWithoutOffer?: boolean;
  sendToUSCustomers?: boolean;
  workflowAutomated?: boolean;
  customerList?: boolean;
  revenueGrowth?: boolean;
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
  onEditPreview: (customerCount: number) => void;
  handleShowUpgradeEmail: (emailData: {
    content: string;
    count?: number;
  }) => void;
  handleSendUpgradeEmail: (count: number, country: string) => void;
  handlePreviewForEU: () => void;
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
  onEditPreview,
  handleShowUpgradeEmail,
  handleSendUpgradeEmail,
  handlePreviewForEU,
  totalCustomerCount,
}) => {
  // Ref for auto-scrolling to the latest message
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add auto-scroll effect when conversation changes
  useEffect(() => {
    if (conversation.length > 0 && endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
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
                {message.type === "user" && (
                  <div className="flex justify-end mb-10">
                    <div className="bg-brand-deep-dark text-white rounded-lg px-4 py-2 max-w-md">
                      {message.content}
                    </div>
                  </div>
                )}

                {/* AI response with customer list */}
                {message.type === "ai" && message.customerList && (
                  <div className="bg-neutral-25 rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>
                    <div className="flex justify-end">
                      <Button onClick={() => onViewCustomers("All Customers")}>
                        View All Customers
                      </Button>
                    </div>
                  </div>
                )}

                {/* AI response with customer list */}
                {message.type === "ai" && message?.revenueGrowth && (
                  <div className="bg-neutral-25 rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>
                    <div className="grid gap-2 space-y-1">
                      <div className="grid gap-6">
                        <div className="flex flex-col p-4 border rounded-lg shadow-sm">
                          <h5 className="m-0 p-0 font-medium text-lg">
                            You have 687 customers on the free plan
                          </h5>
                          <p className="text-gray-600 mt-1">
                            Reach out to them with a limited-time discount to encourage upgrades
                          </p>
                          <div className="mt-4">
                            <Button
                                fullWidth
                                onClick={() => onEditPreview(687)}
                            >
                              Send Upgrade Emails
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-lg shadow-sm">
                          <h5 className="m-0 p-0 font-medium text-lg">
                            Several paying customers have recently churned
                          </h5>
                          <p className="text-gray-600 mt-1">
                            Set up a guided cancellation flow to capture reasons and offer retention options
                          </p>
                          <div className="mt-4">
                            <Button
                                fullWidth
                                onClick={() => {}}
                            >
                              Set up cancellation experience
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col p-4 border rounded-lg shadow-sm">
                          <h5 className="m-0 p-0 font-medium text-lg">
                            Your pricing page has high traffic but low conversions
                          </h5>
                          <p className="text-gray-600 mt-1">
                            Run an A/B test on layout or messaging to boost conversions
                          </p>
                          <div className="mt-4">
                            <Button
                                fullWidth
                                onClick={() => {}}
                            >
                              Start Pricing Page A/B test
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI response with sections */}
                {/* {message.type === "ai" &&
                  message?.response &&
                  !message.revenueGrowth && (
                    <div className="bg-neutral-25 rounded-lg p-6 shadow-sm max-w-xl">
                      <p className="mb-6">{message.response.analysis}</p>

                      {message.response.sections.map(
                        (section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-6">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-semibold">{section.title}</h3>
                              <Button
                                styleType={"icon-borderless"}
                                variant={"neutral"}
                                onClick={() => onViewCustomers(section.title)}
                              >
                                <Eye size={18} />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {section.description}
                            </p>
                            <div className="flex items-center">
                              <span className="text-3xl font-bold mr-2">
                                {section.count}
                              </span>
                              <span className="text-gray-600">Items</span>
                            </div>
                          </div>
                        )
                      )}

                      {message.response.recommendation && (
                        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                          <h4 className="font-semibold text-primary-600 mb-2">
                            Recommendation
                          </h4>
                          <p className="text-primary-700">
                            {message.response.recommendation}
                          </p>
                        </div>
                      )}

                      {message.response.sections.some(
                        (s) =>
                          s.title.toLowerCase().includes("payment") ||
                          s.description.toLowerCase().includes("payment")
                      ) && (
                        <div className="flex space-x-4 mt-8">
                          <EmailModal
                            onSend={onConfirmSendEmails}
                            customerCount={totalCustomerCount}
                          >
                            <Button onClick={onSendAllEmails}>
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
                  )} */}

                {/* Email sent confirmation */}
                {message.type === "ai" && message.emailSent && (
                  <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold">
                        Payment Method Update Request
                      </h4>
                      <p className="text-sm text-gray-600">
                        Sent to: {message.emailSent.count} customers
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(message.emailSent.sentAt)}
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={onShowEmail}>Show email</Button>
                      <Button variant="neutral" onClick={onAutomateWorkflow}>
                        Automate this workflow
                      </Button>
                    </div>
                  </div>
                )}

                {/* Email review confirmation */}
                {message.type === "ai" && message?.emailReview && (
                  <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>

                    <div className="mb-4 bg-neutral-25 rounded-md flex items-center justify-between">
                      <div className="p-4">
                        <h4 className="mb-0">Upgrade offer email</h4>
                        <p className="text-lightest mb-0">
                          To: {message.emailReview.count} customers
                        </p>
                      </div>
                      <Button
                        className="mr-2"
                        variant="neutral"
                        onClick={() => {
                          let content, count;
                          if (message?.emailReview?.country === "eu") {
                            count = 200;
                            content = `
Subject: Unlock premium features with an upgrade

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to invite you to explore our Premium plan, which offers significant enhancements to help grow your business.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This message is exclusive to our valued EU customers.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team
                            `;
                          } else {
                            count = 687;
                            content = `
Subject: Upgrade now and get 10% off — limited-time offer!

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to offer you a special limited-time discount: Upgrade today and enjoy 10% off for the first year of our Premium plan.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This offer expires in 7 days.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team
                            `;
                          }

                          handleShowUpgradeEmail({ content, count });
                        }}
                      >
                        <Eye size={18} />
                      </Button>
                      {/* <Button
                        className="mr-2"
                        variant="neutral"
                        onClick={() =>
                          handleShowUpgradeEmail({
                            content: `
                        Subject: Upgrade now and get 10% off — limited-time offer!

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to offer you a special limited-time discount: Upgrade today and enjoy 10% off for the first year of our Premium plan.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This offer expires in 7 days.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team    
                        `,
                            count: 687,
                          })
                        }
                      >
                        <Eye size={18} />
                      </Button> */}
                    </div>

                    <Button
                      fullWidth
                      //   onClick={() => handleSendUpgradeEmail(687, null)}
                      onClick={() => {
                        if (message?.emailReview?.country === "eu") {
                          handleSendUpgradeEmail(200, "eu");
                        } else {
                          handleSendUpgradeEmail(687, null);
                        }
                      }}
                    >
                      Send {message.emailReview.count} emails
                    </Button>
                  </div>
                )}

                {/* Email review sent */}
                {message.type === "ai" && message?.upgradeEmailSent && (
                  <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>

                    <div className="mb-4 bg-neutral-25 rounded-md flex items-center justify-between">
                      <div className="p-4">
                        <h4 className="mb-0">Upgrade offer email</h4>
                        <p className="text-lightest mb-0">
                          To: {message.upgradeEmailSent.count} customers
                        </p>
                      </div>
                      <Button
                        variant="neutral"
                        className="mr-2"
                        onClick={() => {
                          let content, count;
                          if (message.upgradeEmailSent.country === "us") {
                            count = 350;
                            content = `
Subject: Upgrade now and get 10% off — limited-time offer!

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to offer you a special limited-time discount: Upgrade today and enjoy 10% off for the first year of our Premium plan.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This message is exclusive to our valued US customers.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team
                            `;
                          } else if (
                            message?.upgradeEmailSent?.country === "eu"
                          ) {
                            count = 200;
                            content = `
Subject: Unlock premium features with an upgrade

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to invite you to explore our Premium plan, which offers significant enhancements to help grow your business.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This message is exclusive to our valued EU customers.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team 
                            `;
                          } else {
                            count = 687;
                            content = `
Subject: Upgrade now and get 10% off — limited-time offer!

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to offer you a special limited-time discount: Upgrade today and enjoy 10% off for the first year of our Premium plan.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This message is exclusive to our valued US customers.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team
                            `;
                          }

                          handleShowUpgradeEmail({ content, count });
                        }}
                      >
                        <Eye size={18} />
                      </Button>
                      {/* <Button
                        onClick={() =>
                          handleShowUpgradeEmail({
                            content: `
                        Subject: Upgrade now and get 10% off — limited-time offer!

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to offer you a special limited-time discount: Upgrade today and enjoy 10% off for the first year of our Premium plan.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This offer expires in 7 days.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team    
                        `,
                            count: 687,
                          })
                        }
                        className="mr-2"
                        variant="neutral"
                      >
                        <Eye size={18} />
                      </Button> */}
                    </div>
                  </div>
                )}

                {message.type === "ai" && message.sendToUSCustomers && (
                  <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>

                    <Button
                      fullWidth
                      onClick={() => {
                        handleSendUpgradeEmail(350, "us");
                      }}
                    >
                      Yes, proceed
                    </Button>

                    {/* <div className="mb-4 bg-neutral-25 rounded-md flex items-center justify-between">
                      <div className="p-4">
                        <h4 className="mb-0">Upgrade offer email</h4>
                        <p className="text-lightest mb-0">To: 350 customers</p>
                      </div>
                      <Button
                        onClick={() =>
                          handleShowUpgradeEmail({
                            content: `
Subject: Upgrade now and get 10% off — limited-time offer!

Dear Customer,

You've been using AcmeCRM on the free plan. We appreciate your continued use of our platform.

We'd like to offer you a special limited-time discount: Upgrade today and enjoy 10% off for the first year of our Premium plan.

With Premium, you'll get:
- Unlimited contacts
- Advanced automation
- Priority support
- Custom reporting

This message is exclusive to our valued US customers.

[Upgrade Now]

Thank you for choosing AcmeCRM!

Best regards,
The AcmeCRM Team
                        `,
                            count: 350,
                          })
                        }
                        className="mr-2"
                        variant="neutral"
                      >
                        <Eye size={18} />
                      </Button>
                    </div> */}
                  </div>
                )}

                {/* Send to EU without offer */}
                {message.type === "ai" && message?.sendToEUCustWithoutOffer && (
                  <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>

                    <Button fullWidth onClick={handlePreviewForEU}>
                      Yes, proceed
                    </Button>
                  </div>
                )}

                {/* Workflow automated confirmation */}
                {message.type === "ai" && message.workflowAutomated && (
                  <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl">
                    <p className="mb-4">{message.content}</p>

                    <Button onClick={onViewWorkflow}>View Workflow</Button>
                  </div>
                )}

                {/* Simple AI response (error) */}
                {message.type === "ai" &&
                  !message.response &&
                  !message.emailSent &&
                  !message.emailReview &&
                  !message.upgradeEmailSent &&
                  !message.workflowAutomated &&
                  !message.customerList &&
                  !message.revenueGrowth &&
                  !message.sendToUSCustomers &&
                  !message.sendToEUCustWithoutOffer && (
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
