"use client";

import clsx from "clsx";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Recommendations } from "./Recomentations";
import { DocumentationSection } from "./Documentation";
import { ExplorerChatBox } from "./ExplorerChatBox";
const recomendation_sample = {
  title: "Recommended Approach",
  description:
    "You can use the following end points in sequence to update your customer's billing information. Alternatively, you can also consider another sequence given your use case. Is this helpful? Let me know if you need more assistance.",
  results: [
    {
      title: (
        <span>
          Update payment method for a customer like{" "}
          <b>
            <i>card, paypal, direct debit</i>
          </b>{" "}
          etc
        </span>
      ),
      tag: "Update Payment Method",
      description:
        "You can either choose to collect the payment from an existing payment source or a new payment source. You can choose to either retain or discard the new payment source, which is being used for payment.",
      reqType: "post",
      actionLabel: "API playground",
      actionUrl: "/explorer/playground",
    },
    {
      title: (
        <span>
          Update payment method for a customer like{" "}
          <b>
            <i>card, paypal, direct debit</i>
          </b>{" "}
          etc
        </span>
      ),
      tag: "Update Payment Method",
      description:
        "You can either choose to collect the payment from an existing payment source or a new payment source. You can choose to either retain or discard the new payment source, which is being used for payment.",
      reqType: "post",
      actionLabel: "API playground",
      actionUrl: "/explorer/playground",
    },
    {
      title: (
        <span>
          Update payment method for a customer like{" "}
          <b>
            <i>card, paypal, direct debit</i>
          </b>{" "}
          etc
        </span>
      ),
      tag: "Update Payment Method",
      description:
        "You can either choose to collect the payment from an existing payment source or a new payment source. You can choose to either retain or discard the new payment source, which is being used for payment.",
      reqType: "post",
      actionLabel: "API playground",
      actionUrl: "/explorer/playground",
    },
  ],
};
const ExplorerPage = () => {
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.01,
  });
  return (
    <div
      id="top"
      className={clsx(
        search ? "space-y-10" : "space-y-20",
        "min-h-[calc(100vh-68px)] scroll-smooth"
      )}
    >
      <div
        ref={ref}
        className={` px-[max(1rem,_50%_-_56rem_/_2)] graadian isolate z-10  `}
      >
        <ExplorerChatBox
          search={search}
          setSearch={setSearch}
          label={"What business problem are you trying to solve?"}
          description={"Get tailored Chargebee API solutions."}
          placeholder="Describe your business challenge or goal in detail"
          enableSuggestions={true}
        />
      </div>
      <div>
        {search ? (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 0.5 },
            }}
          >
            <Recommendations
              enablePromptPlaceholder={!isInView}
              searchQuery={search}
              data={recomendation_sample}
            />
          </motion.div>
        ) : (
          <motion.div
            key="documentation"
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5 },
            }}
          >
            <DocumentationSection enablePromptPlaceholder={!isInView} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExplorerPage;
