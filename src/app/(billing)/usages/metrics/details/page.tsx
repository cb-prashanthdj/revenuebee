"use client";

import {
  Column,
  Grid,
  Button,
  Tabs,
  TabsList,
  TabsContent,
} from "cb-sting-react-ts";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { MetricsDetailsFullpage } from "../../_components/MetricsDetailsFullpage";
import { actionGroups, buttonGroups } from "../../_components/GroupActions";
import { TabType } from "../../_models/TabType";
const jumpToTabs: TabType[] = [
  {
    id: "tab1",
    title: "Overview",
  },
  {
    id: "tab2",
    title: "Summary",
  },
  {
    id: "tab3",
    title: "Usage",
  },
  {
    id: "tab4",
    title: "Associated items",
  },
  {
    id: "tab5",
    title: "Configuration",
  },
];
const BillableMetricPage = () => {
  const [currentTab, setCurrentTab] = useState("SubscriptionFullpage");
  const updatedTabs = jumpToTabs;
  const handleTabChange = (tabId) => {
    const tabMapping = {
      tab1: "SubscriptionFullpage",
      tab2: "Subscription",
      tab3: "Invoices",
      tab5: "Credits",
      tab6: "Quotes",
    };

    const tab = updatedTabs.find((t) => t.id === tabId);
    console.log(tab.sectionId, tabId, "list tabls");

    if (tab) {
      const element = document.getElementById(tab.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    setCurrentTab(tabMapping[tabId]);
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className={`col-span-12  lg:col-span-12`}>
        <div className="bodyContent min-h-screen overflow-auto">
          {/* header */}
          <div className="md:flex items-center md:justify-between !mt-0 space-y-6 md:space-y-0">
            <div className="flex gap-2 items-center divide-x divide-neutral-100">
              <span>
                <Button size="small" styleType="text" variant="neutral">
                  <ArrowLeftIcon /> All Subscriptions
                </Button>
              </span>
              <span className="pl-2">
                <Button
                  // onClick={allSubscriptionHandler}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  Sophia Roberts
                </Button>
              </span>
            </div>

            <div className="flex gap-4">{buttonGroups[currentTab]}</div>
          </div>
          {/* header */}

          {/* content */}
          <div>
            {/* Create Modal */}

            {/* left */}
            <Tabs
              defaultTabID="tab1"
              onValueChange={handleTabChange}
              tabId="tab1"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start">
                <div className="md:col-span-2 mb-4">
                  <div className="fixed ">
                    <TabsList
                      tabStyle="lined"
                      tabs={updatedTabs}
                      variant="vertical"
                      width="full"
                      size="large"
                    />
                  </div>
                </div>

                <div className="md:col-span-8 lg:col-span-8">
                  <div>
                    <MetricsDetailsFullpage
                      columns={false}
                      onClickView={() => {
                        // handleViewClick(fourColumns);
                      }}
                      // handleDurationChange={(duration)=> console.log(duration)}
                    />
                  </div>
                </div>

                {/* right */}
                <div className="lg:col-span-2">
                  {/* <Actions
                currentTab={currentTab}
                onClickAction={handleActionClick}
              /> */}
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillableMetricPage;
