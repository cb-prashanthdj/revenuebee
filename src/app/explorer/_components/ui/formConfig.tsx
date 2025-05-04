import { FormConfig } from "./form";
/**
 * Form field schema of api playground payload form
 */
export const formConfig: FormConfig = {
  sections: [
    {
      title: "Path Parameters",
      fields: [
        {
          id: "customerId",
          type: "text",
          label: "customer-id",
          required: true,
          dataType: "string",
        },
      ],
    },
    {
      title: "Body",
      fields: [
        {
          id: "firstName",
          type: "text",
          label: "First Name",
          maxLength: "X",
          required: true,
          dataType: "string",
        },
        {
          id: "lastName",
          type: "text",
          label: "Last Name",
          required: true,
          dataType: "string",
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true,
          helpText: "Phone number for contact purpose",
          dataType: "string",
        },
        {
          id: "phone",
          type: "tel",
          label: "Phone",
          required: true,
          placeholder: "+1 124 312 2122",
          helpText: "Phone number for contact purpose",
          dataType: "string",
        },
        {
          id: "company",
          type: "text",
          label: "Company",
          required: true,
          dataType: "string",
        },
        {
          id: "netTermDays",
          type: "number",
          label: "Net Term Days",
          required: false,
          maxLength: 256,
          optional: true,
          dataType: "number",
        },
        {
          id: "autoCollection",
          type: "checkbox",
          label: "Auto Collection",
          required: true,
          dataType: "boolean",
        },
        {
          id: "exemptionDetails",
          type: "array",
          label: "Exemption Details",
          itemType: "text",
          actions: {
            add: true,
            clear: true,
          },
          defaultValue: [],
          dataType: "array",
        },
      ],
    },
  ],
};
