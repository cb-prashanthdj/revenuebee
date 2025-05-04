"use client";

import {
  Accordion,
  ContainedList,
  ContainedListItems,
  ContainedListItem,
  ContainedHeader,
  ContainedListLabel,
  ContainedTitle,
  ContainedListValue,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  Card,
} from "cb-sting-react-ts";
import { CustomerMetrics } from "./CustomerMetrics";
export const CustomerSummary = ({ customerData }) => {
  const customerOverviewSchema = (overviewData) => [
    { label: "Customer ID", value: overviewData.id },
    { label: "Customer Name", value: overviewData.customerName },
    { label: "Channel", value: overviewData.channel },
    {
      label: "JSON Metadata",
      value: (
        <a className="text-primary-600 font-medium cursor-pointer hover:underline">
          + Add
        </a>
      ),
    },
    { label: "Email", value: overviewData.customerEmail },
    { label: "Phone number", value: overviewData.customerPhone },
    { label: "Sales Owner", value: overviewData.customerName },
    { label: "Finance owner", value: overviewData.customerName },
  ];

  return (
    <div>
      {customerData && (
        <Card>
          <Card.Header
            className="uppercase"
            title="overview"
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
              <CustomerDetails
                data={customerOverviewSchema(customerData).slice(
                  0,
                  Math.ceil(customerOverviewSchema(customerData).length / 2)
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <CustomerDetails
                data={customerOverviewSchema(customerData).slice(
                  Math.ceil(customerOverviewSchema(customerData).length / 2)
                )}
              />
            </div>
          </div>

          {/* Dashboard */}
          <CustomerMetrics />
        </Card>
      )}
    </div>
  );
};
export const CustomerDetails = ({ data }: { data: any[] }) => {
  return (
    <ContainedList labels="block" padding="regular" variant="basic">
      <ContainedList.Items>
        {data.map((detail) => (
          <ContainedList.Item key={detail.label}>
            <ContainedList.Label>{detail.label}</ContainedList.Label>
            <ContainedList.Value>
              <>{detail.value}</>
            </ContainedList.Value>
          </ContainedList.Item>
        ))}
      </ContainedList.Items>
    </ContainedList>
  );
};
