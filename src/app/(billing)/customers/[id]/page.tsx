"use client";

import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
} from "cb-sting-react-ts";
import { useEffect, useState } from "react";

import { CustomerFullpage } from "./_components/CustomerFullpage";

import Actions from "./_components/RightColumnActions";

import { mainTabs } from "./_components/data/customerData";

import { useRouter } from "next/navigation";

import CreateChargesModal from "@/app/(billing)/subscriptions/_component/customer/create/CreateChargesModal";
import CreateModal from "@/app/(billing)/subscriptions/_component/customer/create/CreateModal";
import { buttonGroups } from "@/app/(billing)/subscriptions/_component/customer/details/GroupActions";
import ToastMessage from "@/app/(billing)/subscriptions/_component/customer/details/ToastMessage";

const CustomerDetails = () => {
  console.log("CustomerDetails");
  const handleValueChange = () => {};
  const [generalInfo, setGenralInfo] = useState<unknown>(null);
  const [refundIssueModal, setRefundIssueModal] = useState<"show" | "hide">(
    "hide"
  );
  const [createSubscriptionModal, setCreateSubscriptionModal] = useState<
    "show" | "hide"
  >("hide");

  const [createChargesModal, setCreateChargesModal] = useState<"show" | "hide">(
    "hide"
  );

  const [showToast, setShowToast] = useState<boolean>(false);
  const [currentTab, setCurrentTab] =
    useState<keyof typeof buttonGroups>("Subscription");
  const [fourColumns, setFourColumns] = useState(false);

  const router = useRouter();

  const handleTabChange = (tabId: string) => {
    const tabMapping = {
      tab1: "SubscriptionFullpage",
      tab2: "Subscription",
      tab3: "Invoices",
      tab5: "Credits",
      tab6: "Quotes",
    };

    setCurrentTab(tabMapping[tabId]);
  };

  const allCustomersHandler = () => {
    router.push("/dashboard");
  };

  const handleCloseModal = (status: "show" | "hide") => {
    setCreateSubscriptionModal(status);
  };

  const handleChargesCloseModal = (status: "show" | "hide") => {
    setCreateChargesModal(status);
  };

  const handleActionClick = (action: string) => {
    if (action === "Create Subscription") {
      setCreateSubscriptionModal("show");
    }
    if (action === "Create Charges") {
      setCreateChargesModal("show");
    }
  };

  const handleViewClick = (view) => {
    if (view) {
      setFourColumns(false);
    } else {
      setFourColumns(true);
    }
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div
        className={`col-span-12 ${
          fourColumns ? "lg:col-span-10" : "lg:col-span-12"
        }`}
      >
        <div className="bodyContent min-h-screen overflow-auto">
          {showToast && <ToastMessage />}

          {/* header */}
          <div className="md:flex items-center md:justify-between !mt-0 space-y-6 md:space-y-0">
            <div className="flex gap-2 items-center divide-x divide-neutral-100">
              <span>
                <Button
                  onClick={allCustomersHandler}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  <ArrowLeftIcon /> All Customers
                </Button>
              </span>
              <span className="pl-2">
                <Button
                  onClick={allCustomersHandler}
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
            <CreateModal
              open={createSubscriptionModal}
              onCloseModal={handleCloseModal}
            />

            {/* createSubscriptionModal */}
            <CreateChargesModal
              open={createChargesModal}
              onCloseModal={handleChargesCloseModal}
            />

            {/* left */}
            <Tabs
              defaultTabID="tab1"
              onValueChange={handleTabChange}
              tabId="tab1"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start">
                <div className="md:col-span-2 mb-4">
                  <TabsList
                    tabStyle="lined"
                    tabs={mainTabs}
                    variant="vertical"
                    width="full"
                  />
                </div>

                <div className="md:col-span-8 lg:col-span-8">
                  <TabsContent tabId="tab1" onValueChange={handleValueChange}>
                    <div>
                      <CustomerFullpage
                        columns={fourColumns}
                        onClickView={() => {
                          handleViewClick(fourColumns);
                        }}
                      />
                    </div>
                  </TabsContent>
                </div>

                {/* right */}
                <div className="lg:col-span-2">
                  <Actions
                    currentTab={currentTab}
                    onClickAction={handleActionClick}
                  />
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
