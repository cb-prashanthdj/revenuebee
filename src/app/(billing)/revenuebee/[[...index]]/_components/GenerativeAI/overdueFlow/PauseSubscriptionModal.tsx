// components/CancelSubscriptionsModal.tsx
import React from "react";
import { Button, SModal } from "cb-sting-react-ts";

interface PauseSubscriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerCount: number;
}

const PauseSubscriptionsModal: React.FC<PauseSubscriptionsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  customerCount,
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
          <SModal.Title textSize="xlarge" className="text-2xl font-semibold">
            Pause Subscriptions for {customerCount} Customers
          </SModal.Title>
        </SModal.Header>
        <SModal.Body>
          <div className="space-y-6 text-gray-600">
            <p>
              This will temporarily pause the subscriptions for the selected
              customers. They won't be billed until the subscription is resumed.
            </p>
            <p>You can resume these subscriptions at any time.</p>
          </div>
        </SModal.Body>
        <SModal.Footer>
          <SModal.Close asChild>
            <Button onClick={onClose} variant="neutral">
              Cancel
            </Button>
          </SModal.Close>
          <SModal.Close asChild>
            <Button onClick={onConfirm}>Pause Subscriptions</Button>
          </SModal.Close>
        </SModal.Footer>
      </SModal.Content>
    </SModal.Root>
  );
};

export default PauseSubscriptionsModal;
