"use client";
import React, { useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Plus,
  Trash2,
  PlusCircle,
  Edit2,
  ChevronLeft,
  ChevronRight,
  PencilIcon,
  PlusIcon,
} from "lucide-react";
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
} from "cb-sting-react-ts";

const EditableExcelViewer = ({ file }: { file?: any }) => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editCell, setEditCell] = useState({ row: null, col: null });
  const [newColumnName, setNewColumnName] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [editHeader, setEditHeader] = useState(null);
  const [editHeaderValue, setEditHeaderValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const totalPages = Math.ceil(excelData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, excelData.length);

  const currentData = useMemo(() => {
    return excelData.slice(startIndex, endIndex);
  }, [excelData, startIndex, endIndex]);
  useEffect(() => {
    if (file) renderFile(file);
  }, [file]);
  const renderFile = (file: any) => {
    console.log("parsing file", file);
    try {
      if (!file) return;
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length > 0) {
          setHeaders(Object.keys(jsonData[0] as any));
        }
        setExcelData(jsonData);
        setCurrentPage(1);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileUpload = async (event: any) => {
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      if (!file) return;
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length > 0) {
          setHeaders(Object.keys(jsonData[0] as any));
        }
        setExcelData(jsonData);
        setCurrentPage(1);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCellEdit = (
    rowIndex?: number,
    header?: string,
    value?: string
  ) => {
    if (rowIndex !== undefined && header !== undefined) {
      const newData = [...excelData];
      newData[rowIndex][header] = value;
      setExcelData(newData);
      setEditCell({ row: null, col: null });
    }
  };

  const handleHeaderEdit = (oldHeader: string, newHeader: string) => {
    if (newHeader && newHeader !== oldHeader) {
      const newHeaders = headers.map((h) => (h === oldHeader ? newHeader : h));
      setHeaders(newHeaders);

      const newData = excelData.map((row) => {
        const newRow = { ...row };
        newRow[newHeader] = row[oldHeader];
        delete newRow[oldHeader];
        return newRow;
      });
      setExcelData(newData);
    }
    setEditHeader(null);
    setEditHeaderValue("");
  };

  const addNewRow = () => {
    interface Row {
      [key: string]: string;
    }
    const newRow: Row = {};
    headers.forEach((header) => {
      newRow[header] = "";
    });
    console.log(newRow);
    setExcelData([...excelData, newRow]);
  };

  const deleteRow = (rowIndex) => {
    const newData = excelData.filter((_, index) => index !== rowIndex);
    setExcelData(newData);

    // Adjust current page if necessary
    const maxPage = Math.ceil(newData.length / rowsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(Math.max(1, maxPage));
    }
  };

  const addNewColumn = () => {
    if (newColumnName.trim()) {
      const newHeader = newColumnName.trim();
      setHeaders([...headers, newHeader]);

      const newData = excelData.map((row) => ({
        ...row,
        [newHeader]: "",
      }));
      setExcelData(newData);
      setNewColumnName("ss");
      setShowAddColumn(false);
    }
  };

  const deleteColumn = (headerToDelete) => {
    const newHeaders = headers.filter((header) => header !== headerToDelete);
    const newData = excelData.map((row) => {
      const newRow = { ...row };
      delete newRow[headerToDelete];
      return newRow;
    });
    setHeaders(newHeaders);
    setExcelData(newData);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "edited_data.xlsx");
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages));
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };
  const EditableHeaderCell = ({ value, rowIndex, header, isEditing }) => {
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
          className="w-full overflow-scroll border-none"
        />
      );
    }

    return (
      <div
        className="cursor-pointer hover:bg-gray-100  min-w-12"
        onClick={() => setEditCell({ row: rowIndex, col: header })}
      >
        {value}&nbsp;
      </div>
    );
  };
  const EditableCell = ({ value, rowIndex, header, isEditing }) => {
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
          className="w-full overflow-scroll border-none"
        />
      );
    }

    return (
      <div
        className="cursor-pointer hover:bg-gray-100  min-w-12"
        onClick={() => setEditCell({ row: rowIndex, col: header })}
      >
        {value}&nbsp;
      </div>
    );
  };

  const Cell = ({ header }) => {
    if (editHeader === header) {
      return (
        <input
          type="text"
          value={editHeaderValue}
          onChange={(e) => setEditHeaderValue(e.target.value)}
          onBlur={() => handleHeaderEdit(header, editHeaderValue)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleHeaderEdit(header, editHeaderValue);
            }
          }}
          autoFocus
          className="w-32 p-1 border border-blue-500 rounded focus:outline-none text-xs"
        />
      );
    }

    return (
      <div className="flex items-center justify-between gap-2">
        <span>{header}</span>
        <div className="flex gap-1">
          <button
            onClick={() => {
              setEditHeader(header);
              setEditHeaderValue(header);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => deleteColumn(header)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full  mx-auto ">
      <div className="bg-white ">
        <div className="flex justify-between items-center">
          {excelData.length == 0 && (
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
          )}
          {excelData.length > 0 && false && (
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Export to Excel
            </button>
          )}
        </div>

        {isLoading && <div className="text-center py-4">Loading...</div>}

        {excelData.length > 0 && (
          <div className="space-y-4">
            <div className="flex gap-large">
              <Button
                styleType="outline"
                variant="primary"
                size="regular"
                onClick={() => setShowAddColumn(true)}
              >
                {" "}
                <PencilIcon className="size-6" /> Edit data
              </Button>
              {showAddColumn ? (
                <div className=" flex items-center gap-2 ">
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Column name"
                    className="px-2 py-1 w-24 border rounded"
                  />
                  {/* <button
                  onClick={addNewColumn}
                  className=" px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button> */}
                  <Button
                    styleType=""
                    variant="primary"
                    size="regular"
                    onClick={addNewColumn}
                  >
                    {" "}
                    Add
                  </Button>
                  <Button
                    styleType="ouline"
                    variant="neutral"
                    size="regular"
                    onClick={() => setShowAddColumn(false)}
                  >
                    {" "}
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  styleType="outline"
                  variant="primary"
                  size="regular"
                  onClick={() => setShowAddColumn(true)}
                >
                  {" "}
                  <PlusIcon className="size-6" /> Add Column
                </Button>
              )}
              <Button
                styleType="outline"
                variant="primary"
                size="regular"
                onClick={addNewRow}
              >
                {" "}
                <PlusIcon className="size-6" /> Add Row
              </Button>
            </div>
            {/* <div className="flex justify-between items-center mb-4">
              <button
                onClick={addNewRow}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Plus size={16} /> Add Row
              </button>
              
              {showAddColumn ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Column name"
                    className="px-2 py-1 border rounded"
                  />
                  <button
                    onClick={addNewColumn}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddColumn(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddColumn(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <PlusCircle size={16} /> Add Column
                </button>
              )}
            </div> */}

            <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
              <Table
                mode="light"
                border="full"
                size="small"
                variant="neutral"
                className="border border-white border-collapse"
              >
                {/* Header Row */}
                <Table.Tr>
                  <Table.Td className="sticky left-0 z-20 !border-solid bg-gray-100 w-24  border-r border-gray-300 !min-h-2 !p-0.5 text-center font-semibold text-gray-600"></Table.Td>
                  {headers.map((header, index) => (
                    <Table.Td
                      key={index}
                      className="sticky top-0 !border-solid bg-gray-100 z-10 border-r border-gray-300 last:border-0 first:shadow-inner !min-h-2 !p-0.5 text-center font-semibold text-gray-600"
                    >
                      {String.fromCharCode(65 + index)}
                    </Table.Td>
                  ))}
                </Table.Tr>

                {/* Subheader Row */}
                <Table.Tr>
                  <Table.Td className="sticky left-0 z-20 !border-solid  bg-gray-50  border-r border-gray-300 !min-h-2 !p-0.5 text-center font-semibold text-gray-600"></Table.Td>
                  {headers.map((header, index) => (
                    <Table.Td
                      key={index}
                      className="sticky top-0 !border-solid text-nowrap hover:bg-gray-100 truncate overflow-hidden whitespace-nowrap w-[150px] bg-gray-50 z-10 border-r border-gray-300 last:border-0 !min-h-2 !p-0.5 font-semibold  text-gray-600"
                    >
                      {header}
                    </Table.Td>
                  ))}
                </Table.Tr>

                {/* Data Rows */}
                {currentData.map((row, rowIndex) => (
                  <Table.Tr key={rowIndex}>
                    {/* Row Index */}
                    <Table.Td className="sticky left-0 bg-white z-10 !border-solid border-r border-gray-300 !min-h-2 !p-0.5 !px-8 text-center font-semibold text-gray-600">
                      {rowIndex + startIndex + 1}
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
                    {/* Action Button */}
                    <Table.Td className="!border-solid border-r border-gray-300 last:border-0 !p-0.5 !px-4 text-center">
                      <button
                        onClick={() => deleteRow(startIndex + rowIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={12} />
                      </button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table>

              {/* <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <Cell header={header} />
                      </th>
                    ))}
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header, colIndex) => (
                        <td
                          key={`${rowIndex}-${colIndex}`}
                          className="text-sm text-gray-900"
                        >
                          <EditableCell
                            value={row[header]}
                            rowIndex={startIndex + rowIndex}
                            header={header}
                            isEditing={
                              editCell.row === (startIndex + rowIndex) && 
                              editCell.col === header
                            }
                          />
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => deleteRow(startIndex + rowIndex)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
            <div className="flex items-center gap-2 w-full">
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
            {/* Pagination Controls */}
            {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center">
                <span className="mr-2">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="border rounded px-2 py-1"
                >
                  {[5, 10, 25, 50].map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
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
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableExcelViewer;
