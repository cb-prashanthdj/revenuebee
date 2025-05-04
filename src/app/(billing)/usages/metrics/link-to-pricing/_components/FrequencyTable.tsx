"use client";

// FrequencyTable.tsx
import {
  Input as InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
  STable as Table,
} from "cb-sting-react-ts";
import { Info, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFrequencyStore } from "./../../../_store/frequency-store";

interface FrequencyData {
  section: string;
  frequencies: {
    name: string;
    tokens: string;
  }[];
}

export const FrequencyTable = () => {
  const {
    selectedItems,
    modifiedCurrencies,
    handleDrawer,
    addSelectedItem,
    removeSelectedItem,
  } = useFrequencyStore();

  const [tableData, setTableData] = useState<FrequencyData[]>([
    {
      section: "Essential",
      frequencies: [
        { name: "Monthly", tokens: "200" },
        { name: "Yearly", tokens: "2400" },
      ],
    },
  ]);

  // Automatically add all items to selected items when component mounts
  useEffect(() => {
    tableData.forEach((section) => {
      section.frequencies.forEach((frequency) => {
        if (frequency.tokens.trim() !== "") {
          addSelectedItem({
            section: section.section,
            name: frequency.name,
            tokens: frequency.tokens,
            productFamily: "Help desk",
          });
        }
      });
    });
  }, []);

  const handleTokenChange = (
    value: string,
    sectionIndex: number,
    frequencyIndex: number
  ) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    setTableData((prevData) => {
      const newData = [...prevData];
      newData[sectionIndex].frequencies[frequencyIndex].tokens = numericValue;

      // Update selected items when token changes
      const frequency = newData[sectionIndex].frequencies[frequencyIndex];
      const section = newData[sectionIndex].section;

      // Remove the old item first
      removeSelectedItem({
        section,
        name: frequency.name,
        tokens: frequency.tokens,
        productFamily: "Help desk",
      });

      // Add the updated item
      if (numericValue.trim() !== "") {
        addSelectedItem({
          section,
          name: frequency.name,
          tokens: numericValue,
          productFamily: "Help desk",
        });
      }

      return newData;
    });
  };

  return (
    <Table mode="light" border="full" className="border rounded-2xl">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell
            align="left"
            className="bg-neutral-50 font-inter font-medium !text-[14px]"
          >
            Item and frequency
          </Table.HeaderCell>
          <Table.HeaderCell
            align="left"
            className="bg-neutral-50 font-inter font-medium !text-[14px]"
          >
            <div className="flex items-center gap-2">
              Enter included usage
              <Info className="w-4 h-4 text-neutral-500" />
            </div>
          </Table.HeaderCell>
          <Table.HeaderCell
            align="right"
            className="bg-neutral-50 font-inter font-medium !text-[14px]"
          >
            {" "}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {tableData.map((section, sectionIndex) => (
          <React.Fragment key={section.section}>
            <Table.Row>
              <Table.Cell
                className="font-medium font-inter bg-neutral-25"
                colSpan={3}
              >
                {section.section}
              </Table.Cell>
            </Table.Row>
            {section.frequencies.map((frequency, frequencyIndex) => (
              <Table.Row key={`${section.section}-${frequency.name}`}>
                <Table.Cell className="flex items-center gap-3">
                  <span className="text-sm">{frequency.name}</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <InputField
                      value={frequency.tokens}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleTokenChange(
                          e.target.value,
                          sectionIndex,
                          frequencyIndex
                        )
                      }
                      placeholder="Enter tokens"
                      inputSize="regular"
                    />
                  </div>
                </Table.Cell>
                <Table.Cell align="right">
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <button className="p-1 hover:bg-neutral-100 rounded-full">
                        <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      alignOffset={5}
                      arrowColour="s-fill-primary-50"
                      className="bg-white shadow-md flex p-2 s-text-center s-rounded-lg"
                      side="right"
                      sideOffset={5}
                    >
                      <div
                        onClick={() =>
                          handleDrawer("show", {
                            section: section.section,
                            name: frequency.name,
                            tokens: frequency.tokens,
                          })
                        }
                        className="cursor-pointer"
                      >
                        View currencies and variants
                      </div>
                    </PopoverContent>
                  </Popover>
                </Table.Cell>
              </Table.Row>
            ))}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );
};
