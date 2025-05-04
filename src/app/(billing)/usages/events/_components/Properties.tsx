import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  ContainedDescription,
  ContainedHeader,
  ContainedList,
  ContainedListItem,
  ContainedListItems,
  ContainedListLabel,
  ContainedListValue,
  ContainedTitle,
  Input,
  Table,
} from "cb-sting-react-ts";
import { Search } from "lucide-react";
import React from "react";

export const eventData = {
  event_Id: "qw23222",
  sub_id: "sub1",
  timestamp: "",
  ticket_id: "sn22ih11",
  agent_type: "AI agent",
  conversation_channel: "Chat",
  conversation_time: "",
};

export const Properties = () => {
  return (
    <div>
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
                {value.toString()}
                {/* {
          key === 'eventStatus' ? (
                value === 'Success' ? (
                    <Badge variant="success">Success</Badge>
                ) : (
                    <Badge variant="danger">falied</Badge>
                )
                ) : (
                    
                    value
                )
            } */}
              </ContainedListValue>
            </ContainedListItem>
          ))}
        </ContainedListItems>
      </ContainedList>
      <EventDataComponent />
    </div>
  );
};
function formatColLabel(label) {
  return label
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .replace(/\b[a-z]/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}
export const EventDataComponent = () => {
  return (
    <div className="space-y-large mt-4 pt-4">
      <div className="s-h5">Event data</div>
      <div>
        <Input
          iconName={<MagnifyingGlassIcon className="" />}
          inputSize="regular"
          inputWidth="inline"
          label="hide"
          labelText="Label"
          onChangeLogic={() => {}}
          placeholder="Search attribute, value"
          type="text"
          variant="search"
          withIcon
        />
      </div>
      <div>
        <Table border="round">
          <Table.Tr>
            <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] rounded">
              Attribute
            </Table.Td>
            <Table.Td className="bg-neutral-50 font-inter font-medium !text-[14px] rounded">
              Value
            </Table.Td>
          </Table.Tr>
          {Object.entries(eventData)
            .map(([key, value]) => ({
              attribute: formatColLabel(key),
              value: value || "",
            }))
            .map((row, index) => (
              <Table.Tr key={index}>
                <Table.Td>{row.attribute}</Table.Td>
                <Table.Td>{row.value}</Table.Td>
              </Table.Tr>
            ))}
        </Table>
      </div>
    </div>
  );
};
