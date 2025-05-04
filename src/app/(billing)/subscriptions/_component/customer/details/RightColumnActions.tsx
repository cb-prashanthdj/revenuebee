import React from "react";
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Tooltip,
  CProgressTracker,
} from "cb-sting-react-ts";

import {
  ContainedList,
  ContainedListItem,
  ContainedHeader,
  ContainedListItems,
  ContainedTitle,
  ContainedListValue,
} from "cb-sting-react-ts";

import NewSubscriptionForm from "@/app/(billing)/subscriptions/_component/NewCreateSubscription";

type Props = {
  currentTab: string;
  onClickAction: (action: string) => void;
};

const Actions = ({ currentTab, onClickAction }: Props) => {
  const MainActions = [
    {
      label: "Create",
      value: (
        <div>
          <Tooltip
            color="dark"
            placement="left"
            label="Sorry, this link doesn't work"
            link={{
              href: "#",
              label: "Learn More",
            }}
            width="Regular"
          >
            <span className="p-0 text-neutral-500 cursor-not-allowed">
              Create
            </span>
          </Tooltip>
        </div>
      ),
      action: () => onClickAction("Create Charges"),
    },
    {
      label: "Create",
      value: <CreateQuoteModal />,
      action: () => onClickAction("Create Charges"),
    },

    {
      label: "Management",
      value: "Edit Customer",
      action: () => console.log("Request Payment"),
    },
    {
      label: "Payments",
      value: (
        <Modal onOpenChange={() => {}}>
          <ModalTrigger>
            <div>Create Subscription</div>
          </ModalTrigger>
          <ModalContent
            hasCloseIcon
            onOpenChange={() => {}}
            size="large"
            className="w-[90%]"
            title="Did you you call me?"
            variant="default"
          >
            <div className="w-full flex gap-4 h-screen ">
              <NewSubscriptionForm />
            </div>
            <ModalClose></ModalClose>
          </ModalContent>
        </Modal>
      ),
      action: () => console.log("Request Payment"),
    },
    {
      label: "Management",
      value: "Clear Personal Data",
      action: () => console.log("Request Payment"),
    },
    {
      label: "Payments",
      value: "Request Payment",
      action: () => console.log("Request Payment Method"),
    },
    {
      label: "Payments",
      value: "Request Payment Method",
      action: () => console.log("Request Payment Method"),
    },
    {
      label: "Payments",
      value: "Add Billing Info",
      action: () => console.log("Record An Offline Payment"),
    },
    {
      label: "Payments",
      value: "Add Charges",
      action: () => console.log("Issue A Refund"),
    },
    {
      label: "Payments",
      value: "Update Promotional Credits ",
      action: () => console.log("Edit Customer"),
    },
    {
      label: "Payments",
      value: "Record an Offline Payment",
      action: () => console.log("Edit Promotional Credits"),
    },
  ];

  const create = MainActions.filter((item) => item.label === "Create");
  const payment = MainActions.filter((item) => item.label === "Payments");
  const management = MainActions.filter((item) => item.label === "Management");
  const moreActions = MainActions.filter(
    (item) => item.label === "More Actions"
  );
  const ActionTimeline = () => {
    return (
      <CProgressTracker active="neutral" align="vertical" labels={true}>
        <CProgressTracker.Step isDone={true} isActive={false} showBar={true}>
          <CProgressTracker.Title>
            <span className="font-semibold">Created on 10-Sep-2024 17:52</span>
          </CProgressTracker.Title>
        </CProgressTracker.Step>
        <CProgressTracker.Step isDone={true} isActive={false} showBar={true}>
          <CProgressTracker.Title>
            <span className="font-semibold">Started on 10-Sep-2024 17:52</span>
          </CProgressTracker.Title>
        </CProgressTracker.Step>
        <CProgressTracker.Step isDone={false} isActive={true} showBar={true}>
          <CProgressTracker.Title>
            <span className="font-semibold">Active on 10-Sep-2024 17:52</span>
          </CProgressTracker.Title>
        </CProgressTracker.Step>
        <CProgressTracker.Step isDone={false} isActive={false} showBar={true}>
          <CProgressTracker.Title>
            <span className="font-semibold">
              Next billing on 10-Sep-2024 17:52
            </span>
          </CProgressTracker.Title>
        </CProgressTracker.Step>
        <CProgressTracker.Step isDone={false} isActive={false} showBar={false}>
          <CProgressTracker.Title>
            <span className="font-semibold">
              Next renewal on 10-Sep-2024 17:52
            </span>
          </CProgressTracker.Title>
        </CProgressTracker.Step>
      </CProgressTracker>
    );
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="space-y-4">
          <ContainedList showSeperator={false} padding={"small"} variant="menu">
            <ContainedHeader>
              <ContainedTitle>Subscription Management</ContainedTitle>
            </ContainedHeader>
            <ContainedListItems>
              {payment.map((item, index) => (
                <ContainedListItem key={index}>
                  <ContainedListValue>{item.value}</ContainedListValue>
                </ContainedListItem>
              ))}
            </ContainedListItems>
          </ContainedList>

          <ContainedList showSeperator={false} padding={"small"} variant="menu">
            <ContainedHeader>
              <ContainedTitle>Billing Management</ContainedTitle>
            </ContainedHeader>
            <ContainedListItems>
              {management.map((item, index) => (
                <ContainedListItem key={index}>
                  <ContainedListValue>{item.value}</ContainedListValue>
                </ContainedListItem>
              ))}
            </ContainedListItems>
          </ContainedList>

          <ContainedList showSeperator={false} padding={"small"} variant="menu">
            <ContainedHeader>
              <ContainedTitle>Customer Management</ContainedTitle>
            </ContainedHeader>
            <ContainedListItems>
              {create.map((item, index) => (
                <ContainedListItem key={index}>
                  <ContainedListValue>{item.value}</ContainedListValue>
                </ContainedListItem>
              ))}
            </ContainedListItems>
          </ContainedList>

          <div className="border-b border-neutral-100 my-2"></div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
            className={`block w-full text-left py-1.5 cursor-pointer leading-4 text-red-500 hover:text-red-600`}
          >
            Delete Customer
          </a>

          <ContainedList showSeperator={false} padding={"small"} variant="menu">
            <ContainedHeader>
              <ContainedTitle>Timeline</ContainedTitle>
            </ContainedHeader>
            <ContainedListItems>
              <ActionTimeline />
            </ContainedListItems>
          </ContainedList>
        </div>
      </div>
    </div>
  );
};

export default Actions;

const CreateQuoteModal = () => {
  return (
    <>
      <Modal onOpenChange={() => {}}>
        <ModalTrigger>
          <div> Create Quote</div>
        </ModalTrigger>
        <ModalContent
          description="Description"
          hasCloseIcon
          onOpenChange={() => {}}
          size="small"
          title="Did you you call me?"
          variant="default"
        >
          <ModalClose>
            <div className="s-flex s-justify-end">
              <div>
                <Button
                  onClick={() => {}}
                  size="regular"
                  styleType="default"
                  variant="primary"
                >
                  Yes, I did
                </Button>
              </div>
            </div>
          </ModalClose>
        </ModalContent>
      </Modal>
    </>
  );
};
