// components/CustomerTable.tsx
import React, { useState } from 'react';
import { Badge, Button } from 'cb-sting-react-ts';

interface Customer {
    id: number;
    name: string;
    email: string;
    mrr: number;
    status: 'active' | 'at_risk' | 'churned';
    paymentMethod?: {
        type: string;
        isExpired: boolean;
        expiresIn: number;
    } | null;
}

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
    const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleToggleAll = () => {
        if (selectAll) {
            setSelectedCustomers([]);
        } else {
            setSelectedCustomers(customers.map(c => c.id));
        }
        setSelectAll(!selectAll);

        if (onSelectionChange) {
            onSelectionChange(selectAll ? [] : customers.map(c => c.id));
        }
    };

    const handleToggleCustomer = (customerId: number) => {
        const newSelection = selectedCustomers.includes(customerId)
            ? selectedCustomers.filter(id => id !== customerId)
            : [...selectedCustomers, customerId];

        setSelectedCustomers(newSelection);
        setSelectAll(newSelection.length === customers.length);

        if (onSelectionChange) {
            onSelectionChange(newSelection);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {selectable && (
                        <th scope="col" className="relative pt-6 pl-2  w-10 flex justify-center items-center">
                            <input
                                type="checkbox"
                                className="absolute h-4 w-4 rounded border-gray-300"
                                checked={selectAll}
                                onChange={handleToggleAll}
                            />
                        </th>
                    )}
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MRR
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
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
                                    checked={selectedCustomers.includes(customer.id)}
                                    onChange={() => handleToggleCustomer(customer.id)}
                                />
                            </td>
                        )}
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{customer.email}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${customer.mrr.toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <Badge
                                variant={
                                    customer.status === 'active'
                                        ? 'success'
                                        : customer.status === 'at_risk'
                                            ? 'warning'
                                            : 'danger'
                                }
                            >
                                {customer.status}
                            </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {customer.paymentMethod
                                ? `${customer.paymentMethod.type} ${customer.paymentMethod.isExpired
                                    ? '(Expired)'
                                    : customer.paymentMethod.expiresIn < 30
                                        ? `(Expires in ${customer.paymentMethod.expiresIn} days)`
                                        : ''}`
                                : 'None'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;