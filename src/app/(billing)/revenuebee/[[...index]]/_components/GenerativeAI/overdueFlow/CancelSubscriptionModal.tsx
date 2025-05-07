// components/CancelSubscriptionsModal.tsx
import React from "react";
import { Button, SModal } from "cb-sting-react-ts";

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
            Cancel Subscriptions for {customerCount} Customers
          </SModal.Title>
        </SModal.Header>
        <SModal.Body>
          <div className="space-y-6 text-gray-600">
            <p>
              This will permanently cancel the subscriptions for the selected
              customers. This action cannot be undone.
            </p>
            <p>
              Customers will need to re-subscribe if they wish to restore
              service.
            </p>
          </div>
        </SModal.Body>
        <SModal.Footer>
          <SModal.Close asChild>
            <Button onClick={onClose} variant="neutral">
              Cancel
            </Button>
          </SModal.Close>
          <SModal.Close asChild>
            <Button variant="danger" onClick={onConfirm}>
              Cancel Subscriptions
            </Button>
          </SModal.Close>
        </SModal.Footer>
      </SModal.Content>
    </SModal.Root>
  );
};

export default CancelSubscriptionsModal;
