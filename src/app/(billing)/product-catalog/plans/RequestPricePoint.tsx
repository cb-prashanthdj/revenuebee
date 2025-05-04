"use client";

import {
  BellAlertIcon,
  CheckIcon,
  DocumentIcon,
  NoSymbolIcon,
  UserIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  ContainedDescription,
  ContainedHeader,
  ContainedList,
  ContainedListItem,
  ContainedListItems,
  ContainedListLabel,
  ContainedListValue,
  ContainedTitle,
  CStackedItem,
  CStackedList,
  Drawer,
  SelectItem,
  SelectMenu,
  Tabs,
  TabsContent,
  TabsList,
} from "cb-sting-react-ts";
import { useEffect, useState } from "react";
import approvalData from "./approvalData.json";

const RequestPricePoint = ({
  drawerOpenStatus,
  drawerOnclose,
}: {
  drawerOpenStatus: string;
  drawerOnclose: () => void;
}) => {
  const [drawerStatus, setDrawerStatus] = useState(drawerOpenStatus);
  const [selectedUseCase, setSelectedUseCase] = useState({ id: "a2" });
  const [selectedUseCaseItem, setSelectedUseCaseItem] = useState({ id: "uc2" });

  console.log(selectedUseCase.id, selectedUseCaseItem.id);

  useEffect(() => {
    setDrawerStatus(drawerOpenStatus);
  }, [drawerOpenStatus]);

  const styles = {
    th: "table-row-header-cell w-0 whitespace-nowrap",
    td: "w-0 whitespace-nowrap !text-sm text-light !py-xsmall",
    rightAlign: "text-right",
    numeric: "font-mono",
    highlight: "text-darkest bg-primary-50",
    cellBorder: "border-b border-neutral-100",
  };

  return (
    <Drawer
      hasCloseIcon
      height="short"
      width="wide"
      onClose={() => {
        setDrawerStatus("hide");
        drawerOnclose();
      }}
      placement="right"
      show={drawerStatus}
      title="Approval Request - Price Point"
    >
      <div className="w-full space-y-4">
        {/* Content header */}
        <div className="flex gap-4 justify-between">
          <div className="flex gap-2 items-center">
            {/* <Badge variant={"primary"} mode="light">
              In Progress
            </Badge> */}
            <Badge variant="warning">Waiting on Carl Taylor</Badge>
          </div>
          <div className="flex items-start justify-end gap-4">
            {selectedUseCaseItem.id === "uc2" && selectedUseCase.id === "a2" ? (
              <Button
                onClick={() => {}}
                variant="neutral"
                styleType="outline"
                size="regular"
              >
                Cancel Request
              </Button>
            ) : null}
            {selectedUseCaseItem.id === "uc2" && selectedUseCase.id === "a4" ? (
              <SelectMenu label="hide" placeholder="Override" size="regular">
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
              </SelectMenu>
            ) : null}
            {selectedUseCaseItem.id === "uc2" && selectedUseCase.id === "a4" ? (
              <Button
                onClick={() => {}}
                size="regular"
                styleType="outline"
                variant="neutral"
              >
                Cancel Request
              </Button>
            ) : null}
            {selectedUseCase.id === "a3" && selectedUseCaseItem.id === "uc2" ? (
              <div className="flex gap-4">
                <Button size="regular" variant="danger">
                  <NoSymbolIcon /> Reject
                </Button>
                <Button size="regular" variant="primary">
                  <CheckIcon /> Approve
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Tabs */}
        <div>
          <Tabs defaultTabID="tab1" onValueChange={() => {}} tabId="tab1">
            <TabsList
              tabStyle="contained"
              size="large"
              tabs={[
                {
                  id: "tab1",
                  title: "Approvers",
                },
                {
                  id: "tab2",
                  title: "Details",
                },
                {
                  id: "tab3",
                  title: "History",
                },
              ]}
              variant="horizontal"
              width="full"
            />
            <TabsContent onValueChange={() => {}} tabId="tab1">
              <div className="space-y-4 py-6">
                {/* Stage 2 */}
                <div className="py-2 space-y-4">
                  {/* Stage header */}
                  <div className="flex justify-between gap-8">
                    <div className="flex gap-4">
                      <Badge mode="dark" size="regular" variant="brand">
                        Stage 1
                      </Badge>
                      <div className="space-y-0">
                        <h2 className="h5">Billing Manager</h2>
                        <p className="text-lightest leading-5">
                          Everyone must approve
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end mr-3.5">
                      <Badge mode="light" size="regular" variant="primary">
                        In Progress
                      </Badge>
                    </div>
                  </div>

                  {/* Approvers list */}
                  <div className="space-y-2">
                    <div className="flex flex-col -space-y-px">
                      {/* Profile #1 */}
                      <div className="flex gap-4 items-center justify-between bg-yellow-25 px-4 py-2 border border-neutral-100 rounded-t relative">
                        <div className="flex gap-2 items-center">
                          <span className="rounded-full bg-yellow-100 text-yellow-800 w-8 h-8 p-2 relative">
                            <BellAlertIcon />
                          </span>
                          <div className="flex flex-col text-left p-1">
                            <span className="font-semibold leading-5">
                              Carl Taylor
                            </span>
                            <span className="text-xs leading-4">
                              carl@chargebee.com
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-4 justify-end items-center">
                          {selectedUseCaseItem.id === "uc2" &&
                          (selectedUseCase.id === "a2" ||
                            selectedUseCase.id === "a4") ? (
                            <span className="flex gap-0 justify-end">
                              <Button
                                onClick={() => {}}
                                size="regular"
                                styleType="text"
                                variant="warning"
                              >
                                Send Reminder
                              </Button>
                            </span>
                          ) : null}
                          <span>
                            <Badge mode="dark" size="regular" variant="yellow">
                              Waiting
                            </Badge>
                          </span>
                        </div>
                      </div>
                      {/* Profile #2 */}
                      <div className="flex gap-4 items-center justify-between bg-white px-4 py-2 border border-neutral-100 rounded-b relative">
                        <div className="flex gap-2 items-center">
                          <span className="rounded-full bg-neutral-50 text-neutral-800 w-8 h-8 p-2 relative">
                            <CheckIcon />
                          </span>
                          <div className="flex flex-col text-left p-1 opacity-50">
                            <span className="font-semibold leading-5">
                              Jack Mark Loganmarcle
                            </span>
                            <span className="text-xs leading-4">
                              jack@chargebee.com
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-4 justify-end items-center">
                          <span>
                            <Badge mode="light" size="regular" variant="green">
                              Approved
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="py-2 space-y-4">
                  {/* Stage header */}
                  <div className="flex justify-between gap-8">
                    <div className="flex gap-4">
                      <Badge mode="dark" size="regular" variant="brand">
                        Stage 2
                      </Badge>
                      <div className="space-y-0">
                        <h2 className="h5">Finance</h2>
                        <p className="text-lightest leading-5">
                          Just notify - No action needed
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end mr-3.5">
                      <Badge mode="light" size="regular" variant="neutral">
                        Yet to start
                      </Badge>
                    </div>
                  </div>

                  {/* Approvers list */}
                  <div className="space-y-2">
                    <div className="flex flex-col -space-y-px">
                      {/* Profile #1 */}
                      <div className="flex gap-4 items-center justify-between bg-white px-4 py-2 border border-neutral-100 rounded-t relative">
                        <div className="flex gap-2 items-center">
                          <span className="rounded-full bg-neutral-50 text-neutral-600 w-8 h-8 p-2 relative">
                            <UserIcon />
                          </span>
                          <div className="flex flex-col text-left p-1">
                            <span className="font-semibold leading-5">
                              Jack Sparrow
                            </span>
                            <span className="text-xs leading-4">
                              jack@chargebee.com
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex gap-4 justify-end items-center">
                          <Badge mode="light" size="regular" variant="neutral">
                            Not requested
                          </Badge>
                        </div> */}
                      </div>
                      {/* Profile #2 */}
                      <div className="flex gap-4 items-center justify-between bg-white px-4 py-2 border border-neutral-100 rounded-b relative">
                        <div className="flex gap-2 items-center">
                          <span className="rounded-full bg-neutral-50 text-neutral-600 w-8 h-8 p-2 relative">
                            <UserIcon />
                          </span>
                          <div className="flex flex-col text-left p-1">
                            <span className="font-semibold leading-5">
                              Hector Victor
                            </span>
                            <span className="text-xs leading-4">
                              jack@chargebee.com
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex gap-4 justify-end items-center">
                          <Badge mode="light" size="regular" variant="neutral">
                            Not requested
                          </Badge>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent onValueChange={() => {}} tabId="tab2">
              <div className="space-y-8 py-6">
                <ContainedList
                  description=""
                  header=""
                  labels="block"
                  onClick={() => {}}
                  padding="regular"
                  showHeader
                  showTitle
                  variant="basic"
                >
                  <ContainedHeader>
                    <ContainedTitle>Price Point Details</ContainedTitle>
                  </ContainedHeader>
                  <ContainedListItems>
                    <ContainedListItem>
                      <ContainedListLabel>Product Family</ContainedListLabel>
                      <ContainedListValue>CRM</ContainedListValue>
                    </ContainedListItem>
                    <ContainedListItem>
                      <ContainedListLabel>Plan</ContainedListLabel>
                      <ContainedListValue>Enterprise</ContainedListValue>
                    </ContainedListItem>
                    <ContainedListItem>
                      <ContainedListLabel>Currency</ContainedListLabel>
                      <ContainedListValue>USD</ContainedListValue>
                    </ContainedListItem>
                    <ContainedListItem>
                      <ContainedListLabel>Billing Cycle</ContainedListLabel>
                      <ContainedListValue>Forever</ContainedListValue>
                    </ContainedListItem>
                    <ContainedListItem>
                      <ContainedListLabel>Pricing Model</ContainedListLabel>
                      <ContainedListValue>Flat</ContainedListValue>
                    </ContainedListItem>
                  </ContainedListItems>
                </ContainedList>

                <div className="space-y-2">
                  <h4 className="h5">Pricing</h4>
                  <table className="table">
                    <thead className="table-header">
                      <tr className="table-row">
                        <th className={`${styles.th} ${styles.rightAlign}`}>
                          Existing tier range
                        </th>
                        <th className={`${styles.th} ${styles.rightAlign}`}>
                          Existing price per unit
                        </th>
                        <th className={`${styles.th} ${styles.rightAlign}`}>
                          New tier range
                        </th>
                        <th className={`${styles.th} ${styles.rightAlign}`}>
                          New price per unit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      <tr className="table-row">
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          1 - 10
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          100,00 €
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          1 - 10
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          100,00 €
                        </td>
                      </tr>
                      <tr className="table-row">
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          11 - 20
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          200,00 €
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric} ${styles.highlight}`}
                        >
                          16 - 20
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          220,00 €
                        </td>
                      </tr>
                      <tr className="table-row">
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          20 - 31
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          300,00 €
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          20 - 30
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric} ${styles.highlight}`}
                        >
                          330,00 €
                        </td>
                      </tr>
                      <tr className="table-row">
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          31 - & above
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          400,00 €
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          31 - & above
                        </td>
                        <td
                          className={`${styles.td} ${styles.rightAlign} ${styles.numeric}`}
                        >
                          0,00 €
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2">
                  <h4 className="h5">Related Links</h4>
                  <span className="flex gap-4">
                    <a className="text-primary-600 underline cursor-pointer">
                      Draft Invoice PDF
                    </a>
                    <a className="text-primary-600 underline cursor-pointer">
                      View Draft Subscription
                    </a>
                  </span>
                </div>

                {/* <ContainedList
                  description=""
                  header=""
                  labels="block"
                  onClick={() => { }}
                  padding="regular"
                  variant="basic"
                >
                  <ContainedListItem>
                    <ContainedListLabel>Related Links</ContainedListLabel>
                    <ContainedListValue>
                      <span className="flex flex-col gap-2">
                        <a className="text-primary-600 underline cursor-pointer">
                          View Draft Invoice PDF
                        </a>
                        <a className="text-primary-600 underline cursor-pointer">
                          View Draft Subscription
                        </a>
                      </span>
                    </ContainedListValue>
                  </ContainedListItem>
                </ContainedList> */}

                <ContainedList
                  description=""
                  header=""
                  labels="block"
                  onClick={() => {}}
                  padding="regular"
                  showHeader
                  showTitle
                  variant="basic"
                >
                  <ContainedHeader>
                    <ContainedTitle>Approval Details</ContainedTitle>
                  </ContainedHeader>
                  <ContainedListItems>
                    <ContainedListItem>
                      <ContainedListLabel>Price</ContainedListLabel>
                      <ContainedListValue>$120</ContainedListValue>
                    </ContainedListItem>
                  </ContainedListItems>
                </ContainedList>

                <ContainedList
                  description=""
                  header=""
                  labels="block"
                  onClick={() => {}}
                  padding="regular"
                  showHeader
                  showTitle
                  variant="basic"
                >
                  <ContainedHeader>
                    <ContainedTitle>Requester Details</ContainedTitle>
                  </ContainedHeader>
                  <ContainedListItems>
                    <ContainedListItem>
                      <ContainedListLabel>Requested by</ContainedListLabel>
                      <ContainedListValue>Matt</ContainedListValue>
                    </ContainedListItem>
                    <ContainedListItem>
                      <ContainedListLabel>Requested on</ContainedListLabel>
                      <ContainedListValue>
                        19 Feb 2024, 16:00
                      </ContainedListValue>
                    </ContainedListItem>
                    <ContainedListItem>
                      <ContainedListLabel>Comments</ContainedListLabel>
                      <ContainedListValue>
                        This customer represents a strategic opportunity for us.
                        Their acquisition opens doors to acquiring additional
                        customers within the same industry
                      </ContainedListValue>
                    </ContainedListItem>
                  </ContainedListItems>
                </ContainedList>
              </div>
            </TabsContent>
            <TabsContent onValueChange={() => {}} tabId="tab3">
              <div className="space-y-4 py-6">
                <CStackedList onItemClick={() => {}}>
                  <ApprovalTimeline />
                </CStackedList>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Drawer>
  );
};

