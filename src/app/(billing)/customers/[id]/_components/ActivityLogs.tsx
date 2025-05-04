import { Badge, Button, Card } from "cb-sting-react-ts";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const ActivityLogs = () => {
  return (
    <div>
      <Card>
        <Card.Header title="Activity log" className="uppercase" />
        <div className=" ">
          <div className="divide-y divide-neutral-100">
            <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
              <div className="flex md:flex-none md:w-40 lg:w-48">
                <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
                  <div className="text-sm text-lightest leading-5">
                    <div>
                      <span className="text-dark font-medium whitespace-nowrap">
                        19-Aug-2024
                      </span>{" "}
                      17:27
                    </div>
                  </div>
                  <div>
                    <Badge variant="neutral">Scheduled activity</Badge>
                  </div>
                </div>
              </div>
              <ul className="grow space-y-regular !list-disc pl-large">
                <li className="leading-5">
                  <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                    Subscription
                  </a>{" "}
                  modified.
                </li>
                <li className="leading-5">
                  <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                    Invoice
                  </a>{" "}
                  of <span className="font-semibold text-darkest">$21.00</span>{" "}
                  generated and marked as payment due.{" "}
                  <span className="font-semibold text-darkest">$21.00</span> to
                  be collected.
                </li>
              </ul>
              <div className="flex justify-end md:w-min">
                <Button
                  //   onClick={toggleDrawer}
                  size="regular"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
              <div className="flex md:flex-none md:w-40 lg:w-48">
                <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
                  <div className="text-sm text-lightest leading-5">
                    <div>
                      <span className="text-dark font-medium whitespace-nowrap">
                        12-Aug-2024
                      </span>{" "}
                      12:36
                    </div>
                    <div className="truncate">mathumitha@chargebee.com</div>
                  </div>
                  <div>
                    <Badge variant="neutral">Via Chargebee interface</Badge>
                  </div>
                </div>
              </div>
              <ul className="grow space-y-regular !list-disc pl-large">
                <li className="leading-5">
                  Billing address modified for{" "}
                  <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                    customer
                  </a>
                </li>
              </ul>
              <div className="flex justify-end md:w-min">
                <Button
                  //   onClick={toggleDrawer}
                  size="regular"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
              <div className="flex md:flex-none md:w-40 lg:w-48">
                <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
                  <div className="text-sm text-lightest leading-5">
                    <div>
                      <span className="text-dark font-medium whitespace-nowrap">
                        09 Aug 2024
                      </span>{" "}
                      00:00
                    </div>
                  </div>
                  <div>
                    <Badge variant="neutral">Scheduled activity</Badge>
                  </div>
                </div>
              </div>
              <ul className="grow space-y-regular !list-disc pl-large">
                <li className="leading-5">
                  <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                    Subscription
                  </a>{" "}
                  modified.
                </li>
                <li className="leading-5">
                  Draft{" "}
                  <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                    Invoice
                  </a>{" "}
                  of <span className="font-semibold text-darkest">$110.00</span>{" "}
                  generated and marked as pending.
                </li>
              </ul>
              <div className="flex justify-end md:w-min">
                <Button
                  //   onClick={toggleDrawer}
                  size="regular"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-regular md:gap-xlarge xl:gap-xxlarge p-large hover:bg-neutral-25">
              <div className="flex md:flex-none md:w-40 lg:w-48">
                <div className="flex md:flex-col justify-between md:justify-normal w-full md:space-y-small md:truncate">
                  <div className="text-sm text-lightest leading-5">
                    <div>
                      <span className="text-dark font-medium whitespace-nowrap">
                        01 Aug 2024
                      </span>{" "}
                      15:23
                    </div>
                    <div className="truncate">akhtar.sayyed@chargebee.com</div>
                  </div>
                  <div>
                    <Badge variant="neutral">Via Chargebee interface</Badge>
                  </div>
                </div>
              </div>
              <ul className="grow space-y-regular !list-disc pl-large">
                <li className="leading-5">
                  Active{" "}
                  <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                    subscription
                  </a>{" "}
                  created for unit_plan1720163957578_usd_month plan.
                </li>
                <li className="leading-5">
                  <a className="text-primary-600 hover:text-primary-700 cursor-pointer underline">
                    Invoice
                  </a>{" "}
                  of{" "}
                  <span className="font-semibold text-darkest">$4,550.00</span>{" "}
                  generated and marked as payment due.{" "}
                  <span className="font-semibold text-darkest">$4,550.00</span>{" "}
                  to be collected.
                </li>
              </ul>
              <div className="flex justify-end md:w-min">
                <Button
                  //   onClick={toggleDrawer}
                  size="regular"
                  styleType="text"
                  variant="neutral"
                >
                  View details
                </Button>
              </div>
            </div>
          </div>

          {/* Show more */}
          <div className="pt-large flex gap-4">
            <Button
              fullWidth
              variant={"neutral"}
              styleType={"text"}
              size={"regular"}
            >
              <ChevronDownIcon /> Show more
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
