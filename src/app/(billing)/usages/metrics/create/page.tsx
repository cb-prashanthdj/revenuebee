"use client";

import { SelectItem, SelectMenu } from "@/components/ui/SelectMenu";
import {
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import { OperatorsValue } from "@/data/operatorWhenShowMetrics";
import {
  MetricGroupMethodsRuleCondition,
  MetricsEntities,
  MetricUsageAttributes,
} from "@/data/whenShowMetricsRule";
import {
  ArrowPathIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  Column,
  CreateHeader,
  Grid,
  Input,
  Link,
  Toggle,
  Tooltip,
} from "cb-sting-react-ts";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  Maximize2,
  Minus,
  MoveUpIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import CodeHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Drawer } from "vaul";
import { DataTypePicker } from "../../_components/DataTypePicker";
import { RuleBuilder as RuleBuilderComponent } from "../../_components/RuleBuilder";
import filteredResults from "./filtered.json";

const headerClassNames = {
  event_id: "whitespace-nowrap",
  subscription_id: "whitespace-nowrap",
  timestamp: "whitespace-nowrap",
  ticket_id: "whitespace-nowrap",
  agent_type: "whitespace-nowrap",
  ticket_resolved: "whitespace-nowrap",
  resolved_by: "whitespace-nowrap",
  resolution_type: "whitespace-nowrap",
  conversation_channel: "whitespace-nowrap",
  ai_tokens_used: "whitespace-nowrap",
  time_logged: "whitespace-nowrap",
  work_time_logged: "whitespace-nowrap",
  call_type: "whitespace-nowrap",
  call_country: "whitespace-nowrap",
};

