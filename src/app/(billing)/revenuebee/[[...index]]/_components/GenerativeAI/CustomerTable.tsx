// components/CustomerTable.tsx
import React, { useState } from 'react';
import { Badge, Button } from 'cb-sting-react-ts';
import { Customer } from '../../../services/CustomerAI';

interface CustomerTableProps {
    customers: Customer[];
    selectable?: boolean;
    onSelectionChange?: (selectedIds: number[]) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
                                                         customers,
                                                         selectable = false,
                                                         onSelectionChange
                                                     }) => {
    const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]); // Changed from string[] to number[]
    const [selectAll, setSelectAll] = useState(false);

    const handleToggleAll = () => {
        if (selectAll) {
            setSelectedCustomers([]);
        } else {
            setSelectedCustomers(customers.map(c => Number(c.id)));
        }
        setSelectAll(!selectAll);

        if (onSelectionChange) {
            onSelectionChange(selectAll ? [] : customers.map(c => Number(c.id)));
        }
    };

    const handleToggleCustomer = (customerId: string) => { // Keep as string for input
        const customerIdNumber = Number(customerId); // Convert to number
        const newSelection = selectedCustomers.includes(customerIdNumber)
            ? selectedCustomers.filter(id => id !== customerIdNumber)
            : [...selectedCustomers, customerIdNumber];

        setSelectedCustomers(newSelection);
        setSelectAll(newSelection.length === customers.length);

        if (onSelectionChange) {
            onSelectionChange(newSelection);
        }
    };

    // Helper function to determine status badge variant
    const getStatusBadgeVariant = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'active') return 'success';
        if (statusLower === 'at risk' || statusLower === 'at_risk') return 'warning';
        if (statusLower === 'churned' || statusLower === 'cancelled') return 'danger';
        return 'neutral';
    };

    // Helper function to determine overdue badge variant
    const getOverdueBadgeVariant = (daysOverdue: number) => {
        if (daysOverdue < 30) return 'warning';
        if (daysOverdue < 60) return 'danger';
        return 'danger';
    };

    // Helper function to get overdue text
    const getOverdueText = (daysOverdue: number) => {
        if (daysOverdue < 30) return '< 30 days';
        if (daysOverdue < 60) return '30-60 days';
        if (daysOverdue < 90) return '60-90 days';
        return '> 90 days';
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {selectable && (
                        <th scope="col" className="relative px-4 py-3 w-10">
                            <input
                                type="checkbox"
                                className="absolute h-4 w-4 rounded border-gray-300"
                                checked={selectAll}
                                onChange={handleToggleAll}
                            />
                        </th>
                    )}
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MRR
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Overdue
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                    <tr key={customer.id} className={selectable ? 'hover:bg-gray-50 cursor-pointer' : ''}>
                        {selectable && (
                            <td className="px-4 py-3 whitespace-nowrap w-10">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300"
                                    checked={selectedCustomers.includes(Number(customer.id))}
                                    onChange={() => handleToggleCustomer(customer.id)}
                                />
                            </td>
                        )}
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            {customer.email && <div className="text-sm text-gray-500">{customer.email}</div>}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${customer.mrr.toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{customer.subscriptionPlan}</div>
                            <Badge
                                variant={getStatusBadgeVariant(customer.subscriptionStatus)}
                            >
                                {customer.subscriptionStatus}
                            </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{customer.invoiceId}</div>
                            <Badge
                                variant={customer.invoiceStatus?.toLowerCase() === 'unpaid' ? 'danger' : 'success'}
                            >
                                {customer.invoiceStatus}
                            </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            {customer.daysOverdue > 0 ? (
                                <div className="flex flex-col">
                                    <Badge
                                        variant={getOverdueBadgeVariant(customer.daysOverdue)}
                                    >
                                        {getOverdueText(customer.daysOverdue)}
                                    </Badge>
                                    <span className="text-sm text-gray-500 mt-1">{customer.daysOverdue} days</span>
                                </div>
                            ) : (
                                <span className="text-sm text-gray-500">Not overdue</span>
                            )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {customer.paymentMethod ? (
                                <div className="flex flex-col">
                                    <span className="text-gray-900">{customer.paymentMethod}</span>
                                    {customer.paymentMethodStatus && (
                                        <Badge
                                            variant={customer.paymentMethodStatus.toLowerCase() === 'expired' ? 'danger' : 'success'}
                                        >
                                            {customer.paymentMethodStatus}
                                        </Badge>
                                    )}
                                </div>
                            ) : (
                                <span className="text-gray-500">No payment method</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;