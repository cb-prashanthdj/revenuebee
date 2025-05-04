// RuleBuilder.tsx
import React, { useEffect, useRef, useState } from "react";

import {
  InformationCircleIcon,
  PlusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Button, Input, SelectItem, SelectMenu } from "cb-sting-react-ts";
import { EntityOption } from "../_models/whenShowMetricsRule";
import { DataTypePicker } from "./DataTypePicker";

// Updated interfaces with more specific types
interface RuleCondition {
  entity: string;
  operator: string;
  value: string | string[]; // Allow both string and string array types
  clause?: string;
}

// interface EntityOption {
//   id: string;
//   entity: string;
//   type: 'text' | 'number' | 'select';
//   operators: string[];
//   values?: Array<{ id: string; name: string }>;
//   placeholder?: string;
//   multiple?: boolean;
// }

interface OperatorOption {
  id: string;
  option: string;
}

interface InputErrorProps {
  children: React.ReactNode;
}

interface RuleBuilderProps {
  groupRef: number;
  conditions: RuleCondition[];
  entities: EntityOption[];
  operators: OperatorOption[];
  setConditions: (conditions: RuleCondition[]) => void;
  maxConditions?: number;
  showErrorMessages?: boolean;
}

const InputError: React.FC<InputErrorProps> = ({ children }) => (
  <div className="flex gap-small items-center">
    <span className="s-icon s-error-icon">
      <InformationCircleIcon height={18} width={18} color="red" />
    </span>
    <span className="s-input-message s-error-message font-semibold">
      {children}
    </span>
  </div>
);

