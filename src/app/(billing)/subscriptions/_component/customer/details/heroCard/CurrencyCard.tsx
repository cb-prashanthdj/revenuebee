import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  Tooltip,
} from "cb-sting-react-ts";
import React from "react";
// import { useCaseSwitcher } from "@/app/store/UseCaseStore";
import {} from "cb-sting-react-ts";

const cardDetails1 = [
  {
    amount: "$ 4,738.00",
    currency: "USD",
    equivalent: "SR 100.50",
    equivalentCurrency: "SAR",
    description: "Amount due",
    variant: "danger",
    tooltipContent: [
      { amount: "£ 72,837.00", currency: "GBP" },
      { amount: "$ 2,837.00", currency: "AUD" },
    ],
    tooltipText: "+ 2 more",
  },
  {
    amount: "$ 234.00",
    currency: "USD",
    equivalent: "€ 1.400,00",
    equivalentCurrency: "EUR",
    description: "Upcoming payments on 01-Oct-2024",
    variant: "neutral",
    tooltipContent: [
      { amount: "£ 72,837.00", currency: "GBP" },
      { amount: "$ 2,837.00", currency: "AUD" },
    ],
    tooltipText: "+ 2 more",
  },
  {
    amount: "$ 234.00",
    currency: "USD",
    description: "Unbilled charges not invoiced yet",
    variant: "neutral",
  },
  {
    amount: "$ 234.00",
    currency: "USD",
    description: "Promotional credits",
    variant: "neutral",
  },
  {
    amount: "$ 234.00",
    currency: "USD",
    equivalent: "€ 1.400,00",
    equivalentCurrency: "EUR",
    description: "Refundable credits",
    variant: "neutral",
    tooltipContent: [
      { amount: "£ 72,837.00", currency: "GBP" },
      { amount: "$ 2,837.00", currency: "AUD" },
    ],
    tooltipText: "+ 2 more",
  },
  {
    amount: "$ 23.00",
    currency: "USD",
    description: "Excess payments",
    variant: "neutral",
  },
];

const cardData = [
  {
    amount: "$ 4,738.00",
    currency: "USD",
    description: "Total amount due",
    variant: "danger",
  },
  {
    amount: "$ 234.00",
    currency: "USD",
    description: "Upcoming payments on 01-Oct-2024",
    variant: "neutral",
  },
  {
    amount: "$ 234.00",
    currency: "USD",
    description: "Upcoming payments on 01-Oct-2024",
    variant: "neutral",
  },
  {
    amount: "SR 100.50",
    currency: "SAR",
    description: "Unbilled charges not invoiced yet",
    variant: "neutral",
  },
  {
    amount: "SR 200.50",
    currency: "SAR",
    description: "Unbilled charges not invoiced yet",
    variant: "neutral",
  },
  {
    amount: "SR 200.50",
    currency: "SAR",
    description: "Unbilled charges not invoiced yet",
    variant: "neutral",
  },
  {
    amount: "₹ 5,000",
    currency: "INR",
    description: "Total amount due",
    variant: "danger",
  },
  {
    amount: "₹ 1,200",
    currency: "INR",
    description: "Upcoming payments on 15-Nov-2024",
    variant: "neutral",
  },
  {
    amount: "€ 3,500",
    currency: "EUR",
    description: "Total amount due",
    variant: "danger",
  },
  {
    amount: "€ 500",
    currency: "EUR",
    description: "Upcoming payments on 25-Dec-2024",
    variant: "neutral",
  },
];