const renderTableHeaders = () => {
  return Object.keys(headerClassNames).map((header, index) => {
    const headerKey = header as keyof typeof headerClassNames;
    const isValidHeader = headerKey in headerClassNames;
    if (isValidHeader) {
      return (
        <TableHeaderCell key={index} customClass={headerClassNames[headerKey]}>
          <span className="flex gap-1 items-center">
            {headerKey === "ticket_resolved"
              ? headerKey
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())
              : headerKey
                  .replace(/_/g, " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
          </span>
        </TableHeaderCell>
      );
    }
  });
};

function convertToSqlQuery(data) {
  let sqlParts = [];
  let whereConditions = [];
  console.log(data);
  data?.group.forEach((rule) => {
    if (rule.conditions) {
      rule.conditions.forEach((condition) => {
        let conditionStr = "";
        const conditionEntity = condition?.entity
          ?.replaceAll(" ", "_")
          .toLowerCase();
        switch (condition.operator) {
          case "Equals":
            conditionStr = `${conditionEntity} = '${condition.value}'`;
            break;
          case "Does Not Equal":
            conditionStr = `${conditionEntity} != '${condition.value}'`;
            break;
          case "Starts With":
            conditionStr = `${conditionEntity} LIKE '${condition.value}%'`;
            break;
          case "Contains":
            conditionStr = `${conditionEntity} LIKE '%${condition.value}%'`;
            break;
          case "Does Not Contain":
            conditionStr = `${conditionEntity} NOT LIKE '%${condition.value}%'`;
            break;
          case "Greater Than":
            conditionStr = `${conditionEntity} > ${condition.value ?? 0}`;
            break;
          case "Greater Than Or Equal":
            conditionStr = `${conditionEntity} >= ${condition.value}`;
            break;
          case "Less Than":
            conditionStr = `${conditionEntity} < ${condition.value}`;
            break;
          case "Less Than Or Equal":
            conditionStr = `${conditionEntity} <= ${condition.value}`;
            break;
        }
        if (condition.clause)
          conditionStr = ` ${condition.clause} ${conditionStr}`;
        whereConditions.push(conditionStr);
      });
    }

    const ruleValue = data?.value.replaceAll(" ", "_").toLowerCase();

    switch (data.method) {
      case "Sum":
        sqlParts.push(`SUM(${ruleValue})`);
        break;
      case "Count":
        sqlParts.push(`COUNT(${ruleValue})`);
        break;
      case "Min":
        sqlParts.push(`MIN(${ruleValue})`);
        break;
      case "Max":
        sqlParts.push(`MAX(${ruleValue})`);
        break;
      case "Unique":
        sqlParts.push(`COUNT(DISTINCT ${ruleValue})`);
        break;
      case "Avg":
        sqlParts.push(`AVG(${ruleValue})`);
        break;
    }
  });

  let sql = ` SELECT ${sqlParts.join(",\n")} FROM table_name
  WHERE  ${whereConditions.join("\n ")}
`;

  return sql;
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [metricsMeta, setMetricsMeta] = useState({ name: "" });

  const [code, setCode] = useState(`SELECT SUM (input_tokens) AS Qwen_2.5_input
FROM events
WHERE model_name = 'Qwen 2.5'
	AND model_size = '7B';`);

  const [hasCalculation, setHasCalculation] = useState(false);
  const [hasFilteredEvents, setHasFilteredEvents] = useState(false);
  const [prevPanelState, setPrevPanelState] = useState(false);
  const [conditionGroupCount, setConditionGroupCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
  const [isRightPreviewLoading, setIsRightPreviewLoading] = useState(false);
  useEffect(() => {
    if (hasCalculation) {
      setIsRightPreviewLoading(true);
    }
  }, [hasCalculation]);
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isRightPreviewLoading) {
      setTimeout(() => {
        setIsRightPreviewLoading(false);
      }, 2000);
    }
  }, [isRightPreviewLoading]);
  const handleMinimizedState = (state) => {
    setPrevPanelState(state);
  };
  const SkeletonRow = () => {
    return (
      <TableRow>
        {Array.from({ length: 2 }).map((_, index) => (
          <TableCell key={index}>
            <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
          </TableCell>
        ))}
      </TableRow>
    );
  };
  const updateResults = () => {
    setIsLoading(true);
  };
  return (
    <div className="">
      <CreateHeader
        actionItems={
          <div className=" flex gap-large">
            <Link href={"/usages/metrics/list"}>
              {" "}
              <Button styleType="outline" variant="neutral">
                Cancel
              </Button>
            </Link>
            <Link href={"/usages/metrics/details/dashboard?status=new"}>
              {" "}
              <Button disabled={!metricsMeta.name}>Create</Button>
            </Link>
          </div>
        }
        breadcrumbItems={[
          {
            href: "/billing/usages/events",
            name: "Metered Features",
          },
        ]}
        title="Create metered feature"
      />

      <Grid cols={12}>
        <Column
          span={8}
          className={`bg-white overflow-y-scroll ${
            prevPanelState ? "pb-32" : "pb-80"
          } p-xxlarge h-[calc(100dvh-90px)]`}
        >
          <MetricMeta onData={(val) => setMetricsMeta({ name: val })} />
          <hr className="mt-6 mb-10 bg-[#D6DADF]" />
          <UsageCalculationBlock
            setConditionGroupCount={setConditionGroupCount}
            setCode={setCode}
            setOpen={setOpen}
            setHasCalculation={setHasCalculation}
            setHasFilteredEvents={setHasFilteredEvents}
            isLoadingPreview={isLoadingPreview}
            setIsLoadingPreview={setIsLoadingPreview}
          />
        </Column>
        {hasCalculation && (
          <Column span={4} className="overflow-y-auto p-4">
            {isRightPreviewLoading && (
              <div
                role="status"
                className="w-full h-full flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {!isRightPreviewLoading && (
              <div className="font-semibold leading-5 text-lg">
                Usage calculation formula
              </div>
            )}
            {!isRightPreviewLoading && (
              <div className={`mt-4 rounded-md  `}>
                <CodeHighlighter
                  language="sql"
                  style={atomOneLight}
                  className="text-sm bg-white border"
                  customStyle={{
                    backgroundColor: "rgb(255,255,255)",
                    padding: "1rem",
                    borderRadius: "8px",
                    height: "100px",
                    width: "100%",
                  }}
                >
                  {code}
                </CodeHighlighter>
              </div>
            )}
            {/* calculation preview */}
            {!isRightPreviewLoading && (
              <div className={`mt-5`}>
                <div className="font-semibold leading-5 text-lg">
                  Usage calculation preview
                </div>
                <div className="text-neutral-500 text-sm mt-1">
                  This shows a sample of your meters computation
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <SelectMenu
                    widthMenu="inline"
                    placeholder="Select an option"
                    value="last_30_days"
                    onValueChange={updateResults}
                  >
                    <SelectItem value="last_7_days">Last 7 days</SelectItem>
                    <SelectItem value="last_30_days">Last 30 days</SelectItem>
                    <SelectItem value="last_90_days">Last 90 days</SelectItem>
                    <SelectItem value="last_365_days">Last 365 days</SelectItem>
                  </SelectMenu>
                  <ArrowPathIcon
                    onClick={() => setIsLoading(true)}
                    className=" cursor-pointer size-5"
                  />
                </div>
                <div className={`overflow-y-auto`}>
                  <TableRoot>
                    <TableHeader className="sticky top-0">
                      <TableRow>
                        <TableHeaderCell>Subscription ID</TableHeaderCell>
                        <TableHeaderCell>Usage count</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading &&
                        Array.from({ length: 10 }).map((_, index) => (
                          <SkeletonRow key={index} />
                        ))}
                      {!isLoading && (
                        <>
                          <TableRow>
                            <TableCell>sub_8702</TableCell>
                            <TableCell>1190</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_8008</TableCell>
                            <TableCell>1106</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_3956</TableCell>
                            <TableCell>513</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_8684</TableCell>
                            <TableCell>630</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_5290</TableCell>
                            <TableCell>764</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_1406</TableCell>
                            <TableCell>1095</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_8613</TableCell>
                            <TableCell>13087</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_3942</TableCell>
                            <TableCell>1290</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_9939</TableCell>
                            <TableCell>739</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_3461</TableCell>
                            <TableCell>1349</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_2955</TableCell>
                            <TableCell>870</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>sub_3132</TableCell>
                            <TableCell>854</TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </TableRoot>
                </div>
              </div>
            )}
          </Column>
        )}
        {!hasCalculation && (
          <Column span={`${4}`} className="overflow-y-auto p-4 w-full">
            <div className="p-large leading-5 text-base flex flex-col justify-center items-center h-full text-center w-full">
              Choose aggregation type and attribute on the left to preview the
              data
            </div>
          </Column>
        )}
      </Grid>

      {/* table sheet */}
      {hasCalculation && hasFilteredEvents && (
        <PreviewPanel
          isLoading={isLoadingPreview}
          setIsLoading={setIsLoadingPreview}
          renderTableHeaders={renderTableHeaders}
          filteredResults={filteredResults}
          hasNoData={conditionGroupCount == 3}
          hasError={conditionGroupCount > 3}
          setIsMinimizedState={handleMinimizedState}
        />
      )}

      {hasCalculation && (
        <Drawer.Root open={open} onOpenChange={setOpen} dismissible={true}>
          <div
            className={`fixed -bottom-20 left-[64px] right-0 bg-white shadow-lg transition-opacity ${
              open ? "opacity-0 delay-0" : "opacity-100 delay-[250]"
            }`}
          >
            <Drawer.Trigger className="w-full text-left p-4 font-semibold flex items-center justify-between">
              Preview of filtered events
              <MoveUpIcon className="w-4 h-4" />
            </Drawer.Trigger>
          </div>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-gray-100 flex flex-col mt-24 h-fit fixed bottom-0 left-[64px] right-0 outline-none">
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <Drawer.Title className="flex-shrink-0 mb-8 flex justify-between text-[1rem] items-center font-semibold">
                  Preview of filtered results
                  <div className="flex gap-2">
                    <Drawer.Close onClick={() => setOpen(false)}>
                      <Minus className="w-4 h-4" />
                    </Drawer.Close>
                    <Drawer.Close onClick={() => setOpen(false)}>
                      <XIcon className="w-4 h-4" />
                    </Drawer.Close>
                  </div>
                </Drawer.Title>
                <TableRoot>
                  <TableHeader>
                    <TableRow>{renderTableHeaders()}</TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((result, index) => {
                      return (
                        <TableRow key={index}>
                          {Object.keys(result).map((key, index) => {
                            switch (key) {
                              case "model_name":
                                return (
                                  <TableCell>
                                    <Badge rounded="small" variant="neutral">
                                      {result[key]}
                                    </Badge>
                                  </TableCell>
                                );
                              default:
                                return <TableCell>{result[key]}</TableCell>;
                            }
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </TableRoot>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </div>
  );
}

const MetricMeta = ({ onData }) => {
  return (
    <div>
      <div className="flex justify-between">
        <h4 className="text-lg mb-2">
          Enter a name for the feature you are metering
        </h4>
        <Link href="" className="font-semibold !mt-0">
          Add a description
        </Link>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-[40%]">
          <Input
            inputSize="large"
            inputWidth="inline"
            label=""
            messageText=""
            placeholder="Name of metered feature"
            type="text"
            variant="input"
            onChangeLogic={(val) => onData(val)}
          />
        </div>
        <div className="w-1/4">
          <Input
            inputSize="large"
            inputWidth="inline"
            label=""
            messageText=""
            placeholder="Unit of measure"
            type="text"
            variant="input"
          />
        </div>
        <Tooltip
          label={
            "Specifies the unit of measurement for the usage of this feature.  Ex: If the unit is 'Tokens', usage would measured in number of tokens."
          }
          color={"light"}
        >
          <InformationCircleIcon className="size-6" />
        </Tooltip>
      </div>
    </div>
  );
};
const InputError = ({ children }) => {
  return (
    <div className="flex gap-small items-center">
      <span className="s-icon s-error-icon">
        <InformationCircleIcon height={18} width={18} color="red" />
      </span>
      <span className="s-input-message s-error-message font-semibold">
        {children}
      </span>
    </div>
  );
};

const UsageCalculationBlock = ({
  setCode,
  setOpen,
  setHasCalculation,
  setHasFilteredEvents,
  setConditionGroupCount,
  isLoadingPreview,
  setIsLoadingPreview,
}) => {
  const [conditionsGroup, setConditionsGroup] = useState({
    method: "",
    value: "",
    group: [],
  });

  useEffect(() => {
    setIsLoadingPreview(true);

    let timeout = setTimeout(() => {
      setIsLoadingPreview(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [conditionsGroup]);

  const handleConditionsGroupChange = (updatedConditionsGroup) => {
    console.log(updatedConditionsGroup);
    setConditionsGroup(updatedConditionsGroup);
    setConditionGroupCount(updatedConditionsGroup.group.length);
    setCode(convertToSqlQuery(updatedConditionsGroup));
    const hasAnyCalculation =
      updatedConditionsGroup.method && updatedConditionsGroup.value;
    if (hasAnyCalculation) {
      const hasAnyFilteredEvents =
        updatedConditionsGroup?.group[0]?.conditions &&
        updatedConditionsGroup?.group[0].conditions[0]?.entity &&
        updatedConditionsGroup?.group[0].conditions[0]?.operator &&
        updatedConditionsGroup?.group[0].conditions[0]?.value != ""
          ? true
          : false;
      setHasFilteredEvents(hasAnyFilteredEvents);
    }

    setHasCalculation(hasAnyCalculation);
  };

  useEffect(() => {
    // Initial check for any existing calculations
    // const hasAnyCalculation = conditionsGroup.some(
    //   group => group.method && group.value
    // );
    const hasAnyCalculation = conditionsGroup.method && conditionsGroup.value;
    setHasCalculation(hasAnyCalculation);
  }, []);

  return (
    <div className="space-y-large">
      <div className="flex justify-between">
        <div className="space-y-0">
          <h5 className="h5">Usage calculation</h5>
          <p className="text-light text-sm">
            Define how usage is calculated in your billing model.
          </p>
        </div>

        <div className="flex gap-regular font-semibold">
          <Toggle> </Toggle>
          <span>SQL mode</span>
        </div>
      </div>
      <FilterConditionGroup
        conditionsGroup={conditionsGroup}
        setConditionsGroup={handleConditionsGroupChange}
        setOpen={setOpen}
        isLoadingPreview={isLoadingPreview}
        setIsLoadingPreview={setIsLoadingPreview}
      />
      {/* <ConditionGroup
        conditionsGroup={conditionsGroup}
        setConditionsGroup={handleConditionsGroupChange}
        setOpen={setOpen}
        
      /> */}
    </div>
  );
};
const Breadcrumbs = () => {
  return (
    <>
      <ol
        role="list"
        className="flex pl-0 mb-1 items-center space-x-4 list-none"
      >
        <li>
          <div className="flex items-center gap-3">
            <Link href={"/billing/usages/events"} className="font-semibold">
              Metered Features
            </Link>
            <svg
              className="size-4  text-neutral-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
      </ol>
    </>
  );
};
const FilterConditionGroup = ({
  conditionsGroup,
  setConditionsGroup,
  setOpen,
  isLoadingPreview,
  setIsLoadingPreview,
}) => {
  const [methods] = useState(MetricGroupMethodsRuleCondition);
  const [attributes] = useState(MetricUsageAttributes);
  const [isAddFilterCondition, setIsAddFilterCondition] = useState(false);
  const [dataType, setSelectedDataType] = useState("Number");
  const isUsageCalculationFilled = (condition) => {
    return condition.method && condition.value;
  };

  const isUsageCalculationConditionsFilled = (group) => {
    console.log(group);
    if (group?.conditions) {
      return group.conditions.some(
        (cond) => cond.entity && cond.operator && cond.value
      );
    } else {
      return false;
    }

    // return isUsageCalculationFilled(group);
  };
  const handleGroupValueChange = (value) => {
    const newConditionsGroup = { ...conditionsGroup };
    if (value?.includes("Select all")) {
      newConditionsGroup.value = ["Select all"];
    } else {
      const filteredValues = Array.isArray(value)
        ? value?.filter((val) => val !== "Select all")
        : value;
      newConditionsGroup.value = filteredValues;
      setIsAddFilterCondition(true);
    }
    console.log(newConditionsGroup.value);
    setConditionsGroup(newConditionsGroup);
  };
  const addConditionGroup = () => {
    const newConditions = { ...conditionsGroup };
    newConditions.group.push({
      conditions: [
        {
          hasFilterCondition: false,
          // conditions: [{ entity: "", operator: "", value: "" }],
        },
      ],
    });
    setConditionsGroup(newConditions);
  };
  const removeConditionGroup = (index) => {
    setConditionsGroup(conditionsGroup.filter((_, i) => i !== index));
  };
  const handleConditionsChange = (index, updatedConditions) => {
    console.log(updatedConditions);
    // setConditions(updatedConditions);

    const newConditions = { ...conditionsGroup };
    if (updatedConditions.length == 0) {
      newConditions.group.splice(index, 1);
    } else {
      newConditions.group[index].conditions = updatedConditions;
    }

    setConditionsGroup(newConditions);
  };
  const handleMethodChange = (value) => {
    const newConditions = { ...conditionsGroup };
    newConditions.method = value;
    newConditions.value = "";
    setConditionsGroup(newConditions);
  };
  const addFilterCondition = () => {
    const newConditions = { ...conditionsGroup };
    newConditions.group.push({
      conditions: [
        { entity: "", operator: "", value: "", hasFilterCondition: true },
      ],
    });
    setConditionsGroup(newConditions);
  };
  return (
    <>
      <Card className="space-y-xlarge w-4/5" depth="flat" padding="none">
        <Card
          className={`rounded-xl border-neutral-100 w-full `}
          depth=""
          padding="small"
        >
          <div className="flex flex-col md:flex-row bg-neutral-50 px-large p-regular border rounded-lg border-neutral-50  items-center gap-large ">
            <div className="md:w-[125px] font-semibold uppercase">
              Calculate
            </div>
            <div className="md:w-1/4">
              <SelectMenu
                label="hide"
                labelText="Select Aggregation"
                onValueChange={(value) => handleMethodChange(value)}
                placeholder="Aggregation"
                size="regular"
                value={conditionsGroup.entity}
              >
                {methods.map((entity: any) => (
                  <SelectItem key={entity.id} value={entity.method}>
                    {entity.method}
                  </SelectItem>
                ))}
              </SelectMenu>
            </div>
            <div className="md:w-1/4 font-semibold uppercase text-center">
              Of
            </div>
            <div className="md:w-1/4 [&_.s-selectmenu-trigger]:rounded-e-none [&>div:first-child]:flex-1 flex">
              <SelectMenu
                label="hide"
                labelText="Select Value"
                hasSearch={true}
                onValueChange={(value) => handleGroupValueChange(value)}
                placeholder="Attribute"
                size="regular"
                value={conditionsGroup?.value}
                disabled={!conditionsGroup.method}
                // multiSelect={selectedEntityObj?.multiple === true}
                // selectedValues={conditionG?.value}
              >
                {attributes.map((entity: any) => (
                  <SelectItem key={entity.id} value={entity.method}>
                    {entity.method}
                  </SelectItem>
                ))}
              </SelectMenu>
              <DataTypePicker
                disabled={!conditionsGroup.method}
                value={dataType}
                onChange={setSelectedDataType}
              />
            </div>
            <div className="flex-grow-0  flex md:flex-grow-0 md:w-10">
              {/* <Button
              size="small"
              styleType="icon-borderless"
              variant="neutral"
              // onClick={() => removeConditionGroup()}
            >
              <TrashIcon />
            </Button> */}
              {/* <Button
              size="small"
              styleType="icon-borderless"
              variant="neutral"
              // onClick={() => removeConditionGroup(indexG)}
            >
              <EllipsisHorizontalIcon />
            </Button> */}
            </div>
          </div>
        </Card>
        {/* filter conditions */}
        {isAddFilterCondition &&
          !(
            Array.isArray(conditionsGroup.group) &&
            conditionsGroup.group?.some(
              (gr) =>
                gr.conditions &&
                gr.conditions.some((cond) => cond.hasFilterCondition)
            )
          ) && (
            <Button
              size="small"
              styleType="text"
              onClick={() => addFilterCondition()}
              className="!normal-case"
            >
              <PlusIcon /> Add filter condition
            </Button>
          )}
        {Array.isArray(conditionsGroup.group) &&
          conditionsGroup.group?.some(
            (gr) =>
              gr.conditions &&
              gr.conditions.some((cond) => cond.hasFilterCondition)
          ) && (
            <div>
              <div className="space-y-0">
                <div className="flex justify-between !mt-large">
                  <div>
                    <h5 className="h5">Filter conditions</h5>
                    <p className="text-light text-sm">
                      Your calculation will be performed on the events filtered
                      by these conditions.
                    </p>
                  </div>

                  {false && (
                    <Button
                      styleType="text"
                      className="normal-case"
                      onClick={() => setOpen(true)}
                    >
                      Preview of filtered events
                    </Button>
                  )}
                </div>
              </div>
              {conditionsGroup.group.map((gr, ind) => (
                <>
                  <Card
                    padding="small"
                    className={`rounded-xl border-neutral-100 w-full `}
                  >
                    <RuleBuilderComponent
                      groupRef={ind}
                      entities={MetricsEntities}
                      operators={OperatorsValue}
                      conditions={gr.conditions}
                      setConditions={(conditionsChild) =>
                        handleConditionsChange(ind, conditionsChild)
                      }
                    />
                    {/* <RuleBuilder
          groupRef={ind}
          conditions={gr.conditions}
          setConditions={(conditionsChild) =>
            handleConditionsChange(ind,conditionsChild)
          }
        /> */}
                  </Card>
                  {conditionsGroup.group.length - 1 != ind && (
                    <GroupSeparator />
                  )}
                </>
              ))}
            </div>
          )}
        {/* filter conditions */}
      </Card>
      {/* isUsageCalculationConditionsFilled */}
      {/* {(isUsageCalculationFilled(conditionsGroup[conditionsGroup.length - 1]) && conditionsGroup[conditionsGroup.length - 1]?.conditions?.length > 0) &&  */}
      {isUsageCalculationConditionsFilled(
        conditionsGroup.group[conditionsGroup.group.length - 1]
      ) &&
        conditionsGroup.group?.length > 0 && (
          <Card padding="small">
            <Button
              className="!font-semibold !normal-case"
              size="small"
              styleType="text"
              onClick={addConditionGroup}
            >
              <PlusIcon /> Add AND condition group
            </Button>
          </Card>
        )}
    </>
  );
};
const GroupSeparator = () => {
  return (
    <div className="flex mt-regular mb-regular">
      <div className="border rounded-lg px-2 py-1 relative">
        <div className=" text-gray-800">AND</div>
      </div>
    </div>
  );
};

const PreviewPanel = ({
  renderTableHeaders,
  filteredResults,
  hasNoData,
  hasError,
  setIsMinimizedState,
  isLoading,
  setIsLoading,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [maximizedSize, setMaximizedSize] = useState("h-1/4");
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);
  useEffect(() => {
    setIsMinimizedState(isMinimized);
  }, [isMinimized]);
  const updateResults = () => {
    setIsLoading(true);
  };
  const SkeletonRow = () => {
    return (
      <TableRow>
        {Array.from({ length: 14 }).map((_, index) => (
          <TableCell key={index}>
            <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
          </TableCell>
        ))}
      </TableRow>
    );
  };
  const NoDataState = () => {
    return (
      <div className="flex justify-center items-center h-24">
        No data - message comes here.
      </div>
    );
  };
  const ErrorState = () => {
    return (
      <div className="flex justify-center items-center h-24">
        Error message comes here.
      </div>
    );
  };

  return (
    <div
      className={`w-full fixed transition-all duration-300 ease-in-out overflow-hidden   ${
        isMinimized
          ? "bottom-0 h-14 shadow-lg"
          : `bottom-0 ${maximizedSize} shadow-xl`
      } drop-shadow-2xl`}
    >
      {/* Top handle bar for dragging */}
      <div className="absolute -top-2 left-0 right-0 h-2 bg-white rounded-t-[10px] cursor-pointer hover:bg-neutral-100 ">
        <div className="w-16 h-1 bg-neutral-300 mx-auto rounded-full mt-0.5" />
      </div>

      <div className="bg-white h-full">
        {/* Header with title and minimize button */}
        <div className="flex justify-between items-center px-4 py-3 ">
          <div className="font-semibold flex gap-large items-center">
            Preview of filtered events
            {!hasNoData && !hasError && !isMinimized && (
              <SelectMenu
                widthMenu="inline"
                placeholder="Select an option"
                value="last_30_days"
                onValueChange={updateResults}
              >
                <SelectItem value="last_7_days">Last 7 days</SelectItem>
                <SelectItem value="last_30_days">Last 30 days</SelectItem>
                <SelectItem value="last_90_days">Last 90 days</SelectItem>
                <SelectItem value="last_365_days">Last 365 days</SelectItem>
              </SelectMenu>
            )}
          </div>
          {/* <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-neutral-100 rounded-md transition-colors mr-4"
          >
            {isMinimized ? (
              <MoveUpRightIcon className="w-4 h-4 text-neutral-600" />
            ) : (
              <Minus className="w-4 h-4 text-neutral-600" />
            )}
          </button> */}
          {isMinimized && (
            <div className="flex">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-neutral-100 rounded-md transition-colors "
              >
                <Maximize2 className="size-4 text-neutral-600" />
              </button>
            </div>
          )}
          {!isMinimized && (
            <div className="flex gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-neutral-100 rounded-md transition-colors "
              >
                <Minus className="size-4 text-neutral-600" />
              </button>
              {maximizedSize === "h-3/4" && (
                <button
                  onClick={() => setMaximizedSize("h-1/4")}
                  className="p-1 hover:bg-neutral-100 rounded-md transition-colors "
                >
                  <ArrowDownFromLine className="size-4 text-neutral-600" />
                </button>
              )}
              {maximizedSize !== "h-3/4" && (
                <button
                  onClick={() => setMaximizedSize("h-3/4")}
                  className="p-1 hover:bg-neutral-100 rounded-md transition-colors "
                >
                  <ArrowUpFromLine className="size-4 text-neutral-600" />
                </button>
              )}
            </div>
          )}
        </div>
        {hasNoData && <NoDataState />}
        {hasError && <ErrorState />}
        {/* Table content - only visible when not minimized */}
        {!hasNoData && !hasError && (
          <div
            className={`overflow-y-auto transition-opacity duration-300 ${
              isMinimized ? "opacity-0 h-0" : "opacity-100 h-[calc(100%-48px)]"
            }`}
          >
            <div className="max-h-[calc(100%)]  overflow-y-auto ">
              <TableRoot className="w-[calc(100%-2rem)] mt-0 border-collapse">
                <TableHeader className="sticky top-0 z-10">
                  <TableRow>{renderTableHeaders()}</TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading &&
                    Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonRow key={index} />
                    ))}
                  {!isLoading &&
                    filteredResults.map((result, index) => (
                      <TableRow key={index}>
                        {Object.keys(result).map((key, cellIndex) => {
                          switch (key) {
                            case "model_name":
                              return (
                                <TableCell key={cellIndex}>
                                  {result[key]}
                                </TableCell>
                              );
                            default:
                              return (
                                <TableCell key={cellIndex}>
                                  {result[key]}
                                </TableCell>
                              );
                          }
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </TableRoot>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
