"use client";
import React, { use, useEffect } from "react";
import { RadioGroup } from "@/app/(billing)/subscriptions/_component/RadioGroup";
import { Button, Notification, Link } from "cb-sting-react-ts";
import { useState } from "react";
import SubscriptionTablePattern from "./_component/Table/SubscriptionTablePattern";
import { useSubscriptionsStore } from "./_store/subscriptions-store";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import { BookOpen, LifeBuoy, SparklesIcon } from "lucide-react";

const Home = () => {
  const { siteConfig, isNewSite, isTestSite } = useSiteConfigStore();
  const { subscriptions, getSubscriptionsByBusinessEntity } =
    useSubscriptionsStore();
  const [apiSelector, setApiSelector] = useState({});
  const [filterReset, setFilterReset] = useState(false);
  const [filteredSubscriptions, setFilteredSubscriptions] =
    useState<unknown[]>(subscriptions);

  const handleFilterTable = (e: any) => {
    setFilteredSubscriptions(e);
  };
  useEffect(() => {
    setFilteredSubscriptions(
      getSubscriptionsByBusinessEntity(siteConfig.activeBusinessEntity)
    );
  }, [siteConfig.activeBusinessEntity]);
  return (
    <div className="bodyContent">
      {isTestSite && (
        <div className={"mt-2 mb-6"}>
          <Notification
            size="regular"
            variant="yellow"
            width="full"
            close
            iconContent={<SparklesIcon />}
          >
            <h5 className="font-semibold !text-yellow-900">
              Subscription limit reached
            </h5>
            <p className="!text-yellow-900">
              You have reached the maximum limit of 2500 subscriptions for your
              account. To add more , please contact Chargebee Support.
            </p>
            <div className="flex pt-6 gap-6">
              <li className={"list-none"}>
                <Link
                  href="#"
                  size="small"
                  className="font-semibold !text-yellow-900 hover:underline flex gap-1 justify-center items-center cursor-pointer"
                  styleType="text"
                >
                  <span>
                    <LifeBuoy />
                  </span>{" "}
                  Reach Out to Support
                </Link>
              </li>
              <li className={"list-none"}>
                <Link
                  href={"#"}
                  size="small"
                  className="font-semibold !text-yellow-900 hover:underline flex gap-1 justify-center items-center cursor-pointer"
                  styleType="text"
                >
                  <span>
                    <BookOpen />
                  </span>{" "}
                  Learn more about team management
                </Link>
              </li>
            </div>
          </Notification>
        </div>
      )}
      {/* header */}
      <div className="flex items-center justify-between !mt-0">
        <div className="-mt-2">
          <div className="flex items-center gap-4 divide-x">
            <h2 className="h2 leading-none">Subscriptions</h2>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="neutral">Import Subscriptions</Button>
          <Button variant="primary">Create Subscription</Button>
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
      <SubscriptionTablePattern
        // @ts-expect-error fix types
        selectors={apiSelector}
        reset={filterReset}
        tabledata={filteredSubscriptions}
        filteredTableData={(e) => handleFilterTable(e)}
      />
    </div>
  );
};

export default Home;
