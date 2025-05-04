import {
  Badge,
  ContainedList,
  ContainedListItem,
  ContainedListItems,
  ContainedListLabel,
  ContainedListValue,
} from "cb-sting-react-ts";
import React from "react";
import { EventsJson } from "../events/_components/EventsJson";

const eventData = {
  event_id: "hjdqhd-fwjdhw-wdwedwd",
  event_status: "Failed",
  failure_reason: "Malformed data",
  event_time: "17 Jun 2024 06:49",
  subscription_id: "SUBS12345",
  api_key_name: "full_access_api_key",
  ip_address: "43.100.202.1",
  ingestion_time: "21 Jun 2024 05:32",
};

function formatColLabel(label) {
  return label
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .replace(/\b[a-z]/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}
const FailedEventDrawer = () => {
  return (
    <div className="space-y-large">
      <div className="h-4"></div>
      <ContainedList
        description=""
        header=""
        labels="block"
        onClick={() => {}}
        padding="regular"
        showDescription
        showHeader
        showTitle
        variant="basic"
      >
        <ContainedListItems>
          {Object.entries(eventData).map(([key, value]) => (
            <ContainedListItem key={key} onClick={() => {}}>
              <ContainedListLabel>{formatColLabel(key)}</ContainedListLabel>
              <ContainedListValue>
                {key === "event_status" ? (
                  value === "Success" ? (
                    <Badge variant="success">Success</Badge>
                  ) : (
                    <Badge variant="danger">falied</Badge>
                  )
                ) : (
                  value
                )}
              </ContainedListValue>
            </ContainedListItem>
          ))}
        </ContainedListItems>
      </ContainedList>

      <EventsJson />
    </div>
  );
};

export { FailedEventDrawer };
