// components/Subscription/SubscriptionPrompt.tsx
import React from 'react';
import { Button } from 'cb-sting-react-ts';

interface SubscriptionPromptProps {
    onToggleCanvas: () => void;
}

const SubscriptionPrompt: React.FC<SubscriptionPromptProps> = ({ onToggleCanvas }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button
                    onClick={onToggleCanvas}
                >
                    Create Subscription
                </Button>
            </div>
        </div>
    );
};

export default SubscriptionPrompt;