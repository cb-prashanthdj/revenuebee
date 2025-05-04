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
import { useEffect, useState } from "react";
import { CardHeader } from "@/app/(billing)/subscriptions/_component/Header";
import { PencilIcon } from "lucide-react";
import CustomerConfig from "./CustomerConfig";
export const CustomFields = () => {
  const customFields = [
    {
      label: "Customer Site",
      value: "Some website",
    },
    {
      label: "Notes",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      label: "Notes 2",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <div>
      <Card className="">
        <CardHeader title="Custom Fields">
          <div className="flex gap-large flex-wrap">
            <Button variant={"neutral"} styleType={"text"} size={"regular"}>
              <PencilIcon /> Edit
            </Button>
          </div>
        </CardHeader>
        <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
          <div className="w-full ">
            <CustomerConfig data={customFields} />
          </div>
        </div>
      </Card>
    </div>
  );
};
