// interface Conditions {
//   id: string;
//   entity: string;
//   operators: string[];
//   type: string;
//   values?: [];
//   placeholder?: string;
//   multiple?: boolean;
// }
// [];
// interface ConditionsGroup {
//   id: string;
//   method: string;
//   type: string;
//   values?: [];
//   placeholder?: string;
//   multiple?: boolean;
// }
// [];

// Define the base value type if needed
interface Value {
  id: string;
  name: string;
}

// Fix Conditions interface
export interface Conditions {
  id: string;
  entity: string;
  operators: string[];
  type: string;
  values?: Value[]; // Changed from [] to Value[]
  placeholder?: string;
  multiple?: boolean;
}

// Fix ConditionsGroup interface
export interface ConditionsGroup {
  id: string;
  method: string;
  type: string;
  values?: Value[]; // Changed from [] to Value[]
  placeholder?: string;
  multiple?: boolean;
}

const CustomerRegion = [
  {
    id: "cr_cl",
    entity: "Customer Location",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    multiple: true,
    values: [
      { id: "v1", name: "United States" },
      { id: "v2", name: "Canada" },
      { id: "v3", name: "European Union" },
      { id: "v4", name: "Asia-Pacific" },
    ],
  },
  {
    id: "cr_bc",
    entity: "Billing Country",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "country_select",
    multiple: true,
    values: [
      { id: "v1", name: "United States" },
      { id: "v2", name: "Canada" },
      { id: "v3", name: "European Union" },
      { id: "v4", name: "Asia-Pacific" },
    ],
  },
  {
    id: "cr_sc",
    entity: "Shipping Country",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "country_select",
    multiple: true,
    values: [
      { id: "v1", name: "United States" },
      { id: "v2", name: "Canada" },
      { id: "v3", name: "European Union" },
      { id: "v4", name: "Asia-Pacific" },
    ],
  },
];
const Currencies = [
  {
    id: "curr",
    entity: "Currency",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    multiple: true,
    values: [
      { id: "v1", name: "USD" },
      { id: "v2", name: "EUR" },
      { id: "v3", name: "GBP" },
      { id: "v4", name: "INR" },
    ],
  },
];
const PaymentPlans = [
  {
    id: "p_pln",
    entity: "Plan",
    operators: ["ov3", "ov4", "ov1", "ov9"], // 'Equals', 'Does Not Equal', 'Includes', 'Does Not Include'
    type: "select",
    values: [
      { id: "v1", name: "PC 2.0 " },
      { id: "v2", name: "PC 1.0" },
    ],
  },
];
const Amount = [
  {
    id: "amt",
    entity: "Amount",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "number",
  },
];
const PaymentMethods = [
  {
    id: "p_meth",
    entity: "Payment Method",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    multiple: true,
    values: [
      { id: "v1", name: "ACH (US)" },
      { id: "v2", name: "ACH Credit (US)" },
      { id: "v3", name: "Amazon Pay (Global)" },
      { id: "v4", name: "Apple Pay (Global)" },
      { id: "v5", name: "AUS BECS (AUS)" },
      { id: "v6", name: "Autogiro (Sweden)" },
      { id: "v7", name: "BACS (UK)" },
      { id: "v8", name: "Bancontact (Belgium)" },
      { id: "v9", name: "Boleto (Brazil)" },
      { id: "v10", name: "Card (Global)" },
      { id: "v11", name: "Faster Payments (UK)" },
      { id: "v12", name: "Giropay (Germany)" },
      { id: "v13", name: "Google Pay (Global)" },
      { id: "v14", name: "iDeal (Netherlands)" },
      { id: "v15", name: "Klarna Paynow (EU)" },
      { id: "v16", name: "Netbanking eMandates (India)" },
      { id: "v17", name: "NZ BECS (NZ)" },
      { id: "v18", name: "PAD (Canada)" },
      { id: "v19", name: "PayPal (Global)" },
      { id: "v20", name: "PayTo (AUS)" },
      { id: "v21", name: "SEPA (EU)" },
      { id: "v22", name: "SEPA Credit Transfer (EU)" },
      { id: "v23", name: "SEPA Bank Transfer (EU)" },
      { id: "v24", name: "UPI eMandates (India)" },
      { id: "v25", name: "Venmo (US)" },
    ],
  },
];
export const Gateways = [
  {
    id: "p_gw",
    entity: "Gateway",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "Adyen" },
      { id: "v2", name: "Amazon Payment" },
      { id: "v3", name: "Authorize.net" },
      { id: "v4", name: "Bank of America" },
      { id: "v5", name: "Bambora" },
      { id: "v6", name: "Bluepay" },
      { id: "v7", name: "Bluesnap" },
      { id: "v8", name: "Braintree" },
      { id: "v9", name: "Checkout.com" },
      { id: "v10", name: "Cybersource" },
      { id: "v11", name: "E-xact Payments" },
      { id: "v12", name: "Ebanx" },
      { id: "v13", name: "Ecentric" },
      { id: "v14", name: "Elevon" },
      { id: "v15", name: "eWay Rapid" },
      { id: "v16", name: "Global Payments OpenEdge" },
      { id: "v17", name: "GoCardless" },
      { id: "v18", name: "Metrics Global" },
      { id: "v19", name: "Mollie gateway" },
      { id: "v20", name: "Moneris" },
      { id: "v21", name: "NMI" },
      { id: "v22", name: "Oribital Chase" },
      { id: "v23", name: "Pay.com" },
      { id: "v24", name: "Paymill" },
      { id: "v25", name: "Dlocal" },
      { id: "v26", name: "PayPal Commerce" },
      { id: "v27", name: "PayPal Express" },
      { id: "v28", name: "PayPal Payflow" },
      { id: "v29", name: "PayPal Payflow" },
      { id: "v30", name: "Pin" },
      { id: "v31", name: "Quickbook Payments (intuit)" },
      { id: "v32", name: "Razorpay" },
      { id: "v33", name: "Sage Pay" },
      { id: "v34", name: "Stripe" },
      { id: "v35", name: "Vantiv (WorldPay)" },
      { id: "v36", name: "Wind Cave" },
      { id: "v37", name: "Worldline (Ingenico)" },
      { id: "v38", name: "WorldPay" },
      { id: "v39", name: "Nuvei" },
    ],
  },
];
const CardTypes = [
  {
    id: "c_typ",
    entity: "Card type",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "Credit" },
      { id: "v2", name: "Debit" },
      { id: "v3", name: "Prepaid" },
    ],
  },
];
const CardBrands = [
  {
    id: "c_brand",
    entity: "Card brand",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "Visa" },
      { id: "v2", name: "Mastercard" },
      { id: "v3", name: "Amex" },
      { id: "v4", name: "Discover" },
      { id: "v5", name: "Diners Club" },
    ],
  },
];
const InternationalCard = [
  {
    id: "c_int",
    entity: "International card",
    operators: ["ov3"], // 'Equals'
    type: "text",
  },
];
const CobadgedCards = [
  {
    id: "c_cbadge",
    entity: "Co-badged cards",
    operators: ["ov3"], // 'Equals'
    type: "text",
  },
];
const Bin = [
  {
    id: "p_bin",
    entity: "Bin country",
    operators: ["ov3"], // 'Equals'
    type: "text",
  },
];
const Level2EligibleCard = [
  {
    id: "c_lev2",
    entity: "Level 2 eligible card",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "Yes" },
      { id: "v2", name: "No" },
    ],
  },
];
const MetricAttribute = [
  { id: "v1", name: "Subscription ID" },
  { id: "v2", name: "model name" },
  { id: "v3", name: "model size" },
  { id: "v4", name: "customer id" },
  { id: "v5", name: "translation date" },
  { id: "v6", name: "region" },
  { id: "v6", name: "language-pair" },
  { id: "v6", name: "user id" },
  { id: "v6", name: "input tokens" },
  { id: "v6", name: "output tokens" },
];
const MethodSum = [
  {
    id: "m_sum",
    method: "Sum",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "m_count",
    method: "Count",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "m_min",
    method: "Min",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "m_max",
    method: "Max",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "m_unique",
    method: "Unique",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "m_average",
    method: "Average",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "m_recent",
    method: "Most recent",
    type: "select",
    values: [...MetricAttribute],
  },
];
const UsageAttributes = [
  {
    id: "event_id",
    method: "event_id",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "timestamp",
    method: "timestamp",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "subscription_id",
    method: "subscription_id",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "model_name",
    method: "model_name",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "input_tokens",
    method: "input_tokens",
    type: "select",
    values: [...MetricAttribute],
  },
  {
    id: "output_tokens",
    method: "output_tokens",
    type: "select",
    values: [...MetricAttribute],
  },
];
export const MetricGroupMethodsRuleCondition: ConditionsGroup[] = [
  ...MethodSum,
];
export const MetricUsageAttributes: ConditionsGroup[] = [...UsageAttributes];

