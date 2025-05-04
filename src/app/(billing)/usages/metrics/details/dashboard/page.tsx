"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  ContainedHeader,
  ContainedList,
  ContainedListItem,
  ContainedListItems,
  ContainedListValue,
  ContainedTitle,
  Link,
  SHeader,
  Tabs,
  TabsList,
} from "cb-sting-react-ts";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MetricsDetailsFullpage } from "../../../_components/MetricsDetailsFullpage";
import { TabType } from "../../../_models/TabType";
const jumpToTabs: TabType[] = [
  {
    id: "tab1",
    title: "Summary",
    sectionId: "section1",
  },
  {
    id: "tab2",
    title: "Usage  trend",
    sectionId: "section2",
  },
  {
    id: "tab3",
    title: "Revenue  trend",
    sectionId: "section3",
  },
  {
    id: "tab4",
    title: "Items",
    sectionId: "section4",
  },
  {
    id: "tab5",
    title: "Configuration",
    sectionId: "section5",
  },
];
const BillableMetricPage = () => {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState("SubscriptionFullpage");
  const updatedTabs = jumpToTabs;
  const metricStatus = searchParams.get("status");

  const handleTabChange = (tabId) => {
    const tabMapping = {
      tab1: "SubscriptionFullpage",
      tab2: "Subscription",
      tab3: "Invoices",
      tab5: "Credits",
      tab6: "Quotes",
    };
    const tabPricing = {
      tab1: "Prices linked",
      tab2: "Configuration",
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

  const Breadcrumbs = () => {
    return (
      <>
        <ol
          role="list"
          className="flex pl-0 mb-1 items-center space-x-4 list-none"
        >
          <li>
            <div className="flex items-center">
              <Link
                href={"/billing/usages/metrics/list"}
                className="font-semibold"
              >
                Metered Features
              </Link>
              <svg
                className="size-4  text-neutral-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            </div>
          </li>
        </ol>
      </>
    );
  };
  const tabPricing = [
    {
      id: "tab1",
      title: "Prices linked",
      sectionId: "section1",
    },
    {
      id: "tab2",
      title: "Configuration",
      sectionId: "section1",
    },
  ];
  return (
    <div>
      {metricStatus == "new" && (
        <Card
          depth="raised"
          background="neutral"
          className="!rounded-none !px-xxlarge"
        >
          <SHeader
            title="Your metered feature has been created. Now, let’s link this to a plan or add-on pricing."
            description="By adding this feature to a priced item, you can bill customers based on their usage."
            actionElements={
              <div className="flex items-center">
                <Link href={"/usages/metrics/link-to-pricing/choose"}>
                  <Button size="regular">
                    Link pricing
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </Link>
              </div>
            }
            type="card"
          />
        </Card>
      )}
      <div className="grid grid-cols-12 min-h-screen">
        <div className={`col-span-12  lg:col-span-12`}>
          <div className="bodyContent min-h-screen overflow-auto">
            <SHeader
              actionElements={
                <>
                  {/* <Button styleType="outline" variant="neutral" size="regular" onClick={()=>{}}>Cancel</Button>
            <Button size="regular" onClick={()=>{}}>Import</Button> */}
                </>
              }
              backAction={
                <div className="px-2">
                  <Breadcrumbs />
                </div>
              }
              title={
                <div className="flex items-center">
                  {metricStatus === "new"
                    ? "AI Agent Resolutions"
                    : "AI Agent conversations"}
                  <Badge
                    className="ml-2 font-normal tracking-wide"
                    rounded="small"
                    variant={"success"}
                  >
                    ACTIVE
                  </Badge>
                </div>
              }
              description={
                metricStatus === "new"
                  ? "Successful / Resolved conversations"
                  : "This metric calculates the Sum of all AI Agent conversations"
              }
              type="page"
            />
            {/* header */}
            {/* <div className="md:flex items-center md:justify-between !mt-0 space-y-6 md:space-y-0">
        <div className="flex gap-2 items-center divide-x divide-neutral-100">
          <span>
            <Button
              size="small"
              styleType="text"
              variant="neutral"
            >
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
      </div> */}
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
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start`}
                >
                  {metricStatus != "new" &&
                    metricStatus != "success-pricing" && (
                      <div className={` md:col-span-2 mb-4 relative`}>
                        <div className="">
                          <TabsList
                            tabStyle="lined"
                            tabs={updatedTabs}
                            variant="vertical"
                            width="full"
                            size="large"
                          />
                        </div>
                      </div>
                    )}
                  {metricStatus == "success-pricing" && (
                    <div className={` md:col-span-2 mb-4 relative`}>
                      <div className="">
                        <TabsList
                          tabStyle="lined"
                          tabs={tabPricing}
                          variant="vertical"
                          width="full"
                          size="large"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={` ${
                      metricStatus == "new"
                        ? "md:col-span-10 lg:col-span-10"
                        : "md:col-span-8 lg:col-span-8"
                    } `}
                  >
                    <div>
                      <MetricsDetailsFullpage
                        columns={false}
                        onClickView={() => {
                          // handleViewClick(fourColumns);
                        }}
                        status={metricStatus}
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className="col-span-2">
                    <div>
                      <div className="flex flex-col">
                        <div className="space-y-4">
                          <ContainedList
                            showSeperator={false}
                            padding={"small"}
                            variant="menu"
                          >
                            <ContainedHeader>
                              <ContainedTitle>Actions</ContainedTitle>
                            </ContainedHeader>
                            <ContainedListItems>
                              <ContainedListItem>
                                {" "}
                                <ContainedListValue>
                                  <Link
                                    className="!text-current"
                                    href="/usages/metrics/link-to-pricing/choose"
                                  >
                                    Link pricing
                                  </Link>
                                </ContainedListValue>{" "}
                              </ContainedListItem>
                              <ContainedListItem>
                                {" "}
                                <ContainedListValue>
                                  Edit
                                </ContainedListValue>{" "}
                              </ContainedListItem>
                              <ContainedListItem>
                                {" "}
                                <ContainedListValue>
                                  Duplicate
                                </ContainedListValue>{" "}
                              </ContainedListItem>
                              <ContainedListItem>
                                {" "}
                                <ContainedListValue>
                                  <div className="text-red-600">Archive</div>
                                </ContainedListValue>{" "}
                              </ContainedListItem>
                            </ContainedListItems>
                          </ContainedList>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillableMetricPage;
