"use client";

import {
  Button,
  Badge,
  Header,
  Link,
  RadioButton,
  RadioGroup,
  SHeader,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  SelectMenu,
  SelectItem,
} from "cb-sting-react-ts";
import React, { useState } from "react";
import { MetricsDetailsAnalytics } from "../../../_components/MetricsDetailsAnalytics";

const tableData = [
  {
    event_id: "e3f2bf62-7acb-4013-b372-b834815ba785",
    timestamp: "03-Jan-2024 21:39",
    subscription_id: "SUBS1234",
    customer_id: "CUST1234",
    model_name: "AI Agent",
    input_tokens: 11940,
    output_tokens: 9661,
    api_type: "Batch",
    customer_name: "Sophia Roberts",
    customer_email: "sophia.roberts@example.com",
  },
  {
    event_id: "0715ba64-a712-40b0-a22f-1d46fcf3c282",
    timestamp: 45294.90347222222,
    subscription_id: "SUBS5678",
    customer_id: "CUST5678",
    model_name: "AI Agent",
    input_tokens: 11036,
    output_tokens: 13794,
    api_type: "Realtime",
    customer_name: "Jane Smith",
    customer_email: "jane.smith@example.com",
  },
  {
    event_id: "91e736c0-703b-4ffc-9277-4411e153f519",
    timestamp: 45294.90555555555,
    subscription_id: "SUBS9101",
    customer_id: "CUST9101",
    model_name: "GPT-3.5",
    input_tokens: 5163,
    output_tokens: 8860,
    api_type: "Realtime",
    resolution: "low",
    image_height: 232,
    image_width: 1032,
    customer_name: "Alice Johnson",
    customer_email: "alice.johnson@example.com",
  },
  {
    event_id: "e9a2ddef-0574-4b34-9142-8d909c39981b",
    timestamp: "03-Jan-2024 21:40",
    subscription_id: "SUBS2345",
    customer_id: "CUST2345",
    model_name: "AI Agent",
    input_tokens: 6306,
    output_tokens: 9538,
    api_type: "Batch",
    resolution: "low",
    image_height: 1196,
    image_width: 328,
    customer_name: "Robert Brown",
    customer_email: "robert.brown@example.com",
  },
  {
    event_id: "6d66554a-a8dd-4d03-8529-ffca016a30df",
    timestamp: 45294.907638888886,
    subscription_id: "SUBS3456",
    customer_id: "CUST3456",
    model_name: "GPT-3.5",
    input_tokens: 7644,
    output_tokens: 11555,
    api_type: "Batch",
    resolution: "high",
    image_height: 616,
    image_width: 324,
    customer_name: "Emily Davis",
    customer_email: "emily.davis@example.com",
  },
  {
    event_id: "3506a681-1d97-4c2f-b768-67386fee71d6",
    timestamp: 45294.90972222222,
    subscription_id: "SUBS4567",
    customer_id: "CUST4567",
    model_name: "GPT-3.5",
    input_tokens: 10959,
    output_tokens: 7412,
    api_type: "Realtime",
    resolution: "low",
    image_height: 520,
    image_width: 748,
    customer_name: "Chris Wilson",
    customer_email: "chris.wilson@example.com",
  },
  {
    event_id: "0aecac64-9183-4e16-a7de-edf21b51cc8e",
    timestamp: "03-Jan-2024 21:41",
    subscription_id: "SUBS5678",
    customer_id: "CUST5678",
    model_name: "GPT-4",
    input_tokens: 13087,
    output_tokens: 11421,
    api_type: "Batch",
    resolution: "high",
    image_height: 942,
    image_width: 1062,
    customer_name: "Sophia Lee",
    customer_email: "sophia.lee@example.com",
  },
  {
    event_id: "5f8fe0af-97f7-41a5-b49b-3b9f550c9614",
    timestamp: 45294.91180555556,
    subscription_id: "SUBS6789",
    customer_id: "CUST6789",
    model_name: "GPT-3.5",
    input_tokens: 12903,
    output_tokens: 14685,
    api_type: "Realtime",
    resolution: "low",
    image_height: 1358,
    image_width: 999,
    customer_name: "Michael Martin",
    customer_email: "michael.martin@example.com",
  },
  {
    event_id: "08d53fce-a9d2-4936-aea0-f16d91cbf518",
    timestamp: 45294.91388888889,
    subscription_id: "SUBS7890",
    customer_id: "CUST7890",
    model_name: "GPT-4",
    input_tokens: 7397,
    output_tokens: 7863,
    api_type: "Batch",
    resolution: "high",
    image_height: 1037,
    image_width: 523,
    customer_name: "David Garcia",
    customer_email: "david.garcia@example.com",
  },
  {
    event_id: "05e10897-3a84-43b4-b1e4-d04da977b122",
    timestamp: "03-Jan-2024 21:42",
    subscription_id: "SUBS8901",
    customer_id: "CUST8901",
    model_name: "GPT-3.5",
    input_tokens: 13498,
    output_tokens: 9862,
    api_type: "Realtime",
    resolution: "low",
    image_height: 259,
    image_width: 589,
    customer_name: "Olivia Harris",
    customer_email: "olivia.harris@example.com",
  },
  {
    event_id: "9038c9db-a400-4003-8432-5e51b28fb904",
    timestamp: 45294.915972222225,
    subscription_id: "SUBS9012",
    customer_id: "CUST9012",
    model_name: "GPT-3.5",
    input_tokens: 8702,
    output_tokens: 11406,
    api_type: "Batch",
    resolution: "low",
    image_height: 228,
    image_width: 821,
    customer_name: "James Moore",
    customer_email: "james.moore@example.com",
  },
  {
    event_id: "7207f563-4426-4c55-946a-547095c89b22",
    timestamp: 45294.91805555556,
    subscription_id: "SUBS0123",
    customer_id: "CUST0123",
    model_name: "AI Agent",
    input_tokens: 8548,
    output_tokens: 11814,
    api_type: "Batch",
    resolution: "high",
    image_height: 1171,
    image_width: 487,
    customer_name: "William Clark",
    customer_email: "william.clark@example.com",
  },
  {
    event_id: "b77d024a-20c1-4203-86b8-8f123e441560",
    timestamp: "03-Jan-2024 21:43",
    subscription_id: "SUBS1234",
    customer_id: "CUST1234",
    model_name: "GPT-4",
    input_tokens: 9294,
    output_tokens: 13355,
    api_type: "Realtime",
    resolution: "high",
    image_height: 1318,
    image_width: 1219,
    customer_name: "Emma Adams",
    customer_email: "emma.adams@example.com",
  },
  {
    event_id: "0a656a98-84ff-440c-958f-4af371d3a8cc",
    timestamp: 45294.92013888889,
    subscription_id: "SUBS2345",
    customer_id: "CUST2345",
    model_name: "GPT-4",
    input_tokens: 13448,
    output_tokens: 14770,
    api_type: "Batch",
    resolution: "low",
    image_height: 204,
    image_width: 949,
    customer_name: "Ava White",
    customer_email: "ava.white@example.com",
  },
  {
    event_id: "44b2b14f-d1e8-4fd4-a0b0-cd7796eb9a6a",
    timestamp: 45294.92222222222,
    subscription_id: "SUBS3456",
    customer_id: "CUST3456",
    model_name: "AI Agent",
    input_tokens: 5796,
    output_tokens: 7693,
    api_type: "Batch",
    customer_name: "Isabella Green",
    customer_email: "isabella.green@example.com",
  },
];
const MetricsDetailsAnalyticsPage = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);

  return (
    <div>
      <div className="p-large lg:p-xlarge xl:p-xxlarge space-y-xlarge xl:space-y-xlarge">
        <div className="  space-y-0  flex justify-between items-center">
          <div>
            <Breadcrumbs />
            <h3 className="h4">AI Agent Conversations: Usage details</h3>
          </div>
        </div>
        <div className="w-full flex gap-large">
          <SelectMenu
            label="inline"
            labelText="View by :"
            placeholder=""
            size="regular"
            value="val1"
            onValueChange={() => {
              setIsDataLoading(true);
              setTimeout(() => {
                setIsDataLoading(false);
              }, 2000);
            }}
          >
            <SelectItem value="val1">Usage</SelectItem>
            <SelectItem value="val2">Option 2</SelectItem>
            <SelectItem value="val3">Option 3</SelectItem>
          </SelectMenu>
          <SelectMenu
            label="hidden"
            labelText="Previous month"
            placeholder="Previous month"
            size="regular"
            onValueChange={() => {
              setIsDataLoading(true);
              setTimeout(() => {
                setIsDataLoading(false);
              }, 2000);
            }}
          >
            <SelectItem value="val1">Previous month</SelectItem>
            <SelectItem value="val2">Previous Week</SelectItem>
            <SelectItem value="val3">Previous Day</SelectItem>
          </SelectMenu>
        </div>

        <div className="h-[450px]">
          <MetricsDetailsAnalytics isLoading={isDataLoading} />
          <AnalyticsTable />
        </div>
      </div>
    </div>
  );
};

