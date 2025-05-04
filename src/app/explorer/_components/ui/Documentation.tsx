"use client";

import { PromptPlaceholder } from "./PromptPlaceholder";
import ApiManagement from "./ApiManagement";
import { Sidebar } from "./ExplorerSidebar";
import { useState } from "react";

// Dummy Card Data
const customerCardGroups = [
  {
    id: 1,
    cards: [
      {
        tag: "Customer attributes",
        title: (
          <>
            View customer{" "}
            <i>
              <b>attributes.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Create a customer",
        title: (
          <>
            Create new{" "}
            <i>
              <b>customer account.</b>
            </i>
          </>
        ),
      },
      {
        tag: "List customers",
        title: (
          <>
            Display all{" "}
            <i>
              <b>customers.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Retrieve a customer",
        title: (
          <>
            Get specific{" "}
            <i>
              <b>customer details.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 2,
    cards: [
      {
        tag: "Update a customer",
        title: (
          <>
            Modify existing{" "}
            <i>
              <b>customer information.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Update payment method",
        title: (
          <>
            Change customer{" "}
            <i>
              <b>payment method.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Update billing info",
        title: (
          <>
            Modify customer{" "}
            <i>
              <b>billing details.</b>
            </i>
          </>
        ),
      },
      {
        tag: "List of contacts",
        title: (
          <>
            View all customer{" "}
            <i>
              <b>contacts.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 3,
    cards: [
      {
        tag: "Add contacts",
        title: (
          <>
            Add new{" "}
            <i>
              <b>customer contacts.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Delete contacts",
        title: (
          <>
            Remove{" "}
            <i>
              <b>customer contacts.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Update hierarchy access",
        title: (
          <>
            Modify account{" "}
            <i>
              <b>hierarchy settings.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Unlink customer",
        title: (
          <>
            Remove parent{" "}
            <i>
              <b>account association.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 4,
    cards: [
      {
        tag: "Record excess",
        title: (
          <>
            Record an{" "}
            <i>
              <b>excess payment</b>
            </i>{" "}
            for a customer
          </>
        ),
      },
      {
        tag: "Delete customer",
        title: (
          <>
            Remove{" "}
            <i>
              <b>customer account.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Billing date",
        title: (
          <>
            Update billing{" "}
            <i>
              <b>date.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Merge customers",
        title: (
          <>
            Merge{" "}
            <i>
              <b>customer accounts.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 5,
    cards: [
      {
        tag: "Assign Payment",
        title: (
          <>
            Assign{" "}
            <i>
              <b>payment</b>
            </i>{" "}
            role
          </>
        ),
      },
      {
        tag: "Update contacts",
        title: (
          <>
            Modify customer{" "}
            <i>
              <b>contacts.</b>
            </i>
          </>
        ),
      },
    ],
  },
];

const subscriptionCardGroups = [
  {
    id: 1,
    cards: [
      {
        tag: "Subscription attributes",
        title: (
          <>
            View all{" "}
            <i>
              <b>subscription attributes.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Create subscription",
        title: (
          <>
            Create new{" "}
            <i>
              <b>item subscription.</b>
            </i>
          </>
        ),
      },
      {
        tag: "List subscriptions",
        title: (
          <>
            Display all{" "}
            <i>
              <b>subscriptions.</b>
            </i>
          </>
        ),
      },
      {
        tag: "List contract terms",
        title: (
          <>
            View subscription{" "}
            <i>
              <b>contract details.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 2,
    cards: [
      {
        tag: "List discounts",
        title: (
          <>
            View available{" "}
            <i>
              <b>subscription discounts.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Retrieve subscription",
        title: (
          <>
            Get specific{" "}
            <i>
              <b>subscription details.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Import charges",
        title: (
          <>
            Import pending{" "}
            <i>
              <b>unbilled charges.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Import subscription",
        title: (
          <>
            Import existing{" "}
            <i>
              <b>item subscriptions.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 3,
    cards: [
      {
        tag: "Override billing",
        title: (
          <>
            Modify{" "}
            <i>
              <b>billing profile.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Delete subscription",
        title: (
          <>
            Remove{" "}
            <i>
              <b>subscription permanently.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Pause subscription",
        title: (
          <>
            Temporarily pause{" "}
            <i>
              <b>subscription.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Cancel items",
        title: (
          <>
            Cancel specific{" "}
            <i>
              <b>subscription items.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 4,
    cards: [
      {
        tag: "Resume subscription",
        title: (
          <>
            Reactivate{" "}
            <i>
              <b>paused subscription.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Remove pause",
        title: (
          <>
            Cancel scheduled{" "}
            <i>
              <b>subscription pause.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Remove resumption",
        title: (
          <>
            Cancel planned{" "}
            <i>
              <b>subscription resumption.</b>
            </i>
          </>
        ),
      },
      {
        tag: "Charge Renewals",
        title: (
          <>
            Charge{" "}
            <i>
              <b>future renewals.</b>
            </i>
          </>
        ),
      },
    ],
  },
  {
    id: 5,
    cards: [
      {
        tag: "Advance invoice",
        title: (
          <>
            Edit
            <i>
              <b>advance invoice</b>
            </i>{" "}
            schedule
          </>
        ),
      },
      {
        tag: "Regenerate invoice",
        title: (
          <>
            Regenerate an{" "}
            <i>
              <b>invoice.</b>
            </i>
          </>
        ),
      },
    ],
  },
];

// Grouped by section
const apiGroupSample = [
  {
    id: "customer",
    items: customerCardGroups,
  },
  {
    id: "subscription",
    items: subscriptionCardGroups,
  },
];

/*
  Flow of active navigation item:
  - By default first section (customers) is set as active
  - In ApiManagement component, setActiveId is called when any card section reaches the top 40% of the viewport
  - Sidebar makes use of activeId to highlight the active section by making use of `layout` animation from motion
*/
export function DocumentationSection({ enablePromptPlaceholder = false }) {
  const [activeId, setActiveId] = useState<string>("customer");

  return (
    <div className={`grid grid-cols-12 gap-8`}>
      <div
        className={`relative col-span-3 text-black after:fixed after:bottom-0 after:w-full after:h-[120px] after:bg-gradient-to-t from-[hsl(185,22%,70%)] to-transparent after:z-10`}
      >
        {enablePromptPlaceholder && (
          <div className="fixed top-8">
            <PromptPlaceholder />
          </div>
        )}
        <Sidebar activeId={activeId} />
      </div>
      <div className="col-span-9 p-9">
        <ApiManagement
          activeId={activeId}
          setActiveId={setActiveId}
          apiGroup={apiGroupSample}
        />
      </div>
    </div>
  );
}
