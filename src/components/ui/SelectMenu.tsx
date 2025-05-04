"use client";
import { VariantProps, cva } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState, useRef, useEffect } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import React from "react";
import { Input } from "cb-sting-react-ts";
import { cn } from "@/app/lib/utils";
import * as Select from "@radix-ui/react-select";
const SelectMenuVariants = cva("s-selectmenu ", {
  variants: {
    size: {
      regular: "",
      large: "s-selectmenu-large",
    },
    widthMenu: {
      inline: "s-w-min",
      full: "s-w-full",
    },
    label: {
      default: "",
      inline: "",
      hide: "",
    },
    withIcon: {
      true: "s-selectmenu-icon",
    },
    // disabled: {
    //   true: "s-opacity-60 s-cursor-not-allowed"
    // }
  },
});
export interface SelectMenuProps
  extends RadixSelect.SelectProps,
    VariantProps<typeof SelectMenuVariants> {
  placeholder?: string;
  labelText?: string;
  showIndication?: boolean;
  selectItemIcon?: ReactNode;
  selectIcon?: ReactNode;
  multiSelect?: boolean;
  hasSearch?: boolean;
  disabled?: boolean;
  width?: string;
  onValueChange?: (value: string | string[]) => void;
}
const SelectMenu = React.forwardRef<HTMLButtonElement, SelectMenuProps>(
  ({
    size,
    label,
    labelText,
    placeholder,
    widthMenu,
    width,
    selectIcon,
    multiSelect,
    disabled,
    children,
    hasSearch,
    ...props
  }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const hideLabel = label === "hide";
    const defaultLabel = label === "default";
    const inlineLabel = label === "inline";
    const [selectedIcon, setSelectedIcon] = useState<ReactNode | null>(null);
    // const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
    const [selectedValues, setSelectedValues] = useState<string | Set<string>>(
      ""
    );
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      console.log(open);
      function handleClickOutside(event: any) {
        console.log("useref");
        console.log(event.target);
        // if (ref.current && !ref.current.contains(event.target)) {
        //   // setOpen(false);
        // }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
    useEffect(() => {
      if (multiSelect) {
        const newSelectedValues = new Set(props.value);
        setSelectedValues(newSelectedValues);
      } else {
        setSelectedValues(props.value ? props.value : "");
      }
    }, [props.value]);
    const handleValueChange = (value: string) => {
      if (multiSelect) {
        setSelectedValues((prevSelectedValues) => {
          // const newSelectedValues = new Set(prevSelectedValues);
          const newSelectedValues = new Set(prevSelectedValues as Set<string>);
          if (newSelectedValues.has(value)) {
            newSelectedValues.delete(value);
          } else {
            newSelectedValues.add(value);
          }
          // props.onValueChange?.([...newSelectedValues]);
          return newSelectedValues;
        });
      } else {
        setSelectedValues(value);

        props.onValueChange?.(value);
        const selectedChild = React.Children.toArray(children).find((child) => {
          if (React.isValidElement(child)) {
            return (
              (child.props as SelectItemProps).value === value ||
              (child.props as SelectItemProps).value === value.toString()
            );
          }
          return false;
        });
        if (selectedChild && React.isValidElement(selectedChild)) {
          setSelectedIcon(
            (selectedChild.props as SelectItemProps).selectItemIcon
          );
        }
      }
    };
    const options = React.Children.toArray(children);

    // Find the label corresponding to the selectedValues
    const selectedLabel =
      options
        .map((option) => {
          if (React.isValidElement(option)) {
            const value = (option.props as any).value; // item.label
            const label = (option.props as any).children; // item.value
            return { value, label };
          }
          return null; // Handle non-element children
        })
        .find((option) => option && option.value === selectedValues)?.label ||
      placeholder;

    return (
      <>
        <div ref={ref}>
          <RadixSelect.Root
            {...(props as any)}
            value={selectedValues as string}
            onValueChange={handleValueChange}
            disabled={disabled}
            onOpenChange={() => {
              setTimeout(() => {
                document.body.style.pointerEvents = "auto";
              }, 1000);
              setOpen(true);
            }}
          >
            <div
              className={cn(
                " ",
                SelectMenuVariants({ widthMenu }),
                `!s-min-w-${width} !s-w-${width}`
              )}
            >
              <div className="s-wrapper ">
                {!hideLabel && defaultLabel && (
                  <span>
                    <label className="s-selectmenu-label">{labelText}</label>
                  </span>
                )}

                <RadixSelect.Trigger
                  className={cn(
                    " s-selectmenu-trigger ",
                    SelectMenuVariants({ size }),
                    {
                      "s-opacity-60 s-cursor-not-allowed": disabled, // Apply disabled styles
                    }
                  )}
                  disabled={disabled}
                >
                  <div>
                    {selectedIcon ? selectedIcon : selectIcon}

                    {inlineLabel && (
                      <span className="s-inline-label">{labelText}</span>
                    )}

                    {/* <RadixSelect.Value placeholder={placeholder}>
                {multiSelect ? [...selectedValues].join(", ") : undefined}
                
              </RadixSelect.Value> */}
                    <RadixSelect.Value placeholder={placeholder}>
                      {/* {multiSelect
                  ? [...(selectedValues as Set<string>)].join(", ")
                  : (selectedLabel as string) || placeholder} */}
                    </RadixSelect.Value>
                  </div>

                  <RadixSelect.Icon className="s-icon ">
                    <ChevronDownIcon />
                  </RadixSelect.Icon>
                </RadixSelect.Trigger>
                {!disabled && (
                  <RadixSelect.Portal>
                    <RadixSelect.Content
                      onCloseAutoFocus={(e) => e.preventDefault()}
                      avoidCollisions={false}
                      side="bottom"
                      position="popper"
                      align="start"
                      className="s-selectmenu-content "
                    >
                      <ScrollArea.Root className="scroll-area" type="auto">
                        {hasSearch && (
                          <div className="p-2 flex items-center bg-gray-100">
                            {hasSearch && (
                              <Input
                                iconName=""
                                inputSize="regular"
                                inputWidth="inline"
                                label="hidden"
                                labelText=""
                                onChangeLogic={(value: string) => {
                                  setSearchQuery(value);
                                }}
                                placeholder="Placeholder"
                                type="text"
                                variant={hasSearch ? "search" : "input"}
                                withIcon
                              />
                            )}
                          </div>
                        )}
                        <RadixSelect.Viewport asChild>
                          <ScrollArea.Viewport
                            className="viewport"
                            style={{ overflowY: undefined }}
                            asChild
                          >
                            <RadixSelect.Group>
                              {/* {children} */}
                              {React.Children.map(children, (child: any) =>
                                React.cloneElement(child, { selectedValues })
                              )}
                            </RadixSelect.Group>
                          </ScrollArea.Viewport>
                        </RadixSelect.Viewport>

                        <ScrollArea.Scrollbar
                          className=" scrollbar"
                          orientation="vertical"
                        >
                          <ScrollArea.Thumb className="thumb" />
                        </ScrollArea.Scrollbar>
                      </ScrollArea.Root>
                    </RadixSelect.Content>
                  </RadixSelect.Portal>
                )}
              </div>
            </div>
          </RadixSelect.Root>
        </div>
      </>
    );
  }
);

SelectMenu.displayName = "SelectMenu";

const CSelectRoot: React.FC<SelectMenuProps> = (props) => {
  return <SelectMenu {...props} />;
};
CSelectRoot.displayName = "CSelect";

export interface SelectItemProps
  extends RadixSelect.SelectItemProps,
    VariantProps<typeof SelectMenuVariants> {
  children: ReactNode;
  selectItemIcon?: ReactNode;
  showIndication?: boolean;
  selectedValues?: any;
}

const CSelectItem: React.FC<SelectItemProps> = (props) => {
  return <SelectItem {...props} />;
};
CSelectItem.displayName = "CSelectItem";

const SelectItem = ({
  children,
  showIndication,
  selectItemIcon,
  selectedValues,
  ...props
}: SelectItemProps) => {
  const [isSelected, setIsSelecteds] = useState<boolean>(false);
  const checkValue = (variable: Set<string>, valueToCheck: any) => {
    if (variable instanceof Set) {
      return variable.has(valueToCheck);
    } else if (typeof variable === "string") {
      return variable === valueToCheck;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    console.log(checkValue(selectedValues, props.value));
    setIsSelecteds(checkValue(selectedValues, props.value));
  }, [selectedValues]);
  return (
    <RadixSelect.Group>
      <RadixSelect.Item
        className={"s-selectmenu-item "}
        {...props}
        data-state={isSelected ? "checked" : ""}
      >
        <div className=" s-content">
          {selectItemIcon && <span>{selectItemIcon}</span>}
          <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        </div>

        {showIndication && isSelected && (
          <span aria-hidden="true" className="s-selectmenu-indicator">
            <CheckIcon className="s-icon" />
          </span>
        )}

        {/* OLD selected logic ** {showIndication && (
            <RadixSelect.ItemIndicator className="s-selectmenu-indicator">
              <CheckIcon className="s-icon" />
            </RadixSelect.ItemIndicator>
          )}  */}
      </RadixSelect.Item>
    </RadixSelect.Group>
  );
};

type CSelectComponent = typeof CSelectRoot & {
  Item: typeof CSelectItem;
};

const CSelect = CSelectRoot as CSelectComponent;
CSelect.Item = CSelectItem;

export { SelectMenu, SelectMenuVariants, SelectItem, CSelect };
