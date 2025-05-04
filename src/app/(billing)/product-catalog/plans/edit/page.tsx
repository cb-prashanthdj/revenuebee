"use client";

import { TabType } from "../_models/TabType";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Button,
  Card,
  CheckList,
  CProgressTracker,
  Input,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Notification,
  SelectItem,
  SelectMenu,
  Tabs,
  TabsContent,
  TabsList,
} from "cb-sting-react-ts";
import { useState } from "react";

const tabs: TabType[] = [
  {
    id: "tab1",
    title: "Edit Price Point for Growth...",
  },
  {
    id: "tab2",
    title: "Pricing",
  },
  {
    id: "tab3",
    title: "Customer-Facing info",
  },
  {
    id: "tab4",
    title: "Tax",
  },
  {
    id: "tab-5",
    title: "Accounting",
  },
];

export default function EditPlan() {
  const [name, setName] = useState("Growth Plan USD Daily");
  const [price, setPrice] = useState("USD 100.00");
  return (
    <div className="bodyContent min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">
          Edit Price Points for Growth Plan USD Daily
        </h2>
        <div className="actions flex items-center gap-2">
          <Button variant="neutral">Dismiss</Button>
          <Modal>
            <ModalTrigger>
              <Button>Update</Button>
            </ModalTrigger>
            <ModalContent
              size="small"
              variant="default"
              // @ts-ignore
              title={
                <h5>This action requires approval. Do you want to proceed?</h5>
              }
              className="!max-w-[440px]"
            >
              <div className="flex flex-col gap-3">
                <Notification size="regular" variant="primary" width="full">
                  <div className="flex items-start gap-2">
                    <InformationCircleIcon className="text-primary-500 flex-shrink-0" />
                    <div className="notification-copy leading-5 text-primary-700">
                      Proceeding will initiate the approval process and create
                      the price point upon approval.
                    </div>
                  </div>
                </Notification>

                <div>
                  <label className="font-medium leading-5 text-sm" htmlFor="#">
                    Message for the approver(s)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add your message here..."
                    className={`w-full py-1 px-2 rounded border border-gray-400/70 text-inherit font-[inherit] placeholder:text-gray-400`}
                  ></textarea>
                </div>

                <div>
                  <span className="font-medium inline-block mb-2">
                    Approvers
                  </span>
                  <CProgressTracker active="brand" align="vertical">
                    <CProgressTracker.Step
                      isDone={true}
                      isActive={true}
                      label={1}
                      showBar={true}
                    >
                      <CProgressTracker.Title>
                        <span className="font-semibold">RevOps</span>
                      </CProgressTracker.Title>
                      {/* <Badge className="w-fit" color="primary"> */}
                      Carl
                      {/* </Badge> */}
                    </CProgressTracker.Step>
                    <CProgressTracker.Step
                      isDone={true}
                      isActive={true}
                      label={2}
                      showBar={false}
                    >
                      <CProgressTracker.Title>
                        <span className="font-semibold">Product Team</span>
                      </CProgressTracker.Title>
                      {/* <Badge className="w-fit" color="primary"> */}
                      Jack Sparrow and Hector
                      {/* </Badge> */}
                    </CProgressTracker.Step>
                  </CProgressTracker>
                </div>
              </div>
              <ModalClose>
                <div className="flex gap-2 justify-end">
                  <Button variant="neutral" styleType="text">
                    Cancel
                  </Button>
                  <Button>Request Approval</Button>
                </div>
              </ModalClose>
            </ModalContent>
          </Modal>
        </div>
      </div>
      <Tabs defaultTabID="tab1" onValueChange={() => {}} tabId="tab1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start">
          <div className="md:col-span-2 mb-4">
            <TabsList
              tabStyle="lined"
              tabs={tabs}
              variant="vertical"
              width="full"
              className="max-w-[30ch] overflow-hidden text-ellipsis whitespace-nowrap"
            />
          </div>
          <div className="md:col-span-8 lg:col-span-8">
            <TabsContent tabId="tab1" onValueChange={() => {}}>
              <div className="flex flex-col gap-3">
                <Card>
                  <div className="flex flex-col gap-4 max-w-lg">
                    <Input
                      variant="input"
                      labelText="Plan Price Point Name"
                      messageText="Add a name that helps you identify this plan price point internally"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      variant="input"
                      labelText="Plan Price Point ID *"
                      disabled
                      value={name.split(" ").join("-")}
                      messageText="Reference used by Chargebee to identify this plan price point"
                    />

                    <CheckList
                      align="horizontal"
                      variant="basic"
                      title=""
                      listDescription=""
                    >
                      <CheckList.Item value="true">
                        <div>This plan has a trial period</div>
                      </CheckList.Item>
                    </CheckList>
                  </div>
                </Card>
                <Card>
                  <h3>Pricing</h3>
                  <hr />
                  <p>
                    Define how the recurring changes for this plan are
                    calculated
                  </p>
                  <div className="my-4 flex flex-col gap-4 max-w-lg">
                    <div>
                      <SelectMenu
                        label="default"
                        labelText="Pricing Model"
                        defaultValue="flat_fee"
                      >
                        <SelectItem value="flat_fee">Flat Fee</SelectItem>
                        <SelectItem value="per_unit">Per Unit</SelectItem>
                        <SelectItem value="tiered">Tiered</SelectItem>
                        <SelectItem value="volume">Volume</SelectItem>
                        <SelectItem value="stairstep">Stairstep</SelectItem>
                      </SelectMenu>

                      <span className="text-gray-500 text-sm">
                        Defines how the recurring charges for this plan are
                        calculated
                      </span>
                    </div>

                    <Input
                      step={0.25}
                      variant="input"
                      type="text"
                      labelText="Price *"
                      iconName="USD"
                      value={price}
                      onChangeLogic={(e: any) => setPrice(e)}
                    />

                    <div>
                      <SelectMenu
                        label="default"
                        labelText="Billing cycles"
                        defaultValue="forever"
                      >
                        <SelectItem value="forever">Forever</SelectItem>
                        <SelectItem value="fixed_period">
                          Fixed Period
                        </SelectItem>
                      </SelectMenu>
                      <span className="text-gray-500 text-sm">
                        Choose if you&apos;d like this plan to be billed forever
                        or for a fixed period
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
