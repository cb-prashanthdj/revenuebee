"use client";
import React, { useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Plus,
  Trash2,
  PencilIcon,
  PlusIcon,
  ChevronLeft,
  ChevronRight,
  EllipsisVerticalIcon,
  ChevronDown,
  Trash,
  Plug,
} from "lucide-react";
import {
  Button,
  OverFlowMenu,
  Table,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "cb-sting-react-ts";

interface EditableExcelViewerProps {
  file?: any;
  shouldReset?: boolean;
  onResetComplete?: () => void;
}

const EditableExcelViewer = ({
  file,
  shouldReset,
  onResetComplete,
}: EditableExcelViewerProps) => {
  const [excelData, setExcelData] = useState<Array<Record<string, string>>>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editCell, setEditCell] = useState<{
    row: number | null;
    col: string | null;
  }>({ row: null, col: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(100);
  const [isManualMode, setIsManualMode] = useState(true);

  // Reset all states when switching between modes
  const resetState = () => {
    setExcelData([]);
    setHeaders([]);
    setEditCell({ row: null, col: null });
    setCurrentPage(1);
    setIsLoading(false);
    onResetComplete?.();
  };

  useEffect(() => {
    if (shouldReset) {
      resetState();
      initializeEmptyTable();
    }
  }, [shouldReset]);

  useEffect(() => {
    if (file) {
      resetState(); // Reset before loading new file
      renderFile(file);
    } else {
      initializeEmptyTable();
    }
  }, [file]);
  const renderFile = (file: any) => {
    console.log("parsing file", file);
    try {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Get the range of the worksheet
          const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

          // Create an array to store all column headers
          const headers: string[] = [];

          // Get all column headers (assuming first row contains headers)
          for (let C = range.s.c; C <= range.e.c; C++) {
            const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C });
            const cell = worksheet[cellAddress];
            const headerValue = cell ? cell.v : `Column ${C + 1}`;
            headers.push(String(headerValue));
          }

          // Convert sheet data to JSON with all columns
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: headers,
            defval: "", // Default value for empty cells
            raw: false, // Convert all values to strings
          });

          if (jsonData.length > 0) {
            console.log("Headers:", headers);
            console.log("Data:", jsonData);
            setHeaders(headers);
            setExcelData(jsonData as Array<Record<string, string>>);
            setIsManualMode(false);
          }
          setCurrentPage(1);
        } catch (error) {
          console.error("Error processing worksheet:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Initialize empty table
  // Initialize empty table with complete reset
  const initializeEmptyTable = () => {
    resetState(); // Reset all states first

    const initialHeaders = [
      "Event ID",
      "Subscription ID",
      "Timestamp",
      "Column 4",
      "Column 5",
      "Column 6",
      "Column 7",
      "Column 8",
      "Column 9",
      "Column 10",
    ];

    const initialRows = Array(10)
      .fill(null)
      .map(() => {
        const row: Record<string, string> = {};
        initialHeaders.forEach((header) => {
          row[header] = "";
        });
        return row;
      });

    setHeaders(initialHeaders);
    setExcelData(initialRows);
    setIsManualMode(true);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Get the range of the worksheet
        const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

        // Create an array to store all column headers
        const headers: string[] = [];

        // Get all column headers (assuming first row contains headers)
        for (let C = range.s.c; C <= range.e.c; C++) {
          const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C });
          const cell = worksheet[cellAddress];
          const headerValue = cell ? cell.v : `Column ${C + 1}`;
          headers.push(String(headerValue));
        }

        // Convert sheet data to JSON with all columns
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: headers,
          defval: "", // Default value for empty cells
          raw: false, // Convert all values to strings
        });
        if (jsonData.length > 0) {
          console.log("Headers:", headers);
          console.log("Data:", jsonData);
          setHeaders(headers);
          setExcelData(jsonData as Array<Record<string, string>>);
          setIsManualMode(false);
        }
      } catch (error) {
        console.error("Error reading Excel file:", error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Pagination calculations
  const totalPages = Math.ceil(excelData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, excelData.length);
  const currentPageData = excelData.slice(startIndex + 1, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const addNewRow = () => {
    const newRow: Record<string, string> = {};
    headers.forEach((header) => {
      newRow[header] = "";
    });
    setExcelData([newRow, ...excelData]);

    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const deleteRow = (rowIndex: number) => {
    const newData = [...excelData];
    newData.splice(rowIndex + 1, 1);
    setExcelData(newData);
  };

  const addRow = (rowIndex: number) => {
    const newData = [...excelData];
    newData.splice(rowIndex + 2, 0, {});
    console.log(newData);
    setExcelData(newData);
  };

  const addNewColumn = () => {
    // Generate the next column name based on the current number of columns
    const newColumnNumber = headers.length + 1;
    const newHeader = `Column ${newColumnNumber}`;

    setHeaders([...headers, newHeader]);

    const newData = excelData.map((row) => ({
      ...row,
      [newHeader]: "",
    }));
    setExcelData(newData);
  };

  const deleteColumn = (header: string) => {
    const headerIndex = headers.indexOf(header);
    if (headerIndex === -1) return;

    // Remove the header
    const newHeaders = headers.filter((h) => h !== header);
    setHeaders(newHeaders);

    // Remove the column data from each row
    const newData = excelData.map((row) => {
      const newRow = { ...row };
      delete newRow[header];
      return newRow;
    });
    setExcelData(newData);
  };

  const addColumnAfter = (header: string) => {
    const headerIndex = headers.indexOf(header);
    if (headerIndex === -1) return;

    // Generate new column name
    const newColumnNumber = headers.length + 1;
    const newHeader = `Column ${newColumnNumber}`;

    // Insert the new header after the current one
    const newHeaders = [...headers];
    newHeaders.splice(headerIndex + 1, 0, newHeader);
    setHeaders(newHeaders);

    // Add the new column to each row
    const newData = excelData.map((row) => {
      const newRow = { ...row };
      // Create a new object with the columns in the correct order
      const orderedRow: Record<string, string> = {};
      newHeaders.forEach((h) => {
        orderedRow[h] = h === newHeader ? "" : newRow[h] || "";
      });
      return orderedRow;
    });
    setExcelData(newData);
  };

  const handleCellEdit = (rowIndex: number, header: string, value: string) => {
    if (rowIndex === -1) {
      // Editing header
      const headerIndex = headers.indexOf(header);
      if (headerIndex !== -1) {
        const newHeaders = [...headers];
        newHeaders[headerIndex] = value;

        // Update all data rows with new header
        const newData = excelData.map((row) => {
          const newRow = { ...row };
          newRow[value] = newRow[header];
          delete newRow[header];
          return newRow;
        });

        setHeaders(newHeaders);
        setExcelData(newData);
      }
    } else {
      // Editing cell
      const newData = [...excelData];
      newData[rowIndex + 1] = {
        ...newData[rowIndex + 1],
        [header]: value,
      };
      setExcelData(newData);
    }
    setEditCell({ row: null, col: null });
  };

  const EditableCell = ({
    value,
    rowIndex,
    header,
    isEditing,
    className,
  }: {
    value: string;
    rowIndex: number;
    header: string;
    isEditing: boolean;
    className?: string;
  }) => {
    const [editValue, setEditValue] = useState(value);

    if (isEditing) {
      return (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleCellEdit(rowIndex, header, editValue)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCellEdit(rowIndex, header, editValue);
            }
          }}
          autoFocus
          className={`w-full overflow-scroll border-none ${className}`}
        />
      );
    }

    return (
      <div
        className="cursor-pointer hover:bg-gray-100 min-w-12 h-8 flex items-center px-2"
        onClick={() => setEditCell({ row: rowIndex, col: header })}
      >
        {value || "\u00A0"}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="">
        {/* Mode Selection */}
        {excelData.length === 0 && (
          <div className="flex gap-4 mb-6">
            <Button
              styleType="outline"
              variant="primary"
              size="regular"
              onClick={() => {
                resetState(); // Reset before initializing empty table
                initializeEmptyTable();
              }}
            >
              <PlusIcon className="size-6" /> Create New Table
            </Button>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="block text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>
        )}

        {excelData.length > 0 && (
          <div className="space-y-0 mt-2">
            <div className="flex gap-4 justify-end items-end">
              {/* <div className="flex gap-large">
                <Button
                  styleType="outline"
                  variant="primary"
                  size="regular"
                  onClick={addNewColumn}
                >
                  <PlusIcon className="size-6" /> Add Column
                </Button>
                <Button
                  styleType="outline"
                  variant="primary"
                  size="regular"
                  onClick={addNewRow}
                >
                  <PlusIcon className="size-6" /> Add Row
                </Button>
              </div> */}
              <span className="text-sm font-normal italic">
                Click to edit data
              </span>
            </div>

            {/* Table Component */}
            <div className="overflow-x-auto overflow-y-auto max-h-[74vh]">
              <Table
                mode="light"
                border="full"
                size="small"
                variant="neutral"
                className="border border-white border-collapse"
              >
                {/* Column Letters */}
                <Table.Tr>
                  <Table.Td className="sticky left-0 z-20 !border-solid bg-gray-100 w-24 border-r border-gray-300 !min-h-2 !p-0.5 text-center font-semibold text-gray-600"></Table.Td>
                  {headers.map((_, index) => (
                    <Table.Td
                      key={index}
                      className="sticky top-0 !border-solid bg-gray-100 z-10 border-r border-gray-300 last:border-0 first:shadow-inner !min-h-2 !p-0.5 text-center font-semibold text-gray-600"
                    >
                      {String.fromCharCode(65 + index)}
                    </Table.Td>
                  ))}
                </Table.Tr>

                {/* Header Labels */}
                <Table.Tr>
                  <Table.Td className="sticky left-0 z-20 !border-solid bg-gray-50 border-r border-gray-300 !min-h-2 !p-0.5 text-center font-semibold text-gray-600"></Table.Td>
                  {headers.map((header, index) => (
                    <Table.Td
                      key={index}
                      className="sticky top-0 !border-solid text-nowrap hover:bg-gray-100 truncate overflow-hidden whitespace-nowrap w-[150px] bg-gray-50 z-10 border-r border-gray-300 last:border-0 !min-h-2 !p-0.5 font-semibold text-gray-600 "
                    >
                      <div className="flex justify-between">
                        <EditableCell
                          value={header}
                          rowIndex={-1}
                          header={header}
                          isEditing={
                            editCell.row === -1 && editCell.col === header
                          }
                        />

                        <div className="float-right flex gap-2 p-1">
                          <Popover modal onOpenChange={() => {}}>
                            <PopoverTrigger asChild>
                              <button className="p-1 hover:bg-neutral-100 rounded-full">
                                <ChevronDown size={12} />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              align="center"
                              arrow={true}
                              alignOffset={0}
                              arrowColour="s-fill-neutral-50"
                              className="bg-white shadow-md flex p-2 s-text-center s-rounded-lg"
                              side="bottom"
                              sideOffset={5}
                            >
                              <div className="flex flex-col">
                                <Button
                                  styleType="text"
                                  variant="primary"
                                  size="regular"
                                  fullWidth={false}
                                  onClick={() => addColumnAfter(header)}
                                >
                                  <Plus size={14} />
                                  Add
                                </Button>
                                <Button
                                  styleType="text"
                                  variant="primary"
                                  size="regular"
                                  fullWidth={false}
                                  onClick={() => deleteColumn(header)}
                                >
                                  <Trash2 size={14} />
                                  Remove
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </Table.Td>
                  ))}
                </Table.Tr>

                {/* Data Rows */}
                {currentPageData.map((row, rowIndex) => (
                  <Table.Tr key={rowIndex}>
                    <Table.Td className="sticky left-0 bg-white z-10 !border-solid border-r border-gray-300 !min-h-2 !p-0.5 !px-8 text-center font-semibold text-gray-600">
                      {startIndex + rowIndex + 1}
                    </Table.Td>
                    {headers.map((header, colIndex) => (
                      <Table.Td
                        key={`${rowIndex}-${colIndex}`}
                        className="!border-solid border-r text-nowrap hover:bg-gray-100 truncate overflow-hidden whitespace-nowrap w-[150px] border-gray-300 last:border-0 !min-h-2 !p-0.5 text-left text-gray-700"
                      >
                        <EditableCell
                          value={row[header]}
                          rowIndex={startIndex + rowIndex}
                          header={header}
                          isEditing={
                            editCell.row === startIndex + rowIndex &&
                            editCell.col === header
                          }
                        />
                      </Table.Td>
                    ))}
                    <Table.Td className="!border-solid border-r border-gray-300 last:border-0 !p-0.5 !px-4 text-center overflow-auto">
                      <Popover modal onOpenChange={() => {}}>
                        <PopoverTrigger asChild>
                          <button className="p-1 hover:bg-neutral-100 rounded-full">
                            <EllipsisVerticalIcon size={12} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="center"
                          arrow={true}
                          alignOffset={0}
                          arrowColour="s-fill-neutral-50"
                          className="bg-white shadow-md flex p-2 s-text-center s-rounded-lg"
                          side="left"
                          sideOffset={5}
                        >
                          <div className="flex flex-col">
                            <Button
                              styleType="text"
                              variant="primary"
                              size="regular"
                              fullWidth={false}
                              onClick={() => addRow(startIndex + rowIndex)}
                            >
                              <Plus size={14} />
                              Add
                            </Button>
                            <Button
                              styleType="text"
                              variant="primary"
                              size="regular"
                              fullWidth={false}
                              onClick={() => deleteRow(startIndex + rowIndex)}
                            >
                              <Trash2 size={14} />
                              Remove
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      {/* <div className="flex gap-2">
                        <button onClick={() => addRow(startIndex + rowIndex)}>
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => deleteRow(startIndex + rowIndex)}
                          className="0"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div> */}
                      {/* <OverFlowMenu
                        launchIcon={<EllipsisVerticalIcon className="!size-4" />}
                        menuGroups={[
                          {
                            items: [
                              {
                                action: () => deleteRow(startIndex + rowIndex),
                                label: "Delete row",
                                value: "",
                              },
                              {
                                action: () => {},
                                label: "Add row below",
                                value: "",
                              },
                            ],
                            title:
                              "Your subscription has been upgraded to Superior plan.",
                          },
                        ]}
                        onChangeLogic={() => {}}
                        position="bottom"
                        align="end"
                        variant="om-basic"
                      /> */}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2 w-full py-4">
              <span className="text-sm text-gray-700">
                {startIndex + 1}-{endIndex} of {excelData.length}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableExcelViewer;
