"use client";

import React, { useEffect } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const RadioButtonVariants = cva("radio-list", {
  variants: {
    variant: {
      basic: "radio-list-basic",
      contained: "radio-list-contained",
    },
    size: {
      small: "radio-list-small",
      regular: "radio-list-regular",
      large: "radio-list-large",
    },
    width: {
      full: "radio-list-full-width",
    },
    align: {
      vertical: "radio-list-vertical",
      horizontal: "radio-list-horizontal",
    },
    disabled: { true: "radio-list-disabled" },
    format: { rich: "rich-content" },
  },
});

interface RadioOption {
  label: string | any;
  value: string;
  name?: string;
}

export interface RadioButtonProps
  extends React.HTMLAttributes<HTMLFormElement>,
    VariantProps<typeof RadioButtonVariants> {
  // style: CSSProperties;
  // size: string;
  // alignment: 'vertical' | 'horizontal';
  // width: string;
  options: RadioOption[];
  // selectedOption: any;
  onOptionSelect?: RadioOption;
  // name: any;
  // disabled: false;
  // renderAsHTML: false;
  disabled?: boolean;
  title: string;
  value?: string;
  description: string;
  noCheckmark?: boolean;
  onChangeLogic?: (value: object) => void;
}

const RadioGroup = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      className,
      variant,
      size,
      align,
      options,
      width,
      format,
      disabled,
      title,
      value,
      description,
      noCheckmark,
      onChangeLogic,
    },
    ref
  ) => {
    const [currentSelected, setCurrentSelected] = React.useState(
      options.length > 0 ? options[0].value : ""
    );

    useEffect(() => {
      // console.log(value);

      setCurrentSelected(value);
    }, [value]);

    // const [selectedStyle, setSelectedStyle] = React.useState<string>('');

    const handleItemClick = (option: RadioOption) => {
      setCurrentSelected(option.value);
      if (onChangeLogic) {
        onChangeLogic(option);
      }
      //onOptionSelect(value);
      // console.log('currentSelected', selectedStyle);
    };

    return (
      <div className="w-full">
        {(title.length > 0 || description.length > 0) && (
          <div className="list-title-description">
            {title && <h4 className="list-title">{title}</h4>}
            {description && <p>{description}</p>}
          </div>
        )}

        {options.length > 0 && (
          <div
            className={cn(
              "",
              RadioButtonVariants({
                variant,
                size,
                align,
                width,
              }),
              className
            )}
          >
            {options.map((option, index) => {
              // const optionDisabled = disabled
              // if (currentSelected === option.value) optionClassNames.push('radio-option-selected');
              const selected =
                currentSelected === option.value ? "radio-option-selected" : "";
              const selectedFormat = format === "rich" ? "rich-content" : "";
              return (
                <div
                  className={cn("radio-option", selectedFormat, selected)}
                  key={`${option.value}-${index}`}
                  onClick={() => handleItemClick(option)}
                >
                  {variant === "contained" && !noCheckmark && (
                    <span className="w-4 h-4">
                      {currentSelected === option.value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                  <input
                    type="radio"
                    name={option.value}
                    id={option.value}
                    value={option.value}
                    checked={currentSelected === option.value}
                    onChange={() => !disabled && handleItemClick(option)}
                    disabled={disabled}
                    ref={ref}
                  />

                  {format !== "rich" ? (
                    <label htmlFor={option.value}>{option.label}</label>
                  ) : (
                    <div
                      className="rich-content-label"
                      dangerouslySetInnerHTML={{ __html: option.label }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";
export { RadioGroup };
