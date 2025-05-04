"use client";
import React, { useEffect } from "react";
import {
  Banner,
  Button,
  Card,
  RadioGroup,
  SelectMenu,
  SelectItem,
  OverFlowMenu,
} from "cb-sting-react-ts";
import * as Radio from "cb-sting-react-ts";
import { HomeBanner } from "./_components/HomeBanner";
import { StatBox } from "./_components/StatBox";
import StatGraph from "./_components/StatGraph";
import { withPrivateRoutes } from "../../../components/ui/withPrivateRoutes";
import { useCustomerStore } from "@/app/(billing)/customers/_store/customers-store";

type Props = {};

const optionOne = [
  {
    label: "Daily",
    value: "Option1",
  },
  {
    label: "3 months",
    value: "Option2",
  },
  {
    label: "6 months",
    value: "Option3",
  },
  {
    label: "12 months",
    value: "Option4",
  },
];
const DashboardPage = () => {
  const { loadCustomers, isLoading, error } = useCustomerStore();
  useEffect(() => {
    // Load customers data when the component mounts
    loadCustomers();
  }, []);
  return (
    <>
      <HomeBanner />
      <div className="bodyContent ">
        {/* Stats Box */}
        <div className="bg-white border border-neutral-50 border-b-neutral-100 rounded-md w-full divide-x flex flex-col md:flex-row justify-between">
          <StatBox title="Total MRR" value={"$22.30M"} qoute={""} />
          <StatBox
            title="Total Active Subscriptions"
            value={"6,115"}
            qoute={""}
          />
          <StatBox title="Net Billing" value={"$15.96M"} qoute={""} />
          <StatBox title="Net Payments" value={"$15.82M"} qoute={""} />
          <StatBox title="Unpaid Invoices" value={"240"} qoute={"$71,760"} />
        </div>

        {/* Filters */}
        <div className="ma:flex flex-col md:flex-row  gap-4 hidden">
          <Radio.RadioGroup
            align="horizontal"
            defaultValue={optionOne[0].value}
            description=""
            onChangeLogic={() => {}}
            title=""
            variant="contained"
          >
            {optionOne.map((item) => (
              <Radio.RadioButton
                contained
                noCheckmark
                key={item.value}
                id={item.value}
                value={item.value}
              >
                <label htmlFor={item.value}>{item.label}</label>
              </Radio.RadioButton>
            ))}
          </Radio.RadioGroup>

          <SelectMenu
            label="default"
            labelText=""
            onValueChange={() => {}}
            placeholder="USD"
            size="regular"
          >
            <SelectItem value="Option1" showIndication>
              USD
            </SelectItem>
            <SelectItem value="Option2" showIndication>
              AUD
            </SelectItem>
            <SelectItem value="Option3" showIndication>
              AOA
            </SelectItem>
          </SelectMenu>
        </div>

        <StatGraph />
      </div>
    </>
  );
};

export default withPrivateRoutes(DashboardPage);
