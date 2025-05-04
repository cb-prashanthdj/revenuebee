import {
  Button,
  Badge,
  Drawer,
  Drawer2,
  DrawerContent,
  DrawerOverlays,
  DrawerTrigger,
  Table,
  TabNav,
  Tabs,
  TabsContent,
  TabsList,
  Card,
} from "cb-sting-react-ts";
import React, { useMemo, useState, useEffect } from "react";
import { errorLogData, EventsData, processedEvents } from "../_data/event";
import {
  EventDataComponent,
  Properties,
} from "../events/_components/Properties";
import { EventsJson } from "../events/_components/EventsJson";
import { FailedEventDrawer } from "./FailedEventDrawer";
import { Pagination } from "./Pagination";
import UsageCharts from "../events/_components/UsageCharts";
import {
  AdjustmentsVerticalIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import {
  format,
  isAfter,
  add,
  addMinutes,
  isBefore,
  parse,
  formatISO,
  startOfMinute,
  differenceInMinutes,
  setSeconds,
  isEqual,
  isValid,
  addSeconds,
  differenceInMilliseconds,
  parseISO,
  addMilliseconds,
  compareAsc,
  isWithinInterval,
  min,
  max,
} from "date-fns";
import EditColumnsDropdown from "./EditColumnsDropdown";
import {
  UsageEventSuccessData as EventData,
  UsageEventFailedData as ErrorLogData,
  SuccessColumn as Column,
  UsageEventTableProps,
  EventSuccessColumns as columns,
  FailedColumn,
  EventFailedColumns,
  UsageEventSuccessDataDemo,
  UsageEventSuccessRefreshDataDemo,
} from "../_models/UsagesType";

type DurationKey = "1min" | "30mins" | "1hr" | "12hr" | "24hr";

interface DurationValue {
  minutes?: number;
  hours?: number;
}

interface UsageEventsTableProps {
  eventState: "failed" | "success" | "processed";
  columns: Column[];
  EventFailedColumns: FailedColumn[];
  processedEvents: EventData[];
  errorLogData: ErrorLogData[];
  setOpenDrawer: (
    data?: EventData | ErrorLogData,
    status?: "show" | "hide"
  ) => void;
  openDrawer: "show" | "hide";
  pagination: {
    startIndex: number;
    recordCount: number;
  };
}

interface DrawerProps {
  openDrawer: "show" | "hide";
  setOpenDrawer: React.Dispatch<React.SetStateAction<"show" | "hide">>;
  eventState: string;
}

interface SuccessTableProps {
  columns: Column[];
  processedEvents: EventData[];
  setOpenDrawer: (data: EventData, status: "show" | "hide") => void;
}

interface FailedTableProps {
  EventFailedColumns: FailedColumn[];
  errorLogData: ErrorLogData[];
  setOpenDrawer: (data: ErrorLogData, status: "show" | "hide") => void;
}
interface currentDatasProp {
  eventStart: Date;
  viewStart: Date;
  eventEnd: Date;
  viewEnd: Date;
}

interface ChartData {
  group: string;
  count: number;
  time: string;
  events: number;
  eventStart: Date;
  eventEnd: Date;
}

type ColumnType = Column | FailedColumn;

export const UsageEventTable: React.FC<UsageEventTableProps> = ({
  eventState,
  filteredDuration,
  customDuration,
  onRender,
  refreshState,
}) => {
  const now = format(new Date(), "dd/MM/yyyy HH:mm:ss");
  const [openDrawer, setOpenDrawer] = React.useState<"show" | "hide">("hide");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("1hr");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentDatas, setCurrentDatas] =
    React.useState<currentDatasProp | null>(null);
  const [renderDatas, setRenderDatas] = React.useState<ChartData[]>([]);
  const [allDatas, setAllDatas] = React.useState<EventData[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [activeEvent, setActiveEvent] = useState<EventData>({} as EventData);
  const itemsPerPage = 20; // Number of items to show per page

  const viewDrawer = (data: EventData, status: string) => {
    if (status == "show") {
      setActiveEvent(data);
      setOpenDrawer("show");
    } else if (status == "hide") setOpenDrawer("hide");
  };
  // Helper function to format date in "dd-MMM-yy HH:mm" format
  const formatDate = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const generateTimeBasedData = () => {
    const now = new Date();
    const data = [];

    // Generate data points every minute for the last 24 hours
    for (let i = 0; i < 1440; i++) {
      // 24 hours * 60 minutes
      // const timestamp = new Date(now - i * 60000); // subtract i minutes
      const timestamp = new Date(now.getTime() - i * 60000);

      const modelIndex = i % 4;
      const sizeIndex = i % 4;
      const languageIndex = i % 4;
      const regionIndex = i % 3;

      data.push({
        eventId: `3wHnhVy6YoMs${i}`,
        sub_id: "AzZXC6UTLqe9INCI",
        model: ["Qwen 2.5", "Qwen 3", "Qwen 3.5", "Qwen 4"][modelIndex],
        model_size: ["5B", "6B", "7B", "8B"][sizeIndex],
        timestamp: formatDate(timestamp),
        characters: 100 + (i % 500),
        input_tokens: 100 + (i % 330),
        output_tokens: 100 + (i % 400),
      });
    }
    return data;
  };
  function generateRandomDatasets(
    fromDate: Date,
    toDate: Date,
    refreshState: string = ""
  ) {
    const events = [];
    const fromTimestamp = fromDate;
    const toTimestamp = toDate;
    const totalMinutes = differenceInMinutes(toTimestamp, fromTimestamp);
    const intervals = Math.floor(totalMinutes / 30);
    const eventCount = intervals * 30;
    const timeRange = differenceInMilliseconds(toTimestamp, fromTimestamp);

    const languages = ["EN-FR", "EN-DE", "EN-ES", "EN-JP"];
    const regions = ["US", "UK", "EU", "APAC"];
    const countries = ["USA", "UK", "EU"];
    const models = ["Qwen 2.5", "Qwen 3.0", "GPT-4", "Claude 2"];
    const modelSizes = ["5B", "10B", "20B", "2B"];
    const apiTypes = ["Batch", "Realtime"];

    for (let i = 0; i < eventCount; i++) {
      const agentTypes = ["AI agent", "Human agent"][
        Math.floor(Math.random() * 2)
      ];
      const conversationStatus = ["Open", "Resolved"][
        Math.floor(Math.random() * 2)
      ];
      const ResolutionType = ["Hard Resolution", "Soft Resolution"][
        Math.floor(Math.random() * 2)
      ];
      const AiAssistedType = ["TRUE", "FALSE"][Math.floor(Math.random() * 2)];
      const eventId = "qw" + Math.random().toString(36).substring(2, 6);
      const randomOffset = Math.random() * timeRange;
      const randomTimestamp = addMilliseconds(fromTimestamp, randomOffset);
      const conversation_channel =
        agentTypes === "AI agent"
          ? "Chat"
          : ["Email", "Call"][Math.floor(Math.random() * 2)];
      let event = {};
      if (refreshState.length == 0) {
        event = {
          event_Id: eventId,
          sub_id: `sub${i}`,
          model_name: `GPT-4o`,
          model_size: modelSizes[Math.floor(Math.random() * modelSizes.length)],
          timestamp: randomTimestamp,
          ticket_id: `sn22ih${i}`,
          agent_type: agentTypes,
          conversation_channel,
          emails: `${Math.floor(Math.random() * 5)}`,
          ai_tokens_used:
            agentTypes === "AI agent"
              ? Math.floor(Math.random() * 1000) + 100
              : null,
          time_logged:
            agentTypes === "Human agent"
              ? Math.random() < 0.2
                ? null
                : `${Math.floor(Math.random() * 50) + 10} mins`
              : null,
          email_duration: `${Math.floor(Math.random() * 45)} min`,
          calls: `${Math.floor(Math.random() * 3) + 1}`,
          call_duration: `${Math.floor(Math.random() * 20)} min`,
        };
        events.push(event);
      }
      if (refreshState.length > 0) {
        const ticket_resolved = ["TRUE", "FALSE"][
          Math.floor(Math.random() * 2)
        ];
        event = {
          event_Id: eventId,
          sub_id: `sub${i}`,
          timestamp: randomTimestamp,
          ticket_id: `sn22ih${i}`,
          agent_type: agentTypes,
          ticket_resolved: ticket_resolved,
          emails: `${Math.floor(Math.random() * 5)}`,
          email_duration: `${Math.floor(Math.random() * 45)} min`,
          calls: `${Math.floor(Math.random() * 3) + 1}`,
          call_type: "Toll Free",
          call_duration: `${Math.floor(Math.random() * 20)} min`,
          conversation_status: `${conversationStatus}`,
          resolved_by: `${conversationStatus == "Resolved" ? agentTypes : ""}`,
          resolution_type: `${
            conversationStatus == "Resolved" ? ResolutionType : ""
          }`,
          AI_assisted: `${agentTypes == "Human agent" ? AiAssistedType : ""}`,
          conversation_channel,
          resolution_time: `${
            conversationStatus == "Resolved" &&
            ResolutionType == "Hard Resolution"
              ? Math.floor(Math.random() * 45) + " sec"
              : ""
          }`,
          call_country:
            agentTypes === "Human agent" && conversation_channel === "Call"
              ? countries[Math.floor(Math.random() * regions.length)]
              : null,
        };
        events.push(event);
      }
    }
    console.log(JSON.stringify(events[0]));
    // alert();
    if (refreshState.length == 0) {
      events.unshift(...UsageEventSuccessDataDemo);
    }
    if (refreshState.length > 0) {
      events.unshift(...UsageEventSuccessRefreshDataDemo);
    }
    // Sort events by timestamp
    events.sort((a, b) => compareAsc(a.timestamp, b.timestamp));
    return events;
  }

  const allData = generateTimeBasedData();
  const filteredData = () => {
    const now = new Date();
    let filterTime;

    switch (filteredDuration) {
      case "1min":
        filterTime = new Date(now.getTime() - 1 * 60000); // 1 minute in milliseconds
        break;
      case "30mins":
        filterTime = new Date(now.getTime() - 30 * 60000); // 30 minutes
        break;
      case "1hr":
        filterTime = new Date(now.getTime() - 60 * 60000); // 1 hour
        break;
      case "12hr":
        filterTime = new Date(now.getTime() - 12 * 60 * 60000); // 12 hours
        break;
      case "24hr":
        filterTime = new Date(now.getTime() - 24 * 60 * 60000); // 24 hours
        break;
      default:
        filterTime = new Date(now.getTime() - 60 * 60000); // default 1 hour
    }

    return allData.filter((item) => {
      const [datePart, timePart] = item.timestamp.split(" ");
      const [day, month, year] = datePart.split("-");
      const [hours, minutes] = timePart.split(":");
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthIndex = months.indexOf(month);
      const itemDate = new Date(
        2000 + parseInt(year),
        monthIndex,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
      return itemDate >= filterTime;
    });
  };
  // Generate chartData for given range
  const generateChartData = (
    allRandomDatas: EventData[],
    viewStart: Date,
    viewEnd: Date
  ) => {
    console.log(viewStart, viewEnd);
    if (allRandomDatas.length === 0) return [];

    const start = startOfMinute(viewStart); // Start of minute, ignoring seconds
    const end = startOfMinute(viewEnd); // Start of minute, ignoring seconds
    const filteredArray = allRandomDatas.filter((item) => {
      const itemTime = startOfMinute(setSeconds(item.timestamp, 0)); // Round item time to start of minute
      return isWithinInterval(itemTime, { start, end });
    });

    if (filteredArray.length === 0) return [];

    // Parse timestamps and find the min and max dates in the filtered array, rounding to start of minute
    const timestamps = filteredArray.map((item) =>
      startOfMinute(item.timestamp)
    );
    const minTime = min(timestamps);
    const maxTime = max(timestamps);

    // Calculate the total time span and interval per group
    const totalDuration = maxTime.getTime() - minTime.getTime();
    const timeInterval = Math.ceil(totalDuration / 20);

    // Initialize groups with rounded date ranges
    const groups = Array.from({ length: 20 }, (_, i) => {
      const groupStart = addMilliseconds(minTime, i * timeInterval);
      const groupEnd = addMilliseconds(minTime, (i + 1) * timeInterval);
      return {
        group: {
          start: startOfMinute(groupStart),
          end: startOfMinute(groupEnd),
        }, // Round both to start of minute
        count: 0,
      };
    });
    // Count items in each group, rounding item time to start of minute
    filteredArray.forEach((item) => {
      const itemTime = startOfMinute(item.timestamp); // Round item time to start of minute
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if (itemTime >= group.group.start && itemTime < group.group.end) {
          group.count++;
          break;
        }
      }
    });

    // Format output (group start and end time as strings)
    return groups.map((group) => ({
      group: `${group.group.start.toISOString()} - ${group.group.end.toISOString()}`,
      count: group.count,
      time: isEqual(
        setSeconds(group.group.start, 0),
        setSeconds(group.group.end, 0)
      )
        ? `${format(group.group.start, "dd MMM/ hh:mm a")}`
        : `${format(group.group.start, "dd MMM/ hh:mm a")} /-/ ${format(
            group.group.end,
            "dd MMM/ hh:mm a"
          )}`,
      events: group.count,
      eventStart: parse(
        format(group.group.start, "dd/MM/yyyy HH:mm:ss"),
        "dd/MM/yyyy HH:mm:ss",
        new Date()
      ),
      eventEnd: parse(
        format(group.group.end, "dd/MM/yyyy HH:mm:ss"),
        "dd/MM/yyyy HH:mm:ss",
        new Date()
      ),
    }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(allDatas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex =
    startIndex + itemsPerPage > allDatas.length
      ? allDatas.length
      : startIndex + itemsPerPage;
  const currentData = filteredData().slice(startIndex, endIndex);

  const handleNextPage = () => {
    console.log(currentPage, totalPages);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const durationRange = (duration: DurationKey): DurationValue => {
    const durationMap: Record<DurationKey, DurationValue> = {
      "1min": { minutes: 1 },
      "30mins": { minutes: 30 },
      "1hr": { hours: 1 },
      "12hr": { hours: 12 },
      "24hr": { hours: 24 },
    };
    return durationMap[duration];
  };

  interface CurrentDatasProp {
    eventStart: Date;
    viewStart: Date;
    eventEnd: Date;
    viewEnd: Date;
  }
  const handleBarChartItemClick = (eventStart: Date, eventEnd: Date) => {
    if (eventStart && eventEnd) {
      setCurrentDatas((prevData: CurrentDatasProp | null) => {
        return prevData
          ? {
              ...prevData,
              viewStart: parse(
                format(eventStart, "dd/MM/yyyy HH:mm:ss"),
                "dd/MM/yyyy HH:mm:ss",
                new Date()
              ),
              viewEnd: parse(
                format(eventEnd, "dd/MM/yyyy HH:mm:ss"),
                "dd/MM/yyyy HH:mm:ss",
                new Date()
              ),
            }
          : null;
      });
    } else {
      setCurrentDatas((prevData: CurrentDatasProp | null) => {
        return prevData
          ? {
              ...prevData,
              viewStart: prevData.eventStart,
              viewEnd: prevData.eventEnd,
            }
          : null;
      });
    }
  };
  useEffect(() => {
    console.log(currentDatas);
    if (currentDatas) {
      setIsDataLoading(true);
      setTimeout(() => {
        setIsDataLoading(false);
      }, 2000);
      console.log(currentDatas.eventStart, currentDatas.eventEnd);
      // const allRandomDatas = generateRangeBasedData(currentDatas.eventStart,currentDatas.eventEnd)
      let allRandomDatas = generateRandomDatasets(
        currentDatas.eventStart,
        currentDatas.eventEnd,
        refreshState
      );
      if (allRandomDatas.length == 0) {
        allRandomDatas = generateRandomDatasets(
          currentDatas.eventStart,
          addMinutes(currentDatas.eventStart, 20),
          refreshState
        );
      }

      setAllDatas(allRandomDatas);
      const chartData = generateChartData(
        allRandomDatas,
        currentDatas.eventStart,
        currentDatas.eventEnd
      );
      console.log(chartData);
      setRenderDatas(chartData);
      onRender?.({ count: allRandomDatas.length });
      // setRenderDatas(generateRenderData(allRandomDatas,currentDatas.viewStart, currentDatas.viewEnd))
    }
  }, [currentDatas?.eventStart, currentDatas?.eventEnd, refreshState]);
  useEffect(() => {
    if (
      isValid(currentDatas?.viewStart) &&
      isValid(currentDatas?.viewEnd) &&
      allDatas
    ) {
      setCurrentDatas({
        eventStart: currentDatas?.viewStart ?? new Date(),
        eventEnd: currentDatas?.viewEnd ?? new Date(),
        viewStart: currentDatas?.viewStart ?? new Date(),
        viewEnd: currentDatas?.viewEnd ?? new Date(),
      });
      // const chartData = generateChartData(allDatas,currentDatas.viewStart, currentDatas.viewEnd);
      // console.log(chartData)
      // setRenderDatas(chartData)
    }
    // if(isValid(currentDatas.viewStart) && isValid(currentDatas.viewEnd)) setRenderDatas(generateRenderData(allDatas,currentDatas.viewStart, currentDatas.viewEnd))
    // else setRenderDatas(generateRenderData(allDatas,currentDatas.eventStart, currentDatas.eventEnd))
  }, [currentDatas?.viewStart, currentDatas?.viewEnd]);

  useEffect(() => {
    if (
      isValid(customDuration?.start) &&
      isValid(customDuration?.end) &&
      filteredDuration === "custom" &&
      customDuration?.start &&
      customDuration?.end
    ) {
      setCurrentDatas((prevData) => ({
        ...prevData,
        eventStart: customDuration.start,
        eventEnd: customDuration.end,
        viewStart: customDuration.start,
        viewEnd: customDuration.end,
      }));
    } else if (filteredDuration) {
      const duration = durationRange(filteredDuration as DurationKey);
      const eventStart = new Date();
      const eventEnd = add(eventStart, duration);
      setCurrentDatas({
        eventStart,
        eventEnd,
        viewStart: eventStart,
        viewEnd: eventEnd,
      });
    }
  }, [filteredDuration, customDuration, eventState]);
  useEffect(() => {
    if (refreshState && refreshState != "") {
      // generate demo data
    }
  }, [refreshState]);
  return (
    <div>
      {/* Charts Section */}
      <Card background="white ">
        <div className="h-44 px-large">
          <UsageCharts
            isLoading={isDataLoading}
            data={renderDatas}
            eventState={eventState}
            filteredDuration={filteredDuration}
            onChartItemClick={handleBarChartItemClick}
            mouseOver={(index) => {}}
            mx={1234}
          />
        </div>
      </Card>

      {isDataLoading ? (
        <LoadingTable columns={Object.keys(allDatas[0])} />
      ) : (
        <>
          <UsageEventsTable
            eventState={eventState}
            columns={columns}
            EventFailedColumns={EventFailedColumns}
            processedEvents={allDatas}
            errorLogData={errorLogData}
            setOpenDrawer={viewDrawer}
            openDrawer={openDrawer}
            pagination={{ startIndex: startIndex, recordCount: 20 }}
          />
          <Pagination
            onClickPrevious={handlePrevPage}
            onClickNext={handleNextPage}
            currentPage={startIndex + 1}
            totalPages={endIndex}
            totalItems={allDatas.length}
          />

          {/* <UsageEventsDrawer
            openDrawer={openDrawer}
            setOpenDrawer={(_, status) => setOpenDrawer("hide")}
            eventState={eventState}
          /> */}
        </>
      )}
    </div>
  );
};

interface UsageEventsDrawerProps {
  openDrawer: "show" | "hide";
  setOpenDrawer: (status?: "show" | "hide") => void;
  eventState: string;
}

const UsageEventsDrawer: React.FC<UsageEventsDrawerProps> = ({
  openDrawer,
  setOpenDrawer,
  eventState,
}) => {
  return (
    <Drawer
      hasCloseIcon
      height="short"
      width="regular"
      onClose={() => setOpenDrawer("hide")}
      placement="right"
      show={openDrawer}
      title="Event Details"
    >
      {eventState === "failed" ? (
        <FailedEventDrawer />
      ) : (
        <Tabs defaultTabID="tab1" onValueChange={() => {}} tabId="tab1">
          <TabsList
            width="inline"
            size="regular"
            tabStyle="lined"
            tabs={[
              {
                id: "tab1",
                title: "Properties",
              },
              {
                id: "tab2",
                title: "JSON",
              },
            ]}
            variant="horizontal"
          />
          <TabsContent onValueChange={() => {}} tabId="tab1">
            <div className="h-5"></div>
            <Properties />
          </TabsContent>
          <TabsContent onValueChange={() => {}} tabId="tab2">
            <EventsJson />
          </TabsContent>
        </Tabs>
      )}
    </Drawer>
  );
};

const SuccessTable: React.FC<SuccessTableProps> = ({
  columns,
  processedEvents,
  setOpenDrawer,
}) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    // columns.map((col) => col.accessor)
    Object.keys(processedEvents[0] || [])
  );

  const handleToggleColumn = (columnAccessor: string) => {
    setVisibleColumns((prevColumns) => {
      if (prevColumns.includes(columnAccessor)) {
        // Don't allow hiding all columns - keep at least one
        if (prevColumns.length === 1) return prevColumns;
        return prevColumns.filter((col) => col !== columnAccessor);
      }
      return [...prevColumns, columnAccessor];
    });
  };

  // Filter columns based on visibility
  const visibleColumnsData = columns.filter((col) =>
    visibleColumns.includes(col.accessor)
  );

  return (
    <>
      <div className="w-full text-right mt-4">
        {/* <Button styleType="text" size="regular" variant="neutral" >
    <ViewColumnsIcon className="size-4" /> Edit Columns
  </Button> */}
        <EditColumnsDropdown
          columns={columns}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggleColumn}
        />
      </div>

      <Table mode="light" border="round" className="">
        <Table.Tr>
          {visibleColumnsData.map((column) => (
            <Table.Td
              className="bg-neutral-50 font-inter font-medium !text-[14px] "
              key={column.Header}
            >
              {column.accessor}
            </Table.Td>
          ))}
        </Table.Tr>

        {processedEvents.map((event, index) => {
          return (
            <Table.Tr key={`${event.event_Id}- ${index}`}>
              {visibleColumnsData.map((column, i) => {
                return (
                  <Table.Td
                    key={column.accessor + index}
                    className="!text-[14px]"
                  >
                    {column.accessor === "event_Id" ? (
                      <div
                        className="text-primary-500 cursor-pointer"
                        onClick={() => setOpenDrawer(event, "show")}
                      >
                        {event[column.accessor]}
                      </div>
                    ) : column.accessor === "timestamp" ? (
                      format(
                        addMinutes(
                          new Date(),
                          Math.floor(-index * 10 - Math.random() * index)
                        ),
                        "dd MMM yyy, hh:mm a"
                      )
                    ) : (
                      event[column.accessor]
                    )}
                  </Table.Td>
                );
              })}
              {/* <Table.Td>
                <div 
                  className="text-primary-500 cursor-pointer" 
                  onClick={() => setOpenDrawer('show')}
                >
                  {event.eventId}
                </div>
              </Table.Td>
              <Table.Td>{event.sub_id}</Table.Td>
              <Table.Td>{event.model}</Table.Td>
              <Table.Td>{event.model_size}</Table.Td>
              <Table.Td>{format(event.timestamp,"dd MMM yyy, hh:mm a")}</Table.Td>
              <Table.Td>{event.characters}</Table.Td>
              <Table.Td>{event.language}</Table.Td>
              <Table.Td>{event.region}</Table.Td> */}
            </Table.Tr>
          );
        })}
      </Table>
    </>
  );
};
/*
interface ErrorLogData {
  event_id: string;
  failure_reason: string;
  sub_id: string;
  usage_timestamp: string;
  attributes: {
    language_pair: string;
    model: string;
  };
}
interface FailedColumn {
  Header: string;
  accessor: keyof ErrorLogData;
}

*/
const FailedTable: React.FC<FailedTableProps> = ({
  EventFailedColumns,
  errorLogData,
  setOpenDrawer,
}) => (
  <Table mode="light" border="round" className="">
    <Table.Tr>
      {EventFailedColumns.map((column) => (
        <Table.Td
          className="bg-neutral-50 font-inter font-medium !text-[14px] "
          key={column.Header}
        >
          {column.Header}
        </Table.Td>
      ))}
    </Table.Tr>

    {errorLogData.map((event, index) => (
      <Table.Tr key={event.event_id}>
        <Table.Td>
          <div
            className="text-primary-500 cursor-pointer"
            onClick={() => setOpenDrawer(event, "show")}
          >
            {event.event_id}
          </div>
        </Table.Td>
        <Table.Td>{event.failure_reason}</Table.Td>
        <Table.Td>SUB{index}</Table.Td>
        <Table.Td>{event.timestamp}</Table.Td>
        <Table.Td>
          {`{${event.attributes.language_pair} ${event.attributes.model}}`}
        </Table.Td>
      </Table.Tr>
    ))}
  </Table>
);
function formatColLabel(label) {
  return label
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space before uppercase letters
  // .replace(/\b[a-z]/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

const LoadingTable = ({ columns = [] }) => (
  <Table mode="light" border="round">
    <Table.Tr>
      {columns.map((column) => (
        <Table.Td
          className="bg-neutral-50 font-inter font-medium !text-[14px] "
          key={column}
        >
          {formatColLabel(column)}
        </Table.Td>
      ))}
    </Table.Tr>
    {Array.from({ length: 6 }).map((_, index) => (
      <Table.Tr key={index}>
        {columns.map((column, index) => (
          <Table.Td key={index}>
            <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
          </Table.Td>
        ))}
      </Table.Tr>
    ))}
  </Table>
);

const UsageEventsTable: React.FC<UsageEventsTableProps> = ({
  eventState,
  columns,
  EventFailedColumns,
  processedEvents,
  errorLogData,
  setOpenDrawer,
  openDrawer,
  pagination,
}) => {
  return (
    <div>
      {eventState === "failed" ? (
        <FailedTable
          EventFailedColumns={EventFailedColumns}
          errorLogData={errorLogData}
          setOpenDrawer={setOpenDrawer}
        />
      ) : (
        <SuccessTable
          columns={columns}
          processedEvents={processedEvents.slice(
            pagination.startIndex,
            pagination.startIndex + pagination.recordCount
          )}
          setOpenDrawer={setOpenDrawer}
        />
      )}
      <UsageEventsDrawer
        openDrawer={openDrawer}
        setOpenDrawer={
          (status) => setOpenDrawer({}, status)
          // (data, status) => alert(status)
        }
        eventState={eventState}
      />
    </div>
  );
};
