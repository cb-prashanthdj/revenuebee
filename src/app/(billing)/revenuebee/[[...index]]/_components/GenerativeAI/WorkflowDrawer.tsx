import React from 'react';
import { Pause, Play, Save } from 'lucide-react';
import { Button } from 'cb-sting-react-ts';

interface WorkflowContentProps {
    isPaused: boolean;
    daysBeforeExpiry: number;
    days: number;
    hasUnsavedChanges: boolean;
    onDaysChange: (value: number) => void;
    onSaveChanges: () => void;
    onToggleWorkflowStatus: () => void;
    onClose?: () => void;
    showFooter?: boolean;
}

const WorkflowContent: React.FC<WorkflowContentProps> = ({
                                                             isPaused,
                                                             daysBeforeExpiry,
                                                             days,
                                                             hasUnsavedChanges,
                                                             onDaysChange,
                                                             onSaveChanges,
                                                             onToggleWorkflowStatus,
                                                             onClose,
                                                             showFooter = false
                                                         }) => {
    return (
        <>
            <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${isPaused ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        <span className="text-sm font-medium">{isPaused ? 'Paused' : 'Active'}</span>
                    </div>
                    <Button
                        variant="neutral"
                        onClick={onToggleWorkflowStatus}
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
                                        className={`border rounded w-16 px-2 py-1 text-sm ${hasUnsavedChanges ? 'border-primary-500' : 'border-gray-300'}`}
                                        value={days}
                                        onChange={(e) => onDaysChange(parseInt(e.target.value) || 0)}
                                        min="1"
                                        max="30"
                                    />
                                    <span className="text-sm mx-2">days before expiry</span>
                                    <Button
                                        onClick={onSaveChanges}
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
            {showFooter && (
                <div className="border-t border-gray-200 p-4 flex justify-between space-x-2">
                    <Button variant="neutral" onClick={onClose}>
                        Close
                    </Button>
                    {hasUnsavedChanges && (
                        <Button onClick={onSaveChanges}>
                            Save Changes
                        </Button>
                    )}
                </div>
            )}
        </>
    );
};

export default WorkflowContent;