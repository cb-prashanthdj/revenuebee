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
export const CustomerSummary = () => {
  return (
    <div>
      <Card>
        <CardHeader title="Standard">
          <div className=" !m-0 text-neutral-500 ">
            <span>INR, Yearly</span>
          </div>
        </CardHeader>

        <div className="xl:flex xl:gap-x-8 divide-y xl:divide-y-0 divide-neutral-50">
          <div className="w-full ">placeholder here</div>
        </div>
      </Card>
    </div>
  );
};
