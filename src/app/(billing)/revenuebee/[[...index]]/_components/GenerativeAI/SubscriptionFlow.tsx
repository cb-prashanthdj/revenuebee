// components/Subscription/SubscriptionForm.tsx
import React, { useState, useEffect } from 'react';
import { Button } from 'cb-sting-react-ts';

interface SubscriptionData {
    customerId: string;
    customerEmail: string;
    plan: string;
    billingCycles: string;
    startDate: string;
    trialEnd: string;
    quantity: number;
    autoCollection: string;
}

interface SubscriptionFlowProps {
    onSubmit: (formData: SubscriptionData) => void;
    showToast?: (props: any) => void;
    // Any other props it might need
    initialMode?: 'edit' | 'preview';
    initialData?: SubscriptionData
}

// @ts-ignore
// @ts-ignore
const SubscriptionForm: React.FC<SubscriptionFlowProps> = ({
                                                               initialData,
                                                               onSubmit,
                                                               initialMode = 'edit'
                                                           }) => {
    const [formData, setFormData] = useState<SubscriptionData>(initialData);
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>(initialMode);

    // Update form data when initialData changes
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    // Update view mode when initialMode changes
    useEffect(() => {
        setViewMode(initialMode);
    }, [initialMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleEdit = () => {
        setViewMode('edit');
    };

    const handlePreview = () => {
        setViewMode('preview');
    };

    // Render preview mode
    if (viewMode === 'preview') {
        return (
            <div className="p-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">

                    <div className="grid grid-cols-2 gap-y-6">
                        <div>
                            <h3 className="text-sm text-gray-500">Customer ID</h3>
                            <p className="font-medium">{formData.customerId}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Customer Email</h3>
                            <p className="font-medium">{formData.customerEmail}</p>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-500">Plan</h3>
                            <p className="font-medium">{formData.plan}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Billing Cycles</h3>
                            <p className="font-medium">{formData.billingCycles}</p>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-500">Start Date</h3>
                            <p className="font-medium">{formData.startDate}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Trial End</h3>
                            <p className="font-medium">{formData.trialEnd || 'No trial'}</p>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-500">Quantity</h3>
                            <p className="font-medium">{formData.quantity}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Auto Collection</h3>
                            <p className="font-medium">{formData.autoCollection}</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-8">
                        <Button
                            onClick={handleEdit}
                            variant={'neutral'}
                        >
                            Edit Details
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            styleType="primary"
                        >
                            Create Subscription
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Render edit mode
    return (
        <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handlePreview();
                }} className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                        <input
                            type="text"
                            name="customerId"
                            value={formData.customerId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                        <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Subscription Plan</label>
                        <select
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="premium-annual">Premium Annual ($199.99/yr)</option>
                            <option value="premium-monthly">Premium Monthly ($19.99/mo)</option>
                            <option value="basic-annual">Basic Annual ($99.99/yr)</option>
                            <option value="basic-monthly">Basic Monthly ($9.99/mo)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Billing Cycles</label>
                        <select
                            name="billingCycles"
                            value={formData.billingCycles}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="12 cycles">12 cycles</option>
                            <option value="24 cycles">24 cycles</option>
                            <option value="unlimited">Unlimited</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Trial End Date (Optional)</label>
                        <input
                            type="date"
                            name="trialEnd"
                            value={formData.trialEnd === 'No trial' ? '' : formData.trialEnd}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="dd/mm/yyyy"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Auto Collection</label>
                        <select
                            name="autoCollection"
                            value={formData.autoCollection}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="on">On</option>
                            <option value="off">Off</option>
                        </select>
                    </div>

                    <div className="col-span-2 flex justify-end mt-6">

                        <Button
                            type="submit"
                            styleType="primary"
                        >
                            Preview Subscription
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubscriptionForm;