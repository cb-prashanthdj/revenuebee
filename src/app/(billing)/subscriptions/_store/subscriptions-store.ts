import { create } from "zustand";

import subscriptionsData from "./subscriptions.json";

interface SubscriptionConfig {
  autoCollection: boolean;
  jsonMetaData: any;
}

interface Subscription {
  name: string;
  id: string;
  billingFrequency: string;
  productFamily: string;
  businessEntity: Array<string>;
  customer: string;
  createdAt: string;
  status: string;
  items: Array<string>;
  billingAddress: string;
  paymentMethod: string;
  nextRenewal: string;
  MRR: number;
  subscriptionConfig: SubscriptionConfig;
}

interface SubscriptionsStore {
  subscriptions: Subscription[];
  getSubscriptionsByCustomer: (customerId: string) => Subscription[];
  getSubscriptionById: (subscriptionId: string) => Subscription | undefined;
  getSubscriptionsByCustomerAndBusinessEntity: (
    customerId: string,
    businessEntity: string
  ) => Subscription[];
  getSubscriptionsByBusinessEntity: (businessEntity: string) => Subscription[];
}

export const useSubscriptionsStore = create<SubscriptionsStore>((set, get) => ({
  // state
  subscriptions: subscriptionsData,

  // selectors
  getSubscriptionsByCustomer: (customerId: string) => {
    const { subscriptions } = get();
    console.log(
      customerId,
      subscriptions
        .map((subscription) => subscription.customer)
        .includes(customerId)
    );
    return subscriptions.filter(
      (subscription) => subscription.customer == customerId
    );
  },

  // utility to get a single subscription
  getSubscriptionById: (subscriptionId: string) => {
    const { subscriptions } = get();
    return subscriptions.find(
      (subscription) => subscription.id === subscriptionId
    );
  },
  // New function to get subscriptions by customer and businessEntity
  getSubscriptionsByCustomerAndBusinessEntity: (
    customerId: string,
    businessEntity: string
  ) => {
    const { subscriptions } = get();
    if (businessEntity === "SITE") {
      return subscriptions.filter(
        (subscription) => subscription.customer === customerId
      );
    } else {
      return subscriptions.filter(
        (subscription) =>
          subscription.customer === customerId &&
          subscription.businessEntity.includes(businessEntity)
      );
    }
  },
  // New function to get subscriptions by  businessEntity
  getSubscriptionsByBusinessEntity: (businessEntity: string) => {
    const { subscriptions } = get();
    if (businessEntity === "SITE") {
      return subscriptions;
    } else {
      return subscriptions.filter((subscription) =>
        subscription.businessEntity.includes(businessEntity)
      );
    }
  },
}));