const CurrencyCard1 = () => {
  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
        {cardDetails1.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between ${
              card.variant === "danger" ? "bg-red-50" : "bg-neutral-25"
            } rounded-md p-4 leading-5 text-neutral-500 space-y-2`}
          >
            <div>
              <span
                className={`text-xl font-semibold ${
                  card.variant === "danger"
                    ? "text-red-500"
                    : "text-neutral-700"
                } block mb-1 space-y-1`}
              >
                <span className="whitespace-nowrap block mb-1">
                  {card.amount}{" "}
                  <span className="text-sm font-normal">{card.currency}</span>
                </span>
                {card.equivalent && (
                  <span className="whitespace-nowrap block mb-1">
                    {card.equivalent}{" "}
                    <span className="text-sm font-normal">
                      {card.equivalentCurrency}
                    </span>
                  </span>
                )}
                {card.tooltipContent && (
                  <Tooltip
                    color="light"
                    placement="bottom"
                    contentElement={
                      <>
                        <div
                          className={`flex flex-col text-lg font-semibold  ${
                            card.variant === "danger"
                              ? "text-red-500"
                              : "text-neutral-700"
                          }`}
                        >
                          {card.tooltipContent.map((content, i) => (
                            <span key={i}>
                              {content.amount}{" "}
                              <span className="text-xs font-normal">
                                {content.currency}
                              </span>
                            </span>
                          ))}
                        </div>
                      </>
                    }
                    width="small"
                  >
                    <span className="text-sm cursor-pointer font-semibold">
                      {card.tooltipText}
                    </span>
                  </Tooltip>
                )}
              </span>
              {card.description}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {}}
                size="small"
                styleType="text"
                variant={card.variant}
              >
                View details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CurrencyCard2 = () => {
  const tabs = [
    { id: "tab1", title: "USD" },
    { id: "tab2", title: "EUR" },
    { id: "tab3", title: "INR" },
    { id: "tab4", title: "SAR" },
  ];

  const getFilteredCardData = (currency) => {
    return cardData.filter((card) => !currency || card.currency === currency);
  };

  return (
    <div>
      <Tabs defaultTabID="tab1" onValueChange={() => {}} tabId="tab1">
        <TabsList
          size="regular"
          tabStyle="lined"
          tabs={tabs}
          variant="horizontal"
          width="full"
          className="flex justify-between"
        />
        {tabs.map((tab) => (
          <TabsContent key={tab.id} tabId={tab.id} onValueChange={() => {}}>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 py-4">
              {getFilteredCardData(tab.title).map((card, index) => (
                <CardContent
                  key={index}
                  {...card}
                  amount={card.amount}
                  currency={card.currency}
                  description={card.description}
                  variant={card.variant}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const CardContent = ({ amount, currency, description, variant }) => (
  <div
    className={`flex flex-col justify-between bg-${
      variant === "danger" ? "red-50" : "neutral-25"
    } rounded-md p-4 leading-5 text-neutral-500 space-y-2`}
  >
    <div>
      <span
        className={`text-xl font-semibold ${
          variant === "danger" ? "text-red-500" : "text-neutral-700"
        } block mb-1 space-y-1`}
      >
        <span className="whitespace-nowrap block ">
          {amount}
          <span className="text-sm font-normal">{currency}</span>
        </span>
      </span>
      {description}
    </div>
    <div className="flex justify-end">
      <Button size="small" styleType="text" variant={variant}>
        {variant === "danger" ? "View details" : "View Breakdown"}
      </Button>
    </div>
  </div>
);

export const CurrencyCard3 = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        <div className="md:flex justify-between bg-red-50 rounded-md px-4 py-3 leading-5 text-neutral-500 space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4 w-full">
            <span className="text-lg font-semibold text-red-500 w-1/4">
              Upcoming Payments
            </span>
            <div className=" flex w-full justify-between">
              <div className="text-lg font-semibold text-red-500 flex items-center gap-x-4">
                <span>
                  {" "}
                  $999.00 <span className="text-sm font-normal">USD</span>
                </span>
                <span>
                  {" "}
                  £72,837.00 <span className="text-sm font-normal">GBP</span>
                </span>
                <span className="text-sm font-normal">
                  + 3 more on 01-Oct-2024
                </span>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {}}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex justify-between bg-neutral-25 rounded-md px-4 py-3 leading-5 text-neutral-500 space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4 w-full">
            <span className="text-lg font-semibold text-neutral-700 w-1/4">
              Upcoming Payments
            </span>
            <div className=" flex w-full justify-between">
              <div className="text-lg font-semibold text-neutral-700 flex items-center gap-x-4">
                <span>
                  {" "}
                  $999.00 <span className="text-sm font-normal">USD</span>
                </span>
                <span>
                  {" "}
                  £72,837.00 <span className="text-sm font-normal">GBP</span>
                </span>

                <span className="text-sm font-normal">
                  + 3 more on 01-Oct-2024
                </span>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {}}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex justify-between bg-neutral-25 rounded-md px-4 py-3 leading-5 text-neutral-500 space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4 w-full">
            <span className="text-lg font-semibold text-neutral-700 w-1/4">
              Unbilled Charges
            </span>
            <div className=" flex w-full justify-between">
              <div className="text-lg font-semibold text-neutral-700 flex items-center gap-x-4">
                <span>
                  {" "}
                  $999.00 <span className="text-sm font-normal">USD</span>
                </span>
                <span>
                  {" "}
                  £72,837.00 <span className="text-sm font-normal">GBP</span>
                </span>
                <span>
                  {" "}
                  € 1.400,00 <span className="text-sm font-normal">EUR</span>
                </span>
                <span>
                  {" "}
                  € 1.400,00 <span className="text-sm font-normal">EUR</span>
                </span>
                <span className="text-sm font-normal">
                  + 3 more on 01-Oct-2024
                </span>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {}}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex justify-between bg-neutral-25 rounded-md px-4 py-3 leading-5 text-neutral-500 space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4 w-full">
            <span className="text-lg font-semibold text-neutral-700 w-1/4">
              Promotional Credits
            </span>
            <div className=" flex w-full justify-between">
              <div className="text-lg font-semibold text-neutral-700 flex items-center gap-x-4">
                <span>
                  {" "}
                  $999.00 <span className="text-sm font-normal">USD</span>
                </span>
                <span>
                  {" "}
                  £72,837.00 <span className="text-sm font-normal">GBP</span>
                </span>
                <span>
                  {" "}
                  € 1.400,00 <span className="text-sm font-normal">EUR</span>
                </span>

                <span className="text-sm font-normal">
                  + 1 more on 01-Oct-2024
                </span>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {}}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex justify-between bg-neutral-25 rounded-md px-4 py-3 leading-5 text-neutral-500 space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4 w-full">
            <span className="text-lg font-semibold text-neutral-700 w-1/4">
              Excess Payments
            </span>
            <div className=" flex w-full justify-between">
              <div className="text-lg font-semibold text-neutral-700 flex items-center gap-x-4">
                <span>
                  {" "}
                  $999.00 <span className="text-sm font-normal">USD</span>
                </span>
                <span>
                  {" "}
                  £72,837.00 <span className="text-sm font-normal">GBP</span>
                </span>

                <span className="text-sm font-normal">
                  + 1 more on 01-Oct-2024
                </span>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {}}
                  size="small"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CurrencyCard4 = () => {
  return (
    <table className="table">
      <thead className="table-header">
        <tr className="table-row">
          <th className="table-row-header-cell "> </th>
          <th className="table-row-header-cell w-0 whitespace-nowrap">USD</th>
          <th className="table-row-header-cell ">EUR</th>
          <th className="table-row-header-cell ">INR </th>
          <th className="table-row-header-cell ">SAR </th>
          <th className="table-row-header-cell "> </th>
        </tr>
      </thead>
      <tbody className="table-body ">
        <tr className="table-row text-red-500">
          <td className="w-1/12 bg-red-50">Amount due</td>
          <td className=" w-1/12 ">$ 100</td>
          <td className=" w-1/12">€ 438.48 </td>
          <td className="w-1/12">₹ 34,000</td>
          <td className="w-1/12">34,000 SAR</td>
          <td className="w-1/12">
            <div className=" flex justify-end">
              <Button
                onClick={() => {}}
                size="small"
                styleType="text"
                variant="neutral"
              >
                View details
              </Button>
            </div>
          </td>
        </tr>

        <tr className="table-row">
          <td className="w-1/12 bg-neutral-50">
            Upcoming payments
            <span className="text-sm font-normal">on 01-Oct-2024</span>
          </td>
          <td className=" w-1/12">$ 120</td>
          <td className=" w-1/12">€ 438.48 </td>
          <td className="w-1/12">₹ 34,000</td>
          <td className="w-1/12">34,000 SAR</td>
          <td className="w-1/12">
            <div className=" flex justify-end">
              <Button
                onClick={() => {}}
                size="small"
                styleType="text"
                variant="neutral"
              >
                View details
              </Button>
            </div>
          </td>
        </tr>

        <tr className="table-row">
          <td className="w-1/12 bg-neutral-50">Unbilled charges</td>
          <td className=" w-1/12">$ 100</td>
          <td className=" w-1/12"> </td>
          <td className="w-1/12">₹ 34,000</td>
          <td className="w-1/12">34,000 SAR</td>
          <td className="w-1/12">
            <div className=" flex justify-end">
              <Button
                onClick={() => {}}
                size="small"
                styleType="text"
                variant="neutral"
              >
                View details
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const currencyCardComponents = {
  uc4_a1: CurrencyCard1,
  uc4_a2: CurrencyCard2,
  uc4_a3: CurrencyCard3,
  uc4_a4: CurrencyCard4,
};

export const CurrencyCard = () => {
  // const { selectedUseCase, selectedUseCaseItem } = useCaseSwitcher();

  const key = "uc4_a1";

  const SelectedCurrencyCard = currencyCardComponents[key];

  return (
    <>{SelectedCurrencyCard ? <SelectedCurrencyCard /> : <CurrencyCard1 />}</>
  );
};
