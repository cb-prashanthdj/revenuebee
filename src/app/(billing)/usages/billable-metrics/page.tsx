"use client";

import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, SHeader } from "cb-sting-react-ts";

import React from "react";

const BillableMetrics = () => {
  return (
    <div>
      <SHeader
        title="Now, let’s add entitlements to your metric. "
        description="By adding entitlements, you’ll be able to derive the usage and bill customers based on it."
        actionElements={
          <Button size="regular">
            <PlusIcon className="size-4" /> Create Billable Metrics{" "}
          </Button>
        }
      />
    </div>
  );
};

export default BillableMetrics;
