"use client";

import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { SlidersHorizontal } from "lucide-react";

import { Badge, Button, Card, SHeader } from "cb-sting-react-ts";
import React, { useEffect, useState, useRef } from "react";
import { RuleBuilder } from "./RuleBuilder";
import { MetricsEntities } from "@/data/whenShowMetricsRule";
import { OperatorsValue } from "@/data/operatorWhenShowMetrics";

export const ConditionFilter = ({ onConditionsChange }) => {
  const elementRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [conditionsGroup, setConditionsGroup] = useState({
    method: "",
    value: "",
    group: [
      {
        conditions: [
          {
            entity: "",
            operator: "",
            value: "",
            hasFilterCondition: true,
          },
        ],
      },
    ],
  });
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
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
    onConditionsChange(newConditions);
  };
  const isUsageCalculationConditionsFilled = (group) => {
    console.log(group);
    if (group?.conditions) {
      return !group.conditions.some(
        (cond) => !cond.entity || !cond.operator || !cond.value
      );
    } else {
      return false;
    }

    // return isUsageCalculationFilled(group);
  };
  const addConditionGroup = () => {
    const newConditions = { ...conditionsGroup };
    newConditions.group.push({
      conditions: [
        {
          entity: "",
          operator: "",
          value: "",
          hasFilterCondition: true,
        },
      ],
    });
    setConditionsGroup(newConditions);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.error("clicked outside", isFilterOpen, elementRef.current);
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  return (
    <div>
      <Button
        styleType="outline"
        size="regular"
        variant="neutral"
        onClick={toggleFilter}
        className="px-large"
      >
        <SlidersHorizontal className="size-4" /> Filter
        <Badge variant="neutral" className="font-semibold">
          {
            conditionsGroup.group.reduce(
              (acc, group) =>
                acc.concat(
                  group.conditions.filter((condition) => condition.value !== "")
                ),
              []
            ).length
          }
        </Badge>
      </Button>
      <div
        ref={elementRef}
        className={`
       absolute top-10 left-0 w-2/3  z-10 transform transition-all duration-300
        ${
          isFilterOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }
      `}
        onMouseDown={stopPropagation}
      >
        <Card depth="raised" className="">
          <SHeader
            type="card"
            title="Filters"
            actionElements={
              <Button
                size="small"
                styleType="text"
                variant="neutral"
                onClick={() => setIsFilterOpen(false)}
              >
                <XMarkIcon className="size-4" />
              </Button>
            }
          />
          {conditionsGroup.group.map((gr, ind) => (
            <>
              <Card
                padding="small"
                className={`rounded-xl border-neutral-100 w-full `}
              >
                <RuleBuilder
                  groupRef={ind}
                  entities={MetricsEntities}
                  operators={OperatorsValue}
                  conditions={gr.conditions}
                  setConditions={(conditionsChild) =>
                    handleConditionsChange(ind, conditionsChild)
                  }
                />
              </Card>
            </>
          ))}
          {isUsageCalculationConditionsFilled(
            conditionsGroup.group[conditionsGroup.group.length - 1]
          ) &&
            conditionsGroup.group?.length > 0 && (
              <Button size="small" styleType="text" onClick={addConditionGroup}>
                <PlusIcon /> Add Condition Group
              </Button>
            )}
        </Card>
      </div>
    </div>
  );
};

ConditionFilter;