export default MetricsDetailsAnalyticsPage;
const Breadcrumbs = () => {
  return (
    <>
      <ol
        role="list"
        className="flex pl-0 mb-1 items-center space-x-4 list-none"
      >
        <li>
          <div className="flex items-center">
            <a
              href="#"
              className="mr-large font-semibold text-primary-500 hover:text-gray-700"
            >
              Metered Features
            </a>
            <svg
              className="size-4  text-neutral-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <a
              href="#"
              className="mr-large font-semibold text-primary-500 hover:text-gray-700"
            >
              AI Agent Conversations
            </a>
          </div>
        </li>
      </ol>
    </>
  );
};
const AnalyticsTable = () => {
  return (
    <Table mode="light" border="round" className="">
      <Table.Tr>
        <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] ">
          Subscription ID
        </Table.Td>
        <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] ">
          Customer Name
        </Table.Td>
        <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] ">
          Compute units usage
        </Table.Td>
      </Table.Tr>

      {tableData.map((item, index) => (
        <Table.Tr>
          <Table.Td>
            <Link
              href={"/subscriptions/34YhprZzflXo7UVy"}
              passHref
              className="font-semibold text-primary-500 hover:underline"
            >
              {item.subscription_id}
            </Link>
          </Table.Td>
          <Table.Td>
            <Link
              href={""}
              passHref
              className="font-semibold text-primary-500 hover:underline"
            >
              {item.customer_id}
            </Link>
          </Table.Td>
          <Table.Td>{item.input_tokens}</Table.Td>
        </Table.Tr>
      ))}
    </Table>
  );
};
