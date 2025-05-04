import React from 'react';
import { Button, SAlertDialog, Notification } from 'cb-sting-react-ts';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface DeleteSiteDialogProps {
    isOpen: boolean;
    siteName: string;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteSiteDialog: React.FC<DeleteSiteDialogProps> = ({
   isOpen,
   siteName,
   onClose,
   onConfirm
}) => {
    return (
        <SAlertDialog
            open={isOpen}
            action={{
                elemenet: <Button size="regular" variant="danger">{' '}Delete{' '}</Button>,
                label: 'Continue',
                onClick: onConfirm
            }}
            cancel={{
                elemenet: <Button size="regular" styleType="outline" variant="neutral">{' '}Cancel{' '}</Button>,
                label: 'Cancel',
                onClick: onClose
            }}
            description={
                <div>
                    <p>You will lose access to this site and all its data.</p>
                    <Notification
                        icon
                        size="regular"
                        variant="yellow"
                        width="full"
                        iconContent={
                            <div className="">
                                <InformationCircleIcon />
                            </div>
                        }
                    >
            <span className="s-notification-copy">
              This action cannot be undone.
            </span>
                    </Notification>
                </div>
            }
            title={`Delete site "${siteName}"?`}
        />
    );
};

export default DeleteSiteDialog;