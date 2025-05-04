import {
  EnvelopeIcon,
  PhoneIcon,
  PlusIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  ContainedList,
  ContainedListItems,
  ContainedListLabel,
  ContainedListValue,
  ContainedListItem,
  OverFlowMenu,
} from "cb-sting-react-ts";
import React from "react";

type Props = {
  billingAddresses: any;
};

const BillingaddressInfo = ({ billingAddresses }: Props) => {
  return (
    <div>
      <Card>
        <Card.Header className="uppercase" title="billing address" />
        <div className="grid grid-cols-2 gap-4 content-stretch">
          {billingAddresses.map((address) => {
            return (
              <Card>
                <Card.Header
                  title={address.firstName + " " + address.lastName}
                  actionElement={
                    <div className="flex items-center gap-2">
                      <span>
                        <Badge
                          variant={"primary"}
                          style={{ fontWeight: "normal" }}
                        >
                          Primary
                        </Badge>
                      </span>
                      <span>
                        <OverFlowMenu
                          align="start"
                          launchIcon={<EllipsisVerticalIcon />}
                          menuGroups={[
                            {
                              items: [
                                {
                                  action: () => {},
                                  label: "Edit",
                                  value: "li01",
                                },
                                {
                                  label: "Delete",
                                  value: "li03",
                                },
                              ],
                              title: "Your billing address has been updated.",
                            },
                          ]}
                          position="left"
                          variant="om-basic"
                        />
                      </span>
                    </div>
                  }
                />

                <div className="space-y-1 divide-y divide-neutral-50">
                  <div className="flex gap-4 items-center pt-2 pb-1">
                    <span className="h-4 w-4">
                      <EnvelopeIcon className="h-4 w-4 text-neutral-500" />
                    </span>
                    <span className="leading-5">
                      {address.addressLine1}, {address.addressLine2} ,{" "}
                      {address.addressLine3}, {address.city},{address.zip},{" "}
                      {address.country}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center pt-2 pb-1">
                    <PhoneIcon className="h-4 w-4 text-neutral-500" />
                    <span>{address.phone}</span>
                  </div>
                  <div className="flex gap-4 items-center pt-2 pb-1">
                    <EnvelopeIcon className="h-4 w-4 text-neutral-500" />
                    <span>{address.email}</span>
                  </div>
                </div>
              </Card>
            );
          })}
          <AdditionalBillingAddress />
        </div>
      </Card>
    </div>
  );
};
export const AdditionalBillingAddress = () => {
  return (
    <>
      <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex items-stretch">
        <div className="self-center text-center w-full">
          <Button variant={"neutral"} styleType={"text"}>
            <PlusIcon /> Add Billing Contact
          </Button>
          <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
            To send invoices, payment, and subscription-related emails.
          </div>
        </div>
      </div>
    </>
  );
};
export default BillingaddressInfo;
