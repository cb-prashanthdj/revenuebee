import React, { useState, useEffect } from "react";
import { ArrowLeft, Maximize, Minimize, Save } from "lucide-react";
import { cn } from "../../../../../../lib/utils"
import { Button } from "cb-sting-react-ts";

interface ShrinkableHeaderProps {
    onBack: () => void;
    onToggleCanvas: () => void;
    canvasOpen: boolean;
    className?: string;
}

const ShrinkableHeader: React.FC<ShrinkableHeaderProps> = ({
                                                               onBack,
                                                               onToggleCanvas,
                                                               canvasOpen,
                                                               className,
                                                           }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll position to determine when to shrink the header
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={cn(
                "flex justify-between items-center bg-brand-deep-light border-b border-gray-200 sticky top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "py-1 px-3" : "p-3",
                className
            )}
        >
            <Button
                variant={'neutral'}
                onClick={onBack}
            >
                <ArrowLeft size={isScrolled ? 12 : 14} className="mr-1" />
                <span className={isScrolled ? "text-sm" : ""}>Back</span>
            </Button>

            <div className="flex items-center space-x-2">
                <Button
                    variant={'neutral'}
                    size={isScrolled ? "sm" : "default"}
                    onClick={onToggleCanvas}
                    className="flex items-center space-x-1"
                >
                    {canvasOpen ? (
                        <>
                            <Minimize size={isScrolled ? 14 : 16} />
                            <span>Hide Canvas</span>
                        </>
                    ) : (
                        <>
                            <Maximize size={isScrolled ? 14 : 16} />
                            <span>Show Canvas</span>
                        </>
                    )}
                </Button>

                <Button
                    variant={'neutral'}
                >
                    <Save size={isScrolled ? 14 : 16} className="mr-2" />
                    <span>Save View</span>
                </Button>
            </div>
        </div>
    );
};

export default ShrinkableHeader;