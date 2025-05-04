"use client";

import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button, Badge, Notification, Link } from "cb-sting-react-ts";
import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
export const EntitlementsTable = () => {
  return (
    <>
      {/* <Notification
        size="regular"
        variant="neutral"
        width="full"
        icon
        iconContent={<InformationCircleIcon />}
      >
        <div className="text-sm text-gray-600">
          This card includes draft features while the corresponding API
          operation lists only active and archived features. Entitlements to
          draft features will come into effect and will be included in the API
          result when the feature is activated.
        </div>
      </Notification> */}
      <div className="mt-4">
        <table className="table mt-0">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-row-header-cell ">Features </th>
              <th className="table-row-header-cell  whitespace-nowrap">
                Entitlements
              </th>
              <th className="table-row-header-cell ">Status </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {/* */}
            <tr className="table-row">
              <td className="">
                <Link className="m-auto" href={"/usages/events"} passHref>
                  Shared Inbox{" "}
                </Link>
              </td>
              <td className="">Available</td>
              <td className="">
                <Badge variant="green">Active</Badge>
              </td>
            </tr>
            <tr className="table-row">
              <td className="">
                <Link
                  className="m-auto"
                  href={"/usages/metrics/details/dashboard"}
                  passHref
                >
                  AI Agent conversations
                </Link>
              </td>
              <td className="">200 conversations</td>
              <td className="">
                <Badge variant="green">Active</Badge>
              </td>
            </tr>
            <tr className="table-row">
              <td className="">
                <Link className="m-auto" href={"/usages/events"} passHref>
                  Agent Seats
                </Link>
              </td>
              <td className="">1 Seat</td>
              <td className="">
                <Badge variant="green">Active</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
