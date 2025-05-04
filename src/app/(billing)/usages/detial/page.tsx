"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Link,
  SHeader,
  SelectItem,
  SelectMenu,
  Tabs,
  TabsList,
} from "cb-sting-react-ts";
import React from "react";
import { UsageSummary } from "../_components/UsageSummary";
import { RevenueChart } from "./_components/RevenueChart";
import { TotalUsageChart } from "./_components/TotalUsageChart";

const statsData = [
  {
    title: "Total usage",
    value: "9,822",
    unit: "conversations",
    // change: "23.5%",
    changeType: "positive",
  },
  {
    title: "Used versus Allocated usage",
    value: "2,400 / 2,400",
    unit: "conversations",
  },
  {
    title: "Overage usage",
    value: "7,422",
    unit: "",
    // change: "13.5%",
    changeType: "positive",
  },
];

const UsageDetailPage = () => {
  const [eventsState, setEventsState] = React.useState<
    "computed_units" | "gas_manager_policies"
  >("computed_units");
  return (
    <div>
      {/* 

     <HeaderCard 
      title="Zap Professional" 
      subTitle="By creating metered features, you can calculate usage from your event data to set the foundation for your usage-based billing."
      
      /> */}

      <div className="p-large lg:p-xlarge xl:p-xxlarge space-y-xlarge xl:space-y-xlarge">
        <SHeader
          backAction={
            <Link href="/subscriptions/34YhprZzflXo7UVy">
              <Button size="small" styleType="text" variant="neutral">
                <ArrowLeftIcon />
                John Doe
              </Button>
            </Link>
          }
          title="Usage details"
          type="page"
        />

        {/* Tabs */}
        <div>
          {/* <div className='flex  border-b border-neutral-100'>
          <div className='px-regular py-small bg-primary-50 border-b border-primary-400 hover:bg-neutral-50 cursor-pointer'>Processed events</div>
          <div className='px-regular py-small bg-primary-50 border-b border-primary-400 hover:bg-neutral-50 cursor-pointer'>Failed events</div>
        </div> */}

          {/* <Tabs
            defaultTabID="computed_units"
            onValueChange={(
              value: "computed_units" | "gas_manager_policies"
            ) => {
              setEventsState(value);
            }}
            tabId="computed_units"
          >
            <TabsList
              size="regular"
              tabStyle="lined"
              tabs={[
                {
                  id: "computed_units",
                  title: "Compute Units",
                },
                {
                  id: "gas_manager_policies",
                  title: "Gas Manager Policies",
                },
              ]}
              variant="horizontal"
            />
          </Tabs> */}
        </div>
        <div className="space-y-regular">
          <FiltersBlock />
          {/* <FilterByDuration eventsState={eventsState} customAction={<Button size="regular" variant="neutral" styleType="outline" >View associated events </Button>} enableConditionFilter={false} onClickFilter={()=>{}} onCustomDuration={(start,end) => {}} eventsCount={100}/> */}
        </div>
        <div className="space-y-regular">
          <UsageSummary statsData={statsData} />
        </div>
        {/* Total Usage */}
        <div className="col-span-12 space-y-4">
          <Card className="!h-96 ">
            <SHeader
              type="card"
              title="Usage trend"
              actionElements={
                <>
                  <SelectMenu
                    label="inline"
                    labelText="View: "
                    placeholder=""
                    size="regular"
                    value="val1"
                    onValueChange={(value: string) => {}}
                  >
                    <SelectItem value="val1"> Total usage </SelectItem>
                  </SelectMenu>
                  <SelectMenu
                    label="hidden"
                    labelText="View by: "
                    placeholder=""
                    size="regular"
                    value="val1"
                    onValueChange={(value: string) => {}}
                  >
                    <SelectItem value="val1"> Compare </SelectItem>
                  </SelectMenu>
                  <SelectMenu
                    label="hidden"
                    labelText="View by: "
                    placeholder=""
                    size="regular"
                    value="val1"
                    onValueChange={(value: string) => {}}
                  >
                    <SelectItem value="val1"> Periodic view </SelectItem>
                  </SelectMenu>
                </>
              }
            />
            <TotalUsageChart interval={0} />
          </Card>
        </div>
        {/* Total revenue */}
        <div className="col-span-12 space-y-4">
          <Card className="!h-96">
            <SHeader
              type="card"
              title="Total revenue"
              actionElements={
                <>
                  <SelectMenu
                    label="inline"
                    labelText="View: "
                    placeholder=""
                    size="regular"
                    value="val1"
                    onValueChange={(value: string) => {}}
                  >
                    <SelectItem value="val1"> Total revenue </SelectItem>
                  </SelectMenu>
                  <SelectMenu
                    label="hidden"
                    labelText="View by: "
                    placeholder=""
                    size="regular"
                    value="val1"
                    onValueChange={(value: string) => {}}
                  >
                    <SelectItem value="val1"> Compare </SelectItem>
                    <SelectItem value="val2"> Last 2 month </SelectItem>
                    <SelectItem value="val3"> Last 3 month </SelectItem>
                  </SelectMenu>
                </>
              }
            />
            <RevenueChart interval={13} mode="single" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsageDetailPage;
const FiltersBlock = () => {
  return (
    <>
      <div className="flex flex-col gap-regular relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-regular">
            <ul className="flex w-fit flex-shrink divide-x divide-neutral-100 mb-0">
              <li
                className={`py-small  cursor-pointer border   bg-white px-large  rounded-l border-r-0  `}
              >
                <Button variant="secondary"> 1 Month</Button>
              </li>
              <li
                className={`py-small  cursor-pointer border   bg-white px-large   border-r-0  `}
              >
                <Button variant="secondary"> 3 Months</Button>
              </li>
              <li
                className={`py-small  cursor-pointer border   bg-white px-large   border-r-0  `}
              >
                <Button variant="secondary"> 6 Months</Button>
              </li>
              <li
                className={`py-small  cursor-pointer border   bg-white px-large   border-r-0  `}
              >
                <Button variant="secondary"> 9 Months</Button>
              </li>
              <li
                className={`py-small  cursor-pointer border   bg-white px-large   border-r-0  `}
              >
                <Button variant="secondary"> 12 Months</Button>
              </li>
              <li
                className={`py-small  cursor-pointer border  bg-primary-50 px-large font-semibold border-primary-400  rounded-r border-l-0  `}
              >
                <Button variant="secondary"> Custom</Button>
              </li>
            </ul>
            <Button
              variant="primary"
              styleType="outline"
              className="normal-case"
            >
              View associated events
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
