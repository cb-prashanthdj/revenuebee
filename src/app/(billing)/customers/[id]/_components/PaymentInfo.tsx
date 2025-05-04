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
import React from "react";

type Props = {
  paymentMethods: any;
};

const PaymentInfo = ({ paymentMethods }: Props) => {
  // const transformedArrays = paymentMethods.map((item) =>
  //   Object.entries(item).map(([key, value]) => ({
  //     label: key === "id" ? "ID" : key.charAt(0).toUpperCase() + key.slice(1),
  //     value: value,
  //   }))
  // );

  return (
    <div>
      <Card>
        <Card.Header className="uppercase" title="payment methods" />
        <div className="grid grid-cols-2 gap-4 content-stretch">
          {paymentMethods.map((payment) => {
            return (
              <Card>
                <div className="flex justify-between items-center -mt-2 -mr-2 mb-3 h-10">
                  <div className="flex gap-2">
                    <CardTypeSvg type={payment.cardType} />
                  </div>
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
                </div>
                <div className="">
                  <div className="text-xl">
                    **** **** **** {payment.cardNumber.slice(-4)}
                  </div>
                  <div className="flex items-center gap-4 py-2 divide-x divide-neutral-50">
                    <span>
                      <span className="text-neutral-900 font-semibold mr-1">
                        Exp:
                      </span>
                      <span className="whitespace-nowrap">
                        {payment.expiryDate}
                      </span>
                    </span>
                    <span className="pl-4 leading-4">
                      {payment.cardHolderName}
                    </span>
                  </div>
                  <div className="flex gap-4 border-t border-neutral-50 pt-2 divide-x divide-neutral-50">
                    <span className="leading-4">
                      <span className="text-neutral-900 font-semibold mr-1">
                        ID:
                      </span>
                      tok_169lhFTlflwcZP6x
                    </span>
                    <span className="pl-4 leading-4">
                      Chargebee Test Gateway
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
          <AdditionalPaymentMethod />
        </div>
      </Card>
    </div>
  );
};
export const AdditionalPaymentMethod = () => {
  return (
    <>
      <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex items-stretch">
        <div className="self-center text-center w-full">
          <Button variant={"neutral"} styleType={"text"}>
            <PlusIcon /> Add Payment Method
          </Button>
          <div className="max-w-lg mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
            To increase customer convenience, ensure a smooth checkout
            experience, and reduces involuntary churn.
          </div>
        </div>
      </div>
    </>
  );
};
const CardTypeSvg = ({ type }) => {
  const cardTypeSvgMap = {
    Visa: (
      <span className="size-12">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="visa">
          <path
            fill="#191E6E"
            d="M13.967 13.837c-.766 0-1.186-.105-1.831-.37l-.239-.109-.271 1.575c.466.192 1.306.357 2.175.37 2.041 0 3.375-.947 3.391-2.404.016-.801-.51-1.409-1.621-1.91-.674-.325-1.094-.543-1.094-.873 0-.292.359-.603 1.109-.603a3.602 3.602 0 0 1 1.455.269l.18.08.271-1.522-.047.01a5.053 5.053 0 0 0-1.74-.297c-1.92 0-3.275.954-3.285 2.321-.012 1.005.964 1.571 1.701 1.908.757.345 1.01.562 1.008.872-.005.471-.605.683-1.162.683zm8.461-5.655h-1.5c-.467 0-.816.125-1.021.583l-2.885 6.44h2.041l.408-1.054 2.49.002c.061.246.24 1.052.24 1.052H24l-1.572-7.023zM20.03 12.71l.774-1.963c-.01.02.16-.406.258-.67l.133.606.449 2.027H20.03zM8.444 15.149h1.944l1.215-7.026H9.66v-.002zM4.923 12.971l-.202-.976v.003l-.682-3.226c-.117-.447-.459-.579-.883-.595H.025L0 8.325c.705.165 1.34.404 1.908.697a.392.392 0 0 1 .18.234l1.68 5.939h2.054l3.061-7.013H6.824l-1.901 4.789z"
          ></path>
        </svg>
      </span>
    ),
    MasterCard: (
      <span className="size-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="mastercard"
        >
          <path
            fill="#FF5F00"
            d="M15.245 17.831h-6.49V6.168h6.49v11.663z"
          ></path>
          <path
            fill="#EB001B"
            d="M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999 5.831A7.406 7.406 0 0 1 9.167 12z"
          ></path>
          <path
            fill="#F79E1B"
            d="M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527 12 6.169A7.417 7.417 0 0 1 24 12z"
          ></path>
        </svg>
      </span>
    ),
  };
  return cardTypeSvgMap[type];
};
export default PaymentInfo;
