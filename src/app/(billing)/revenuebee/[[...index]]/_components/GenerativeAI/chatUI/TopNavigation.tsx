// components/TopNavigation.tsx
import React from "react";
import { ArrowLeft, Save, Maximize, Minimize } from "lucide-react";
import { Button } from "cb-sting-react-ts";

interface TopNavigationProps {
    canvasOpen: boolean;
    onBack: () => void;
    onToggleCanvas: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
                                                         canvasOpen,
                                                         onBack,
                                                         onToggleCanvas
                                                     }) => {
    return (
        <div className="flex justify-between items-center bg-purple-50 p-3 shadow-sm">
            <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:bg-violet-600 hover:text-white rounded-md px-2 py-1"
            >
                <ArrowLeft size={14} className="mr-1" />
                <span>Back</span>
            </button>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onToggleCanvas}
                    className="flex items-center space-x-1"
                >
                    {canvasOpen ? (
                        <>
                            <Minimize size={16} />
                            <span>Hide Canvas</span>
                        </>
                    ) : (
                        <>
                            <Maximize size={16} />
                            <span>Show Canvas</span>
                        </>
                    )}
                </Button>

                <button className="flex items-center text-gray-600 hover:bg-violet-600 hover:text-white rounded-md px-2 py-1">
                    <Save size={16} className="mr-2" />
                    <span>Save View</span>
                </button>
            </div>
        </div>
    );
};

export default TopNavigation;