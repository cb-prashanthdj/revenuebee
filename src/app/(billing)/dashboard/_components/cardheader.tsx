import React from "react";
import { Card, Button, ContainedList } from "cb-sting-react-ts";
// import { EditIcon } from "../../assets/Icons"

export function CardHeader({
  title = "Header",
  action = "Update Address",
  showAction = false,
}) {
  return (
    <div className="card-header inside">
      <div>{title}</div>
      {showAction && (
        <Button
          onClick={function noRefCheck() {}}
          size="small"
          styleType="text"
          variant="neutral"
        >
          <EditIcon />
          {action}
        </Button>
      )}
    </div>
  );
}

const EditIcon = () => {
  return (
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
};
