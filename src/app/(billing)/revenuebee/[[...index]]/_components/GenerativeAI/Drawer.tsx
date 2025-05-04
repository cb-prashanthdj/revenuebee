// components/Drawer.tsx
import React, { useState } from 'react';
import { SDrawer, Button } from 'cb-sting-react-ts';
import CustomerTable from './CustomerTable';
import CustomerAnalyzer from '../../../services/CustomerAI';
import { Mail } from 'lucide-react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
    position?: 'left' | 'right';
    sectionKey?: string | null;
    onSendEmail?: (selectedCustomers: number[]) => void;
}

const Drawer: React.FC<DrawerProps> = ({
                                           isOpen,
                                           onClose,
                                           title,
                                           children,
                                           position = 'right',
                                           sectionKey,
                                           onSendEmail
                                       }) => {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
    // Get appropriate customer data based on section title
    const getCustomerData = () => {
        if (!sectionKey) return [];

        // Get analyzer data
        const analyzer = CustomerAnalyzer;
        const customerData = analyzer.customerData || [];

        // Filter based on section title
        if (sectionKey.toLowerCase().includes('without payment')) {
            return customerData.filter(c => !c.paymentMethod);
        } else if (sectionKey.toLowerCase().includes('expired')) {
            return customerData.filter(c => c.paymentMethod?.isExpired);
        } else if (sectionKey.toLowerCase().includes('soon-to-expire')) {
            return customerData.filter(c =>
                c.paymentMethod &&
                !c.paymentMethod.isExpired &&
                c.paymentMethod.expiresIn < 30
            );
        } else if (sectionKey.toLowerCase().includes('at risk')) {
            return customerData.filter(c => c.status === 'at_risk');
        } else if (sectionKey.toLowerCase().includes('active')) {
            return customerData.filter(c => c.status === 'active');
        } else if (sectionKey.toLowerCase().includes('churned')) {
            return customerData.filter(c => c.status === 'churned');
        }

        // Default return all customers
        return customerData;
    };

    // Handle selection change from the customer table
    const handleSelectionChange = (ids: number[]) => {
        setSelectedCustomerIds(ids);
    };

    // Handle send email button click
    const handleSendEmail = () => {
        if (onSendEmail && selectedCustomerIds.length > 0) {
            onSendEmail(selectedCustomerIds);
        }
        onClose(); // Close the drawer after action
    };

    const filteredCustomers = getCustomerData();

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
                placement={position}
                showCloseIcon
                hasFooter={"true"}
                size="wide"
            >
                <SDrawer.Header
                    showCloseIcon
                >
                    <SDrawer.Title>
                        {title}
                    </SDrawer.Title>
                    {filteredCustomers.length > 0 && (
                        <div className="s-text-sm s-text-gray-600">
                            {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''} found
                        </div>
                    )}
                </SDrawer.Header>
                <div className="s-p-6 s-flex-1 s-overflow-y-auto">
                    {children || (
                        <CustomerTable
                            customers={filteredCustomers}
                            selectable={true}
                            onSelectionChange={handleSelectionChange}
                        />
                    )}
                </div>
                <SDrawer.Footer>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        disabled={selectedCustomerIds.length === 0}
                        onClick={handleSendEmail}
                        className="s-bg-purple-500 s-text-white s-flex s-items-center"
                    >
                        <Mail size={16} className="s-mr-2" />
                        Send Email ({selectedCustomerIds.length})
                    </Button>
                </SDrawer.Footer>
            </SDrawer.Content>
        </SDrawer>
    );
};

export default Drawer;