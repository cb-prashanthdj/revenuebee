import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// GitHub URL for the JSON file
// Replace with your actual GitHub raw URL
const API_DATA_URL = "/api/customers";

interface CustomerConfig {
  language: string;
  autoCollection: boolean;
  preferredCurrency: string;
  directDebit: boolean;
  taxExemption: boolean;
  consolidatedInvoicing: boolean;
  closureOfInvoice: boolean;
}

interface billingAddress {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  zip: string;
}

interface paymentCards {
  cardNumber: string;
  cardType: string;
  expiryDate: string;
  cardHolderName: string;
  cvv: string;
  gateway: string;
}

interface Customer {
  id: string;
  customerName: string;
  channel: string;
  customerEmail: string;
  customerPhone: string;
  status: string;
  createdOn: string;
  billingAddress: billingAddress[];
  paymentMethods: paymentCards[];
  activityLogs: Array<any>;
  language: string;
  configuration: CustomerConfig;
  netPayment?: number;
  businessEntity?: string;
}

interface CustomersStore {
  customers: Customer[];
  isLoading: boolean;
  error: any;
  loadCustomers: () => Promise<void>;
  getCustomerById: (id: string) => Customer | undefined;
  getCustomersByBusinessEntity: (businessEntityId: string) => Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updatedData: Partial<Customer>) => boolean;
  deleteCustomer: (id: string) => boolean;
}

export const useCustomerStore = create<CustomersStore>()(
  persist(
    (set, get) => ({
      // state
      customers: [],
      isLoading: false,
      error: null,

      // Data loading method
      loadCustomers: async () => {
        // Check if we already have data in the store
        if (get().customers.length > 0) {
          return; // Already loaded from localStorage
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(API_DATA_URL);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch customers data: ${response.statusText}`
            );
          }

          const data = await response.json();
          set({ customers: data, isLoading: false });
        } catch (error: any) {
          console.error("Error loading customers data:", error);
          set({ error: error.message, isLoading: false });
        }
      },

      // methods
      getCustomerById: (id: string) => {
        return get().customers.find((customer) => customer.id === id);
      },

      getCustomersByBusinessEntity: (businessEntityId: string) => {
        if (businessEntityId === "SITE") return get().customers;
        return get().customers.filter(
          (customer) => customer.businessEntity === businessEntityId
        );
      },

      addCustomer: (customer: Customer) => {
        set((state) => ({
          customers: [...state.customers, customer],
        }));
      },

      updateCustomer: (id: string, updatedData: Partial<Customer>) => {
        const { customers } = get();
        const customerIndex = customers.findIndex(
          (customer) => customer.id === id
        );

        if (customerIndex === -1) return false;

        const updatedCustomers = [...customers];
        updatedCustomers[customerIndex] = {
          ...updatedCustomers[customerIndex],
          ...updatedData,
        };

        set({ customers: updatedCustomers });
        return true;
      },

      deleteCustomer: (id: string) => {
        const { customers } = get();
        const customerIndex = customers.findIndex(
          (customer) => customer.id === id
        );

        if (customerIndex === -1) return false;

        const updatedCustomers = customers.filter(
          (customer) => customer.id !== id
        );
        set({ customers: updatedCustomers });
        return true;
      },
    }),
    {
      name: "customer-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      // Optional: You can specify which parts of the state to persist
      partialize: (state) => ({
        customers: state.customers,
        // Don't persist loading states or errors
      }),
    }
  )
);
