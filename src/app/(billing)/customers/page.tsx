"use client";
import React, { useEffect } from "react";
import { RadioGroup } from "@/app/(billing)/subscriptions/_component/RadioGroup";
import { Button } from "cb-sting-react-ts";
import { useState } from "react";
import CustomerTablePattern from "./_component/Table/CustomerTablePattern";
import { useCustomerStore } from "./_store/customers-store";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";

const Home = () => {
  const { siteConfig } = useSiteConfigStore();
  const { customers, getCustomersByBusinessEntity } = useCustomerStore();
  const [apiSelector, setApiSelector] = useState({});
  const [filterReset, setFilterReset] = useState(false);
  const [filteredCustomers, setFilteredCustomers] =
    useState<unknown[]>(customers);

  const handleFilterTable = (e: any) => {
    // setFilterReset(false);
    setFilteredCustomers(e);
  };

  return (
    <div className="bodyContent">
      {/* header */}
      <div className="flex items-center justify-between !mt-0">
        <div className="-mt-2">
          <div className="flex items-center gap-4 divide-x">
            <h2 className="h2 leading-none">Customers</h2>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="neutral">Import Customers</Button>
          <Button variant="primary">Create Customer</Button>
        </div>
      </div>
      {/* header */}

      <div className="flex items-start justify-normal gap-4">
        <RadioGroup
          align="horizontal"
          description=""
          onChangeLogic={() => {}}
          options={[
            {
              label: "All",
              value: "Option1",
            },
            {
              label: "Cancelled",
              value: "Option2",
            },
            {
              label: "Expiring",
              value: "Option4",
            },
            {
              label: "Unpaid",
              value: "Option4",
            },
            {
              label: "Active",
              value: "Option4",
            },
          ]}
          size="regular"
          title=""
          variant="contained"
          width={null}
        />
      </div>
      <CustomerTablePattern
        // @ts-expect-error fix types
        selectors={apiSelector}
        reset={filterReset}
        tabledata={filteredCustomers}
        filteredTableData={(e) => handleFilterTable(e)}
      />
    </div>
  );
};

export default Home;
