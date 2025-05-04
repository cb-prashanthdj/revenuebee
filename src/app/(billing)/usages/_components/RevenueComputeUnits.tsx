"use client";
import React, { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {
    Card,Button,SHeader, SelectItem, SelectMenu
} from "cb-sting-react-ts";
import {RevenueChart} from '../detial/_components/RevenueChart';

const chartDatas  = [
    {
        "time": "Jan 1",
        "events": 1,
        "eventStart": "2024-01-01T00:00:00.000Z",
        "eventEnd": "2024-01-01T00:01:00.000Z"
    },
    {
        "time": "Jan 4",
        "events": 2,
        "eventStart": "2024-01-04T00:00:00.000Z",
        "eventEnd": "2024-01-04T00:02:00.000Z"
    },
    {
        "time": "Jan 6",
        "events": 1,
        "eventStart": "2024-01-06T00:00:00.000Z",
        "eventEnd": "2024-01-06T00:01:00.000Z"
    },
    {
        "time": "Jan 8",
        "events": 1,
        "eventStart": "2024-01-08T00:00:00.000Z",
        "eventEnd": "2024-01-08T00:01:00.000Z"
    },
    {
        "time": "Jan 10",
        "events": 3,
        "eventStart": "2024-01-10T00:00:00.000Z",
        "eventEnd": "2024-01-10T00:03:00.000Z"
    },
    {
        "time": "Jan 12",
        "events": 3,
        "eventStart": "2024-01-12T00:00:00.000Z",
        "eventEnd": "2024-01-12T00:03:00.000Z"
    },
    {
        "time": "Jan 14",
        "events": 0,
        "eventStart": "2024-01-14T00:00:00.000Z",
        "eventEnd": "2024-01-14T00:00:00.000Z"
    },
    {
        "time": "Jan 16",
        "events": 3,
        "eventStart": "2024-01-16T00:00:00.000Z",
        "eventEnd": "2024-01-16T00:03:00.000Z"
    },
    {
        "time": "Jan 18",
        "events": 1,
        "eventStart": "2024-01-18T00:00:00.000Z",
        "eventEnd": "2024-01-18T00:01:00.000Z"
    },
    {
        "time": "Jan 20",
        "events": 3,
        "eventStart": "2024-01-20T00:00:00.000Z",
        "eventEnd": "2024-01-20T00:03:00.000Z"
    },
    {
        "time": "Jan 22",
        "events": 4,
        "eventStart": "2024-01-22T00:00:00.000Z",
        "eventEnd": "2024-01-22T00:04:00.000Z"
    },
    {
        "time": "Jan 24",
        "events": 0,
        "eventStart": "2024-01-24T00:00:00.000Z",
        "eventEnd": "2024-01-24T00:00:00.000Z"
    },
    {
        "time": "Jan 26",
        "events": 3,
        "eventStart": "2024-01-26T00:00:00.000Z",
        "eventEnd": "2024-01-26T00:03:00.000Z"
    },
    {
        "time": "Jan 28",
        "events": 2,
        "eventStart": "2024-01-28T00:00:00.000Z",
        "eventEnd": "2024-01-28T00:02:00.000Z"
    }
]
export const RevenueComputeUnits = () => {
    return( <>
        <Card background="white" >
        
            <div className="h-56">
                <RevenueChart mode="multiple" interval={13} />
                
            </div>
           
        </Card>
      </>)
};
 