"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  Card,
} from "cb-sting-react-ts";
import CustomerConfig from "./CustomerConfig";
export const CustomerConfigurations = ({ customerData }) => {
  const customerConfigurationSchema = (configData) => [
    { label: "Language", value: configData.configuration.language },
    {
      label: "Auto Collection",
      value: (
        <>
          {configData.configuration.autoCollection ? "On " : "Off "}
          <a className="text-primary-600 font-semibold cursor-pointer hover:underline pl-2">
            Change
          </a>
        </>
      ),
    },
    { label: "Next Billing Date", value: "-" },
    { label: "Payment Terms", value: "-" },
    {
      label: "Closure of Invoice",
      value: (
        <>{configData.configuration.closureOfInvoice ? "Auto " : "Manual "}</>
      ),
    },

    {
      label: "Preferred Currency",
      value: configData.configuration.preferredCurrency,
    },
    {
      label: "Direct Debit",
      value: configData.configuration.directDebit ? "Enabled" : "Disabled",
    },
    {
      label: "Next Billing Amount",
      value: (
        <>
          $100.00{" "}
          <a className="text-primary-600 font-semibold cursor-pointer hover:underline pl-2">
            View
          </a>
        </>
      ),
    },
    { label: "Consolidated Invoicing", value: "Use Site Default" },
    { label: "Tax Exemption", value: "Not Excempted" },
  ];

  return (
    <div>
      {customerData?.configuration && (
        <Card>
          <Card.Header
            className="uppercase"
            title="customer configurations"
            actionElement={
              <Button
                size={"small"}
                styleType="text"
                className="!font-semibold"
              >
                Edit
              </Button>
            }
          />

          {/* Customer info */}
          <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
            <div className="w-full xl:w-1/2">
              <CustomerConfig
                data={customerConfigurationSchema(customerData).slice(
                  0,
                  Math.ceil(
                    customerConfigurationSchema(customerData).length / 2
                  )
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <CustomerConfig
                data={customerConfigurationSchema(customerData).slice(
                  Math.ceil(
                    customerConfigurationSchema(customerData).length / 2
                  )
                )}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
