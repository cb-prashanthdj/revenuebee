import React, { useState } from 'react';
import { Button } from 'cb-sting-react-ts';
import { ViewColumnsIcon } from '@heroicons/react/24/outline';

const EditColumnsDropdown = ({ columns, visibleColumns, onToggleColumn }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        styleType="text"
        size="regular"
        variant="neutral"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ViewColumnsIcon className="size-4 mr-2" />
        Edit Columns
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-neutral-900 mb-3">
              Show/Hide Columns
            </h3>
            <div className="space-y-2">
              {columns.map((column) => (
                <label
                  key={column.accessor}
                  className="flex items-center justify-between hover:bg-neutral-50 p-2 rounded cursor-pointer"
                >
                  <span className="text-sm text-neutral-700">{column.Header}</span>
                  <div
                    className={`relative inline-flex h-5 w-9 items-center flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                      visibleColumns.includes(column.accessor)
                        ? 'bg-primary-600'
                        : 'bg-neutral-200'
                    }`}
                    onClick={() => onToggleColumn(column.accessor)}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        visibleColumns.includes(column.accessor)
                          ? 'translate-x-[18px]'
                          : 'translate-x-[2px]'
                      }`}
                    />
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                styleType="text"
                size="small"
                variant="neutral"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditColumnsDropdown;