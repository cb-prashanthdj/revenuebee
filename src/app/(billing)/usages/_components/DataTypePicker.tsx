"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { ArrowPathIcon, CalendarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
export const DataTypePicker = ({ value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    { icon: "#", label: "Number" },
    { icon: "Aa", label: "String" },
    { icon: "01", label: "Boolean" },
    { icon: <CalendarIcon className="size-4" />, label: "Timestamp" },
  ];

  const selectedOption =
    options.find((option) => option.label === value) || options[0];

  return (
    <div
      ref={dropdownRef}
      className={clsx("relative -ml-px", disabled && "opacity-[0.6]")}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-8 items-center justify-center rounded-e-md border border-regular bg-white hover:bg-neutral-25 focus:outline-none disabled:cursor-not-allowed"
        disabled={disabled}
      >
        {selectedOption.icon}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 bg-white border border-neutral-100 rounded overflow-y-auto min-w-48 max-h-56">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                onChange(option.label);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full h-8 p-regular text-base text-left flex items-center gap-2 hover:bg-gray-100 focus:outline-none",
                {
                  "bg-primary-50 hover:bg-primary-100 text-primary-800":
                    option.label === value,
                }
              )}
            >
              <span className="w-6 flex justify-center">{option.icon}</span>
              <span className="text-gray-900">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
