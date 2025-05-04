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

import { SubscriptionFullpage } from "@/app/(billing)/subscriptions/_component/details/SubscriptionFullpage";

import Actions from "@/app/(billing)/subscriptions/_component/customer/details/RightColumnActions";

import { mainTabs } from "@/app/(billing)/subscriptions/_component/data/subscriptionData";

import { useRouter } from "next/navigation";

import CreateChargesModal from "@/app/(billing)/subscriptions/_component/customer/create/CreateChargesModal";
import CreateModal from "@/app/(billing)/subscriptions/_component/customer/create/CreateModal";
import { buttonGroups } from "@/app/(billing)/subscriptions/_component/customer/details/GroupActions";
import ToastMessage from "@/app/(billing)/subscriptions/_component/customer/details/ToastMessage";
// import { useCaseSwitcher } from "@/app/store/UseCaseStore";

const SubscriptionDetails = () => {
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

  const {
    data: apiData,
    error,
    apiLoading,
  } = {
    data: [],
    error: false,
    apiLoading: false,
  };

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

  const allSubscriptionHandler = () => {
    router.push("/subscriptions");
  };

  // useEffect(() => {
  //   if (apiData) {
  //     setGenralInfo(apiData);
  //   }
  //   setShowToast(false);
  //   const handleKeyDown = (event) => {
  //     if (event.key === "i") {
  //       setRefundIssueModal((prevState) =>
  //         prevState === "show" ? "hide" : "show"
  //       );
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [apiData]);

  const handleCloseDrawer = () => {
    setRefundIssueModal("hide");
  };

  const issueRefundHandler = (state: boolean) => {
    setShowToast(false);

    setTimeout(() => {
      setRefundIssueModal("hide");
      setShowToast(true);
    }, 0);
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

  // const updatedTabs = removeTab(
  //   jumpToTabs,
  //   selectedUseCaseItem.id === "uc3" && selectedUseCase.id == "a2"
  // );

  const handleViewClick = (view) => {
    if (view) {
      setFourColumns(false);
    } else {
      setFourColumns(true);
    }
  };
  const handleCloseFourColumns = () => {
    setFourColumns(false);
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div
        className={`col-span-12 ${
          fourColumns ? "lg:col-span-10" : "lg:col-span-12"
        }`}
      >
        <div className="bodyContent min-h-screen overflow-auto">
          {/* <ActionDrawer
            state={refundIssueModal}
            onClose={handleCloseDrawer}
            onIssueRefund={issueRefundHandler}
          /> */}
          {showToast && <ToastMessage />}

          {/* header */}
          <div className="md:flex items-center md:justify-between !mt-0 space-y-6 md:space-y-0">
            <div className="flex gap-2 items-center divide-x divide-neutral-100">
              <span>
                <Button
                  onClick={allSubscriptionHandler}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  <ArrowLeftIcon /> All Subscriptions
                </Button>
              </span>
              <span className="pl-2">
                <Button
                  onClick={allSubscriptionHandler}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  John Doe
                </Button>
              </span>
            </div>

            {/* <div className="flex gap-4">{buttonGroups[currentTab]}</div> */}
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
                      <SubscriptionFullpage
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

      {/* From Receivables */}
      {fourColumns && (
        <div className="extra col-span-2 min-h-screen bg-white shadow-md sticky top-0">
          <div className="sticky top-0">
            <div className="absolute right-1 top-1">
              <Button
                onClick={handleCloseFourColumns}
                size="regular"
                styleType="icon-borderless"
                variant="neutral"
              >
                <XMarkIcon className="!text-white" />
              </Button>
            </div>
            <div className="text-brand-lime-light bg-brand-deep-dark font-semibold font-sora px-4 py-2">
              From Receivables
            </div>
          </div>

          <div className="p-4 space-y-2 divider-y divider-neutral-200 sticky top-9">
            <div className="pb-2">
              <h1 className="h5">Sophia Roberts</h1>
              <a className="text-sm text-primary-600 underline">
                View in Receivables
              </a>
            </div>

            <div className="py-2 space-y-2 ">
              <h2 className="h6">Summary</h2>
              <div className="flex flex-col  bg-red-50  px-3 py-2 rounded-md">
                <span className="text-xs text-lightest leading-5">
                  Total outstanding
                </span>
                <span className="h5 text-red-500">$3700</span>
              </div>
              <div className="flex flex-col border border-neutral-100 px-3 py-2 rounded-md">
                <span className="text-xs text-lightest leading-5">
                  Open P2Ps
                </span>
                <span className="h5">$2000</span>
              </div>
            </div>

            <div className="py-2 space-y-1">
              <h2 className="h6">Cases</h2>
              <Accordion border="no-border" type={'single'}>
                <AccordionItem size="small" value="Item-1">
                  <AccordionTrigger value="Item-1">
                    <div className="flex justify-between w-full">
                      <span className="">Price issue</span>
                      <span>
                        <Badge variant="red">Overdue</Badge>
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className=" divide-y divide-neutral-100 py-2">
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">
                          Invoice No.
                        </div>
                        <div className="w-2/4">1234</div>
                      </div>
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">
                          Invoice value
                        </div>
                        <div className="w-2/4">$ 2000</div>
                      </div>
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">
                          P2P Amount
                        </div>
                        <div className="w-2/4">$ 2000</div>
                      </div>
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">Due date</div>
                        <div className="w-2/4">7 Jul 2024</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion border="no-border" type={'single'}>
                <AccordionItem size="small" value="Item-1">
                  <AccordionTrigger value="Item-1">
                    <div className="flex justify-between w-full">
                      <span className="">Promise to pay</span>
                      <span>
                        <Badge variant="red">Overdue</Badge>
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className=" divide-y divide-neutral-100 py-2">
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">
                          Invoice No.
                        </div>
                        <div className="w-2/4">1234</div>
                      </div>
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">
                          Invoice value
                        </div>
                        <div className="w-2/4">$ 2000</div>
                      </div>
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">
                          P2P Amount
                        </div>
                        <div className="w-2/4">$ 2000</div>
                      </div>
                      <div className=" flex gap-x-3">
                        <div className="w-2/4 bg-neutral-50 px-2">Due date</div>
                        <div className="w-2/4">7 Jul 2024</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="py-2 space-y-1">
              <h2 className="h6">Notes</h2>
              <div className="flex flex-col">
                <span className="leading-5">Payment due response</span>
                <span className="text-xs text-lightest leading-5">
                  8 Jul 2024, 05:14 pm
                </span>
              </div>
            </div>

            <div className="py-2 space-y-1">
              <h2 className="h6">Actions</h2>
              <ul className="flex flex-col">
                <li>Remind via Email</li>
                <li>Set Reminder</li>
                <li>Raise Issue</li>
                <li>Take Notes</li>
                <li>Download Summary</li>
              </ul>
            </div>

            <div className="py-2 space-y-1">
              <h2 className="h6">References</h2>
              <ul className="flex flex-col">
                <li>View associated Subscriptions</li>
                <li>View associated Invoices</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetails;