export interface EntityOption {
  id: string;
  entity: string;
  type: string;
  operators: string[];
  values?: Array<{ id: string; name: string }>;
  placeholder?: string;
  multiple?: boolean;
}
const MetricEntityItems = [
  {
    id: "event_id",
    entity: "event_id",
    type: "text",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    values: [...MetricAttribute],
    placeholder: "Sum",
    multiple: false,
  },
  {
    id: "timestamp",
    entity: "timestamp",
    type: "text",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    values: [...MetricAttribute],
  },
  {
    id: "subscription_id",
    entity: "subscription_id",
    type: "text",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    values: [...MetricAttribute],
  },
  {
    id: "model_name",
    entity: "model_name",
    type: "text",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    values: [...MetricAttribute],
  },
  {
    id: "input_tokens",
    entity: "input_tokens",
    type: "text",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    values: [...MetricAttribute],
  },
  {
    id: "output_tokens",
    entity: "output_tokens",
    type: "text",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    values: [...MetricAttribute],
  },
  {
    id: "api_type",
    entity: "api_type",
    type: "select",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    values: [...MetricAttribute],
  },
];
export const MetricsEntities: EntityOption[] = [...MetricEntityItems];
const MetricsCol = [
  {
    id: "m_subscriptionid",
    entity: "Subscription ID",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "text",
    values: [
      { id: "v1", name: "Qwen 2.5" },
      { id: "v2", name: "Qwen 7B" },
      { id: "v2", name: "Qwen 13B" },
    ],
  },
  {
    id: "m_name",
    entity: "Model name",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "text",
    values: [
      { id: "v1", name: "Qwen 2.5" },
      { id: "v2", name: "Qwen 7B" },
      { id: "v2", name: "Qwen 13B" },
    ],
  },
  {
    id: "m_size",
    entity: "Model size",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "text",
    values: [
      { id: "v1", name: "250" },
      { id: "v2", name: "300" },
      { id: "v2", name: "350" },
    ],
  },
  {
    id: "m_custid",
    entity: "customer id",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "text",
    values: [
      { id: "v1", name: "UK" },
      { id: "v2", name: "US" },
    ],
  },
  {
    id: "m_txdate",
    entity: "translation date",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "text",
    values: [
      { id: "v1", name: "UK" },
      { id: "v2", name: "US" },
    ],
  },
  {
    id: "m_region",
    entity: "Region",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "select",
    values: [
      { id: "v1", name: "UK" },
      { id: "v2", name: "US" },
    ],
  },
  {
    id: "m_rlang",
    entity: "Language pair",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "select",
    values: [
      { id: "v1", name: "EN-US" },
      { id: "v2", name: "EN-FR" },
    ],
  },
  {
    id: "m_userid",
    entity: "user id",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "text",
    values: [
      { id: "v1", name: "UK" },
      { id: "v2", name: "US" },
    ],
  },
];
export const MetricRuleCondition: Conditions[] = [...MetricsCol];
export const PaymentMethodsRuleCondition: Conditions[] = [
  ...CustomerRegion,
  ...Currencies,
  ...Amount,
  ...PaymentPlans,
  ...PaymentMethods,
  ...Gateways,
];
export const VerificationRuleConditions: Conditions[] = [
  ...CardTypes,
  ...CardBrands,
  ...InternationalCard,
  ...Level2EligibleCard,
  ...CobadgedCards,
  ...Bin,
  ...CustomerRegion,
  ...Currencies,
  ...Amount,
  ...PaymentPlans,
  ...PaymentMethods,
  ...Gateways,
];
export const SmartRoutingRuleCondition: Conditions[] = [
  ...CardTypes,
  ...CardBrands,
  ...InternationalCard,
  ...Level2EligibleCard,
  ...CobadgedCards,
  ...Bin,
  ...CustomerRegion,
  ...Currencies,
  ...Amount,
  ...PaymentPlans,
  ...PaymentMethods,
  ...Gateways,
];
export const PaymentRuleConditions = [
  {
    id: "c1",
    entity: "Payment Method",
    operators: ["ov3", "ov4", "ov1", "ov9"], // 'Equals', 'Does Not Equal', 'Includes', 'Does Not Include'
    type: "select",
    values: [
      { id: "v1", name: "Credit Card" },
      { id: "v2", name: "Debit Card" },
      { id: "v3", name: "Prepaid Card" },
      { id: "v4", name: "Bank Transfer" },
      { id: "v5", name: "PayPal" },
      { id: "v6", name: "Apple Pay" },
      { id: "v7", name: "Google Pay" },
      { id: "v8", name: "Cryptocurrency" },
    ],
  },
  {
    id: "c2",
    entity: "Transaction Amount",
    operators: ["ov3", "ov4", "ov5", "ov6", "ov8"], // 'Equals', 'Does Not Equal', 'Greater Than', 'Less Than', 'Between'
    type: "number",
  },
  {
    id: "c3",
    entity: "Customer Location",
    operators: ["ov3", "ov4", "ov1", "ov9"], // 'Equals', 'Does Not Equal', 'Includes', 'Does Not Include'
    type: "select",
    values: [
      { id: "v1", name: "United States" },
      { id: "v2", name: "Canada" },
      { id: "v3", name: "European Union" },
      { id: "v4", name: "Asia-Pacific" },
    ],
  },
  {
    id: "c4",
    entity: "Customer Type",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "New Customer" },
      { id: "v2", name: "Returning Customer" },
      { id: "v3", name: "VIP Customer" },
      { id: "v4", name: "Trial Customer" },
    ],
  },
  {
    id: "c5",
    entity: "Subscription Type",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "One-Time Payment" },
      { id: "v2", name: "Monthly Subscription" },
      { id: "v3", name: "Annual Subscription" },
      { id: "v4", name: "Custom Subscription" },
    ],
  },
  {
    id: "c6",
    entity: "Billing Country",
    operators: ["ov3", "ov4", "ov1", "ov9"], // 'Equals', 'Does Not Equal', 'Includes', 'Does Not Include'
    type: "country_select",
  },
  {
    id: "c7",
    entity: "Shipping Country",
    operators: ["ov3", "ov4", "ov1", "ov9"], // 'Equals', 'Does Not Equal', 'Includes', 'Does Not Include'
    type: "country_select",
  },
  {
    id: "c8",
    entity: "Currency",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "USD" },
      { id: "v2", name: "EUR" },
      { id: "v3", name: "GBP" },
      { id: "v4", name: "INR" },
    ],
  },
  {
    id: "c9",
    entity: "Invoice Status",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "Paid" },
      { id: "v2", name: "Unpaid" },
      { id: "v3", name: "Overdue" },
      { id: "v4", name: "Canceled" },
    ],
  },
  {
    id: "c10",
    entity: "Coupon Applied",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "text",
    placeholder: "Enter coupon code",
  },
  {
    id: "c11",
    entity: "Risk Assessment",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "High Risk" },
      { id: "v2", name: "Medium Risk" },
      { id: "v3", name: "Low Risk" },
    ],
  },
  {
    id: "c12",
    entity: "Payment Method Vaulted",
    operators: ["ov3"], // 'Equals'
    type: "select",
    values: [
      { id: "v1", name: "Yes" },
      { id: "v2", name: "No" },
    ],
  },
  {
    id: "c13",
    entity: "Recurring Payment",
    operators: ["ov3"], // 'Equals'
    type: "select",
    values: [
      { id: "v1", name: "Yes" },
      { id: "v2", name: "No" },
    ],
  },
  {
    id: "c14",
    entity: "Card Type",
    operators: ["ov3", "ov4"], // 'Equals', 'Does Not Equal'
    type: "select",
    values: [
      { id: "v1", name: "Credit Card" },
      { id: "v2", name: "Debit Card" },
      { id: "v3", name: "Prepaid Card" },
    ],
  },
];
