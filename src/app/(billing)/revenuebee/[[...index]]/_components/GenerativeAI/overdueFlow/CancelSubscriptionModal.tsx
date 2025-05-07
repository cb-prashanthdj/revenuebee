// components/CancelSubscriptionsModal.tsx
import React from "react";
import {Button, SModal} from "cb-sting-react-ts";

interface CancelSubscriptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    customerCount: number;
}

const CancelSubscriptionsModal: React.FC<CancelSubscriptionsModalProps> = ({
                                                                               isOpen,
                                                                               onClose,
                                                                               onConfirm,
                                                                               customerCount
                                                                           }) => {
    if (!isOpen) return null;

    return (
        <SModal.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>

            <SModal.Content
                padding="large"
                size="small"
                space="large"
                variant="default"
            >
                <SModal.Header showCloseButton>
                    <SModal.Title textSize="xlarge">
                        Cancel subscriptions for {customerCount} customers?
                    </SModal.Title>
                </SModal.Header>

                <SModal.Footer>
                    <SModal.Close asChild>
                        <Button onClick={onClose}
                                variant={'neutral'}
                        >Cancel</Button>
                    </SModal.Close>
                    <SModal.Close asChild>
                        <Button
                            variant={'danger'}
                            onClick={onConfirm}>
                            Cancel Subscriptions
                        </Button>
                    </SModal.Close>
                </SModal.Footer>
            </SModal.Content>
        </SModal.Root>
    );
};

export default CancelSubscriptionsModal;