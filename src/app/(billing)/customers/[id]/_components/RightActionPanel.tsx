import {
  ContainedHeader,
  ContainedList,
  ContainedListItem,
  ContainedListItems,
  ContainedListValue,
  ContainedTitle,
} from "cb-sting-react-ts";
import React from "react";

const RightActionPanel = () => {
  return (
    <ContainedList showSeperator={false} padding={"small"} variant="menu">
      <ContainedHeader>
        <ContainedTitle>Customer Management</ContainedTitle>
      </ContainedHeader>
      <ContainedListItems>
        <ContainedListItem>
          <ContainedListValue>Create</ContainedListValue>
        </ContainedListItem>
        <ContainedListItem>
          <ContainedListValue>
            {/*<CreateQuoteModal state={false} />*/}
            {''}
          </ContainedListValue>
        </ContainedListItem>
      </ContainedListItems>
    </ContainedList>
  );
};

export { RightActionPanel };
