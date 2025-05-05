// components/AutomateWorkflowModal.jsx
import React from 'react';
import { Button, SModal } from 'cb-sting-react-ts';

const AutomateWorkflowModal = ({ isOpen, onClose, onEnable }) => {
    return (
        <SModal.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>

            <SModal.Content
                padding="large"
                size="small"
                space="regular"
                variant="default"
            >
                <SModal.Header showCloseButton>
                    <SModal.Title textSize="large">
                        Automate Payment Method Update Workflow
                    </SModal.Title>
                </SModal.Header>

                <SModal.Body className="py-4">
                    <p className="text-gray-600 mb-6">
                        This will set up an automated workflow to send payment method update emails to customers 5 days before their payment method expires. Would you like to create and enable this workflow?
                    </p>
                </SModal.Body>

                <SModal.Footer>
                    <SModal.Close asChild>
                        <Button
                            variant={'neutral'}
                        >Cancel</Button>
                    </SModal.Close>
                    <SModal.Close asChild>
                        <Button
                           onClick={onEnable}>
                            Enable Workflow
                        </Button>
                    </SModal.Close>
                </SModal.Footer>
            </SModal.Content>
        </SModal.Root>
    );
};

export default AutomateWorkflowModal;