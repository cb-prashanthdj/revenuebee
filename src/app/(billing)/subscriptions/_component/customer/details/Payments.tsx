import {
  CreditCardIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
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
// import { CardHeader } from "../../ui/Header";
import React from "react";
import { CardHeader } from "../../Header";

type Props = {
  paymentTabData: any;
};

const PaymentInfo = ({ paymentTabData }: Props) => {
  const transformedArrays = paymentTabData.map((item) =>
    Object.entries(item).map(([key, value]) => ({
      label: key === "id" ? "ID" : key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
    }))
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Card for the first payment method */}
        <Card>
          <CardHeader title="Credit Card">
            <div className="flex items-center gap-2">
              <span>
                <Badge variant={"primary"} style={{ fontWeight: "normal" }}>
                  Primary
                </Badge>
              </span>
              <span>
                {/* @ts-ignore  */}
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
                          label: "Disable",
                          value: "li02",
                        },
                        {
                          label: "Delete",
                          value: "li03",
                        },
                      ],
                      title:
                        "Your subscription has been upgraded to Superior plan.",
                    },
                  ]}
                  position="left"
                  variant="om-basic"
                />
              </span>
            </div>
          </CardHeader>
          <div className=" space-y-3 ">
            <div className=" space-y-4">
              <div className="w-full">
                <div>
                  <div className="py-2">
                    <h2 className="h5 leading-none">
                      MasterCard **** **** **** 1111
                    </h2>
                    <span className="text-sm font-normal text-neutral-500">
                      via Chargbee Test Gateway
                    </span>
                  </div>
                  {/* <ContainedList
                    dataSource={transformedArrays[0]}
                    description=""
                    header=""
                    divider
                    labels="rows"
                    padding="small"
                    variant="basic"
                  /> */}

                  <ContainedList
                    showSeperator
                    labels="rows"
                    padding="small"
                    variant="basic"
                  >
                    <ContainedListItem>
                      {transformedArrays[0].map((item) => {
                        return (
                          <ContainedListItems key={item.label}>
                            <ContainedListLabel>
                              {item.label}
                            </ContainedListLabel>
                            <ContainedListValue>
                              {item.value}
                            </ContainedListValue>
                          </ContainedListItems>
                        );
                      })}
                    </ContainedListItem>
                  </ContainedList>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Card for the second payment method */}
        <Card>
          <CardHeader title="Credit Card">
            <div className="flex gap-2">
              {/* <span><Badge variant={"neutral"} style={{ fontWeight: 'normal' }}>Secondary</Badge></span> */}
              <span>
                {/* @ts-ignore  */}
                <OverFlowMenu
                  align="start"
                  launchIcon={<EllipsisVerticalIcon />}
                  menuGroups={[
                    {
                      items: [
                        {
                          action: () => {},
                          label: "Make Primary",
                          value: "li01",
                        },
                        {
                          action: () => {},
                          label: "Edit",
                          value: "li01",
                        },
                        {
                          label: "Disable",
                          value: "li02",
                        },
                        {
                          label: "Delete",
                          value: "li03",
                        },
                      ],
                      title:
                        "Your subscription has been upgraded to Superior plan.",
                    },
                  ]}
                  position="left"
                  variant="om-basic"
                />
              </span>
            </div>
          </CardHeader>
          <div className=" space-y-3 ">
            <div className=" space-y-4">
              <div className="w-full">
                <div>
                  <div className="py-2">
                    <h2 className="h5 leading-none">
                      MasterCard **** **** **** 4444
                    </h2>
                    <span className="text-sm font-normal text-neutral-500">
                      via Chargbee Test Gateway
                    </span>
                  </div>

                  <ContainedList labels="block" padding="small" variant="basic">
                    <ContainedListItems>
                      {transformedArrays[1].map((item) => {
                        return (
                          <ContainedListItem key={item.label}>
                            <ContainedListLabel>
                              {item.label}
                            </ContainedListLabel>
                            <ContainedListValue>
                              {item.value}
                            </ContainedListValue>
                          </ContainedListItem>
                        );
                      })}
                    </ContainedListItems>
                  </ContainedList>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center border border-dashed border-neutral-100 rounded h-full p-8">
          <div className="flex gap-x-4 justify-center w-full">
            <Button variant={"neutral"} styleType={"text"}>
              <PlusIcon /> New Payment Method
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Payment Terms">
            <Button variant={"neutral"} size={"regular"} styleType={"text"}>
              <PencilIcon />
            </Button>
          </CardHeader>
          <div className="space-y-2">
            <h6>Net 15 (Site Default)</h6>
            <p className="text-neutral-600 leading-5">
              Applies only when customer’s auto-collection is off. All invoices
              will be generated as Posted.
            </p>
          </div>
        </Card>
      </div>{" "}
      {/* Other content */}
    </div>
  );
};

export default PaymentInfo;
