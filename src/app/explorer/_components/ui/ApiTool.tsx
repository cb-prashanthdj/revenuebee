"use client";

import { Binoculars, ChevronDown, InfoIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { UseCasesCard } from "./UsecaseCard";

import { motion } from "framer-motion";
import Form from "./form";
import { formConfig } from "./formConfig";

export function APIInfo({ className }: { className?: string }) {
  const useCases = [
    {
      title: "Retrieve Monthly Recurring Revenue (MRR)",
      description: "Retrieves MRR of a customer",
    },
    {
      title: "Fetch All Available Plans",
      description: "Fetch all available plans of a customer",
    },
    {
      title: "Generate an Invoice for a Subscription",
      description: "Generate an invoice for a customer's subscription",
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div
      className={twMerge(className, "box-border overflow-y-auto")}
    >
      <div className="py-5 px-11 ">
        <div className="bg-gradient-to-r from-transparent to-shade-lime-500 inline-flex py-1.5 px-3 items-center gap-1 rounded-md text-[#012a38] text-xs font-bold tracking-tight !-ml-3 !mt-0 mb-2">
          <Binoculars className="size-4" /> Update Payment Method
        </div>
        <div className="tracking-tight text-[#012A38] text-[1rem]">
          Updates attributes for a specific{" "}
          <b>
            <i>customer.</i>
          </b>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="bg-[#012A38] text-white font-semibold uppercase text-xs leading-none rounded-full px-3 flex items-center justify-center">
            post
          </div>
          <span className="text-[#012A3899] text-sm tracking-tight">
            {"/customers/{customer-id}"}
          </span>
        </div>
      </div>

      <div className="py-5 px-11 max-h-[calc(100%-103px)] pb-20 scrollbar-hide overflow-y-auto overscroll-contain">
        <p className="">
          You can either choose to collect the payment from an existing payment
          source or a new payment source. You can choose to either retain or
          discard the new payment source, which is being used for payment...{" "}
          <span className="uppercase font-bold">know more</span>
        </p>

        <div className="-mx-6 border-solid border-t border-b border-[#012A3833] px-2 py-1 flex gap-2 items-center">
          <InfoIcon className="size-4" />
          To update Billing Address and Vat Number, use{" "}
          <span className="text-xs font-bold">[Update billing Info]</span>
        </div>

        {/* Always Visible Grid */}
        <div className="grid grid-cols-3 gap-3 my-3">
          {useCases.map((caseItem, index) => (
            <UseCasesCard
              key={index}
              title={caseItem.title}
              description={caseItem.description}
            />
          ))}
        </div>
        {/* Collapsible Section */}
        <div className="relative mb-20">
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            className="overflow-hidden"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-3 gap-3 my-3">
              {useCases.map((caseItem, index) => (
                <UseCasesCard
                  key={index}
                  title={caseItem.title}
                  description={caseItem.description}
                />
              ))}
            </div>
          </motion.div>
          <button
            onClick={handleToggle}
            className="absolute -bottom-10 left-0 bg-[#012A381A] p-1 text-black rounded w-full flex gap-1 items-center justify-center col-span-3"
          >
            {isExpanded ? "See less use cases" : "See more use cases"}
            <ChevronDown
              className={`size-4 transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* FORM */}
        <Form config={formConfig} onSubmit={() => {}} />
      </div>
    </div>
  );
}