const Select = ({ entities, condition, index, handleEntityChange }) => {
  const [dataType, setDataType] = useState("String");

  return (
    <>
      <SelectMenu
        label="hide"
        labelText="Select Entity"
        onValueChange={(value: string) => handleEntityChange(index, value)}
        placeholder="Filter by"
        size="regular"
        value={condition.entity}
      >
        {entities.map((entity) => (
          <SelectItem key={entity.id} value={entity.entity}>
            {entity.entity}
          </SelectItem>
        ))}
      </SelectMenu>
      <DataTypePicker
        value={dataType}
        onChange={setDataType}
        disabled={false}
      />
    </>
  );
};

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  groupRef,
  conditions,
  entities,
  operators,
  setConditions,
  maxConditions = 5,
  showErrorMessages = true,
}) => {
  const handleClauseChange = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index].clause = value;
    setConditions(newConditions);
  };
  const ruleContainerRef = useRef<HTMLDivElement>(null);
  const [ruleContainerWidth, setRuleContainerWidth] = useState<number>(0);
  const handleEntityChange = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index].entity = value;
    newConditions[index].operator = "";
    newConditions[index].value = ""; // Reset to empty string
    setConditions(newConditions);
  };

  const [dataType, setDataType] = useState("Number");

  const handleOperatorChange = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index].operator = value;
    setConditions(newConditions);
  };

  // Updated to handle both string and string[] values
  const handleValueChange = (index: number, value: string | string[]) => {
    const newConditions = [...conditions];
    const selectedEntityObj = entities.find(
      (entity) => entity.entity === conditions[index].entity
    );

    if (selectedEntityObj?.multiple) {
      // Handle array values for multiple select
      const arrayValue = Array.isArray(value) ? value : [value];
      if (arrayValue.includes("Select all")) {
        newConditions[index].value = ["Select all"];
      } else {
        newConditions[index].value = arrayValue.filter(
          (val) => val !== "Select all"
        );
      }
    } else {
      // Handle single string value
      newConditions[index].value =
        typeof value === "string" ? value : value[0] || "";
    }

    setConditions(newConditions);
  };

  const addCondition = () => {
    if (conditions.length < maxConditions) {
      setConditions([...conditions, { entity: "", operator: "", value: "" }]);
    }
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  // Helper function to safely check numeric values
  const isValidNumber = (value: string | string[]): boolean => {
    const numValue = typeof value === "string" ? value : value[0];
    return !isNaN(Number(numValue));
  };
  const isUsageCalculationConditionsFilled = (conditions) => {
    console.log(conditions);
    if (conditions) {
      return !conditions.some(
        (cond) => !cond.entity || !cond.operator || !cond.value
      );
    } else {
      return false;
    }

    // return isUsageCalculationFilled(group);
  };
  useEffect(() => {
    if (ruleContainerRef.current) {
      const width = ruleContainerRef.current.getBoundingClientRect().width;
      setRuleContainerWidth(width);
    }

    // Optional: Update on window resize
    const handleResize = () => {
      if (ruleContainerRef.current) {
        const width = ruleContainerRef.current.getBoundingClientRect().width;
        setRuleContainerWidth(width);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="space-y-regular w-full">
      {conditions?.map((condition, index) => {
        const selectedEntityObj = entities.find(
          (entity) => entity.entity === condition.entity
        );
        const filteredOperators = selectedEntityObj
          ? operators.filter((op) =>
              selectedEntityObj.operators.includes(op.id)
            )
          : [];

        const values = selectedEntityObj?.values || [];
        const dynamicWidth = `w-[${ruleContainerWidth}px]`;
        return (
          <React.Fragment key={`${groupRef}-${index}`}>
            <div
              ref={ruleContainerRef}
              // style={{ marginLeft: `${index !== 0 ? 20 : 0}px` }}
              style={{
                paddingInlineStart: `${index !== 0 ? 32 : 16}px`,
                paddingInlineEnd: "16px",
              }}
              className={`flex flex-col md:flex-row bg-neutral-50 px-large p-regular border rounded-lg border-neutral-50 items-center gap-large`}
            >
              <div className={`mr-auto font-semibold uppercase`}>
                {index === 0 ? "Where" : "OR"}
              </div>
              <div
                style={{ width: `${(ruleContainerWidth * 0.78) / 3}px` }}
                className="flex-shrink-0 [&_.s-selectmenu-trigger]:rounded-e-none [&>div:first-child]:flex-1 flex"
              >
                <Select
                  entities={entities}
                  condition={condition}
                  index={index}
                  handleEntityChange={handleEntityChange}
                />
              </div>

              <div
                style={{ width: `${(ruleContainerWidth * 0.7) / 3}px` }}
                className="flex-shrink-0"
              >
                <SelectMenu
                  label="hide"
                  labelText="Select Operator"
                  onValueChange={(value: string) =>
                    handleOperatorChange(index, value)
                  }
                  placeholder="Operation"
                  size="regular"
                  value={condition.operator}
                >
                  {filteredOperators.map((operator) => (
                    <SelectItem key={operator.id} value={operator.option}>
                      {operator.option}
                    </SelectItem>
                  ))}
                </SelectMenu>
              </div>

              <div
                style={{ width: `${(ruleContainerWidth * 0.7) / 3}px` }}
                className="flex-shrink-0"
              >
                <Input
                  inputSize="regular"
                  inputWidth="inline"
                  label="hide"
                  labelText="Label"
                  messageText=""
                  onChangeLogic={(event: string) =>
                    handleValueChange(index, event)
                  }
                  placeholder={selectedEntityObj?.placeholder || "Value"}
                  type="text"
                  variant="input"
                />
                {/* {selectedEntityObj?.type === "number" ? (
                  <Input
                    inputSize="regular"
                    inputWidth="inline"
                    label="hide"
                    labelText="Label"
                    messageText=""
                    onChangeLogic={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => handleValueChange(index, event.target.value)}
                    placeholder="Value"
                    type="number"
                    variant="input"
                  />
                ) : selectedEntityObj?.type === "text" ? (
                  <Input
                    inputSize="regular"
                    inputWidth="inline"
                    label="hide"
                    labelText="Label"
                    messageText=""
                    onChangeLogic={(event: string) =>
                      handleValueChange(index, event)
                    }
                    placeholder={selectedEntityObj.placeholder || "Value"}
                    type="text"
                    variant="input"
                  />
                ) : (
                  <SelectMenu
                    label="hide"
                    labelText="Select Value"
                    onValueChange={(value: string) =>
                      handleValueChange(index, value)
                    }
                    placeholder="Value"
                    size="regular"
                    value={
                      Array.isArray(condition.value)
                        ? condition.value.join(",")
                        : condition.value
                    }
                    multiSelect={selectedEntityObj?.multiple}
                  >
                    {values.map((val) => (
                      <SelectItem
                        key={val.id}
                        value={val.name}
                        showIndication={selectedEntityObj?.multiple}
                      >
                        {val.name}
                      </SelectItem>
                    ))}
                  </SelectMenu>
                )} */}
              </div>

              <div className=" flex md:flex-grow-0 ">
                {!(groupRef == 0 && index == 0) && (
                  <Button
                    size="small"
                    styleType="icon-borderless"
                    variant="neutral"
                    onClick={() => removeCondition(index)}
                  >
                    <TrashIcon />
                  </Button>
                )}
                {groupRef == 0 && index == 0 && <span className="w-8"></span>}
                {/* <Button
                  size="small"
                  styleType="icon-borderless"
                  variant="neutral"
                >
                  <EllipsisHorizontalIcon />
                </Button> */}
              </div>
            </div>

            {showErrorMessages &&
              selectedEntityObj?.id === "m_size" &&
              condition.value &&
              !isValidNumber(condition.value) && (
                <InputError>Error message comes here.</InputError>
              )}
          </React.Fragment>
        );
      })}

      {showErrorMessages && conditions.length > maxConditions && (
        <InputError>Error message comes here.</InputError>
      )}

      <div className="-mt-2 p-regular px-large bg-neutral-50 rounded-lg">
        <Button
          className="!font-semibold !normal-case"
          size="small"
          styleType="text"
          variant="primary"
          onClick={addCondition}
          disabled={
            !isUsageCalculationConditionsFilled(conditions) ? true : false
          }
        >
          <PlusIcon />
          Add OR condition
        </Button>
      </div>
    </div>
  );
};