const TimelineEvent = ({
  timestamp,
  event,
}: {
  timestamp: string;
  event: string;
}) => (
  <>
    <div className="w-32 whitespace-nowrap text-lightest leading-5">
      {timestamp}
    </div>
    <span className="text-base leading-5">{event}</span>
  </>
);

const Comment = ({
  author,
  avatar,
  timestamp,
  content,
}: {
  author?: string;
  avatar?: string;
  timestamp?: string;
  content?: string;
}) => (
  <>
    <span className="w-32 whitespace-nowrap text-lightest leading-5">
      {timestamp}
    </span>
    <div className="ml-5 flex items-start gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatar} alt={author} className="w-6 h-6 rounded-full" />
      <div>
        <div className="flex flex-col space-y-1">
          <span className="font-semibold leading-5">{author}</span>
          <span className="text-base inline-block leading-5">{content}</span>
        </div>
      </div>
    </div>
  </>
);
interface TimelineItem {
  type?: string;
  timestamp?: string;
  event?: string;
  author?: string;
  avatar?: string;
  content?: string;
}
const TimelineItem = ({ item }: { item: TimelineItem }) => {
  if (item.type === "event") {
    return (
      <TimelineEvent
        timestamp={item.timestamp || ""}
        event={item.event || ""}
      />
    );
  } else if (item.type === "comment") {
    return <Comment {...item} />;
  }
  return null;
};

const ApprovalTimeline = () => {
  return (
    <div className="flex flex-col divide-y divide-neutral-100">
      {approvalData.timeline.map((item, index) => (
        <div
          className="flex w-full justify-between items-start gap-4 py-2.5"
          key={index}
        >
          <div className="flex gap-4 items-start">
            <div className="flex gap-4 items-start">
              <div className="pt-0.5">
                <CheckCircleIcon className="w-4 h-4 text-neutral-400" />
              </div>
              <TimelineItem key={index} item={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestPricePoint;
