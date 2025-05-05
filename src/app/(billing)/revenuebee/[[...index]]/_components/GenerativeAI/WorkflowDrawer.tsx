import React, { useState } from 'react';
import { Pause, Play, Save } from 'lucide-react';
import { SDrawer, Button } from 'cb-sting-react-ts';
import { useToast } from '../ToastProvider';

interface WorkflowDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const WorkflowDrawer: React.FC<WorkflowDrawerProps> = ({
                                                           isOpen,
                                                           onClose
                                                       }) => {
    const { showToast } = useToast();
    const [daysBeforeExpiry, setDaysBeforeExpiry] = useState(5);
    const [days, setDays] = useState(5);
    const [isPaused, setIsPaused] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Update days before expiry
    const handleDaysChange = (value: number) => {
        setDays(value);
        // If the value is different from saved value, mark as unsaved
        setHasUnsavedChanges(value !== daysBeforeExpiry);
    };

    // Save changes
    const handleSaveChanges = () => {
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

    // Toggle workflow pause/resume
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

    return (
        <SDrawer
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <SDrawer.Content
                className=""
                height="full"
                placement="right"
                showCloseIcon
                size="wide"
            >
                <SDrawer.Header
                    showCloseIcon
                >
                    <SDrawer.Title>Payment Method Update Workflow</SDrawer.Title>
                </SDrawer.Header>
                <div className="s-p-6 s-flex-1 s-overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${isPaused ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                            <span className="text-sm font-medium">{isPaused ? 'Paused' : 'Active'}</span>
                        </div>
                        <Button
                            variant="neutral"
                            onClick={handleToggleWorkflowStatus}
                        >
                            {isPaused ? (
                                <>
                                    <Play size={16} className="mr-1 text-green-600" />
                                    <span>Resume Workflow</span>
                                </>
                            ) : (
                                <>
                                    <Pause size={16} className="mr-1 text-yellow-600" />
                                    <span>Pause Workflow</span>
                                </>
                            )}
                        </Button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow w-full max-w-5xl p-4">
                        <div className="mt-4">
                            <div className="flex relative">
                                {/* Step 1 */}
                                <div className="flex-shrink-0">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                            <span className="font-medium">1</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-4 pb-8">
                                    <h3 className="font-medium">Check Payment Method Expiry</h3>
                                    <p className="text-gray-600 text-sm mt-1">System checks daily for payment methods that will expire soon</p>
                                </div>

                                {/* Vertical Line */}
                                <div className="absolute left-4 top-10 transform w-0.5 h-8 mt-2 bg-gray-200"></div>
                            </div>

                            <div className="flex">
                                {/* Step 2 */}
                                <div className="flex-shrink-0">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                            <span className="font-medium">2</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-4 w-full">
                                    <h3 className="font-medium">Send Email Notification</h3>
                                    <p className="text-gray-600 text-sm mt-1">Automatically send email when payment method is about to expire</p>

                                    <div className="mt-4 flex items-center">
                                        <span className="text-sm mr-2">Send email</span>
                                        <input
                                            type="number"
                                            className={`border rounded w-16 px-2 py-1 text-sm ${hasUnsavedChanges ? 'border-yellow-500' : 'border-gray-300'}`}
                                            value={days}
                                            onChange={(e) => handleDaysChange(parseInt(e.target.value) || 0)}
                                            min="1"
                                            max="30"
                                        />
                                        <span className="text-sm mx-2">days before expiry</span>
                                        <Button
                                            onClick={handleSaveChanges}
                                            disabled={!hasUnsavedChanges}
                                        >
                                            <Save size={14} className="mr-1" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-medium">Workflow Status</h3>
                            <p className="text-gray-600 text-sm mt-1">
                                {isPaused
                                    ? "This workflow is currently paused. No emails will be sent."
                                    : `This workflow is active and running. Emails will be sent ${daysBeforeExpiry} days before payment method expiry.`
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <SDrawer.Footer>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    {hasUnsavedChanges && (
                        <Button onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    )}
                </SDrawer.Footer>
            </SDrawer.Content>
        </SDrawer>
    );
};

export default WorkflowDrawer;