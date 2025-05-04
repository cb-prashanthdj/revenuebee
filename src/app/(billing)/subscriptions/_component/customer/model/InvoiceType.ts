
// ItemType.ts
export type InvoiceType = {
    id: string;
    status: string;
    createdOn: string;
    Total: string;
 
  };

export type PaytmentType = {
  id: string;
  referenceId: string;
  expiryDate: Date;
  name: string;
  billingAddress: string;
}