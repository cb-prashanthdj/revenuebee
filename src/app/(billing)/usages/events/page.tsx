"use client";

import {
  ArrowPathIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Header,
  SHeader,
  Tabs,
  TabsList,
} from "cb-sting-react-ts";
import Link from "next/link";
import React, { useState } from "react";
import { FilterByDuration } from "../_components/FilterByDuration";
import { UsageEventTable } from "../_components/UsageEventTable";
import { ImportExcelModal } from "../_components/ImportExcelModal";
import { ExcelModal } from "../_components/ExcelModal";
import Image from "next/image";
import cbLoadingRed from "@/app/assets/img/cb-loading-red.gif";

const durationFilter = ["30mins", "1hr", "12hrs", "24hrs", "custom"];

const UsageEventsPage = () => {
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [importedFile, setImportedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handlePreviewEvents = () => {
    setShowExcelImport(false);
    setShowExcelPreview(true);
    // setImportedFile(null)
  };
  const [selectedDuration, setSelectedDuration] = React.useState(
    durationFilter[0]
  );
  const [refreshState, setRefreshState] = React.useState("");
  const [customDuration, setCustomDuration] = React.useState<{
    start: Date;
    end: Date;
  }>();
  const [eventsState, setEventsState] = React.useState<"failed" | "processed">(
    "processed"
  );
  const [eventsCount, setEventsCount] = useState(0);

  const handleDurationFilter = (duration: { label: string; value: string }) => {
    setSelectedDuration(duration.value);
    // You can do additional operations with the duration here
    console.log("Selected duration in parent:", duration);
  };
  const handleReset = () => {
    // setImportedFile(null);
    setShowExcelPreview(false);
    setShowExcelImport(false);
  };
  const onCompleteImport = () => {
    setShowExcelPreview(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      // router.push("/usages/events");
    }, 2000);
  };
  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Image src={cbLoadingRed} width={64} height={64} alt="Loading" />
          {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div> */}
        </div>
      )}
      <Card
        depth="raised"
        background="neutral"
        className="!rounded-none !px-xxlarge"
      >
        <SHeader
          title="Your usage events have been imported. Now, let’s create metered features."
          description="By creating metered features, you can calculate usage from your event data to set the foundation for your usage-based billing."
          actionElements={
            <div className="flex items-center">
              <Link className="m-auto" href={"/usages/metrics/create"} passHref>
                <Button size="regular">
                  {" "}
                  Create Metered Feature <ArrowRightIcon className="size-4" />
                </Button>
              </Link>
            </div>
          }
          type="card"
        />
      </Card>
      <div className="p-large lg:p-xlarge xl:p-xxlarge space-y-xlarge xl:space-y-xlarge">
        <Header>
          <Header.Content>
            <div className="s-h2">Usage events </div>
          </Header.Content>
          <Header.Actions>
            <div className="pt-1">Updated 1 min ago</div>
            <Button
              variant="neutral"
              styleType="outline"
              onClick={
                () => setRefreshState(Math.random().toString())
                // setSelectedDuration(
                //   durationFilter[Math.floor(Math.random() * 5)]
                // )
              }
            >
              <ArrowPathIcon />
              Refresh
            </Button>
            <ImportExcelModal
              previewEvents={handlePreviewEvents}
              show={showExcelImport}
              setShowExcelImport={setShowExcelImport}
              onImport={(file) => {}}
              onClose={handleReset}
            />
            <ExcelModal
              onHide={() => {
                setShowExcelPreview(false);
                handleReset();
              }}
              show={showExcelPreview}
              file={importedFile}
              onComplete={onCompleteImport}
            />
            <Button
              variant="primary"
              styleType="outline"
              onClick={() => {
                setShowExcelImport(true);
              }}
            >
              <PlusIcon /> Add Usage
            </Button>
          </Header.Actions>
        </Header>

        {/* Tabs */}
        <div>
          {/* <div className='flex  border-b border-neutral-100'>
          <div className='px-regular py-small bg-primary-50 border-b border-primary-400 hover:bg-neutral-50 cursor-pointer'>Processed events</div>
          <div className='px-regular py-small bg-primary-50 border-b border-primary-400 hover:bg-neutral-50 cursor-pointer'>Failed events</div>
        </div> */}

          <Tabs
            defaultTabID="processed"
            onValueChange={(value: "failed" | "processed") => {
              setEventsState(value);
            }}
            tabId="processed"
          >
            <TabsList
              size="regular"
              tabStyle="lined"
              tabs={[
                {
                  id: "processed",
                  title: "All processed events",
                },
                {
                  id: "failed",
                  title: "Failed events",
                  icon: (
                    <InformationCircleIcon className="size-3 !text-red-400" />
                  ),
                },
              ]}
              variant="horizontal"
            />
          </Tabs>
        </div>

        {/* filter */}
        <div className="space-y-regular">
          <FilterByDuration
            eventsState={eventsState}
            onClickFilter={handleDurationFilter}
            enableConditionFilter
            onCustomDuration={(start, end) => {
              setCustomDuration({ start, end });
            }}
            eventsCount={eventsCount}
          />
        </div>

        {/* charts */}
        {/* <ZoomableChart /> */}

        {/* table */}
        <div className="h-[450px] !mt-1">
          {/* { emptyStateUseCase && <EmptyEventsTable />} */}

          {
            <UsageEventTable
              eventState={eventsState}
              filteredDuration={selectedDuration}
              customDuration={customDuration}
              onRender={(events) => {
                setEventsCount(events.count);
              }}
              refreshState={refreshState}
            />
          }

          {/* <Pagination /> */}
        </div>
      </div>
    </div>
  );
};

export default UsageEventsPage;

const EmptyEventsTable = () => {
  return (
    <div className=" h-full  flex flex-col justify-center items-center">
      <div>You do not have any usage events yet.</div>
    </div>
  );
};
