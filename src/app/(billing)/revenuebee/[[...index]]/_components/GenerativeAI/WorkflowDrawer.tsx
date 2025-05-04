import React, { useState } from 'react';
import { Pause } from 'lucide-react';
import { SDrawer, Button } from 'cb-sting-react-ts';

interface WorkflowDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const WorkflowDrawer: React.FC<WorkflowDrawerProps> = ({
                                                           isOpen,
                                                           onClose
                                                       }) => {
    const [daysBeforeExpiry, setDaysBeforeExpiry] = useState(5);
    const [days, setDays] = useState(5);

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
                </SDrawer.Header>
                <div className="s-p-6 s-flex-1 s-overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold">Payment Method Update Workflow</h2>
                        <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm flex items-center">
                            <Pause size={16} className="mr-1" />
                            <span>Pause Workflow</span>
                        </button>
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
                                            className="border border-gray-300 rounded w-16 px-2 py-1 text-sm"
                                            value={days}
                                            onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                                        />
                                        <span className="text-sm mx-2">days before expiry</span>
                                        <button className="ml-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md px-3 py-1 text-sm">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-medium">Workflow Status</h3>
                            <p className="text-gray-600 text-sm mt-1">This workflow is active and running. Emails will be sent automatically.</p>
                        </div>
                    </div>
                </div>
            </SDrawer.Content>
        </SDrawer>
    );
};

export default WorkflowDrawer;