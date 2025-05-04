"use client";
import React, { useEffect, useState } from "react";
import { LightBulbIcon,InformationCircleIcon,ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import {
    Table,Button,Badge,Notification
} from "cb-sting-react-ts";
import { SparklesIcon } from "lucide-react";

export const MetricsInsights = () => {
    return(<> 
     <Notification
          size="regular"
          variant="primary"
          width="full"
          icon
          iconContent={<SparklesIcon />}
        >
          <h5 className="font-semibold ">Top Insights</h5>

          <ul className="leading-normal  !list-disc ">
            <li className="flex items-center">Forecasted Pay As You Go revenue at $250K end of the month <Button size="small" className="p-0" styleType="icon-borderless"><ChevronRightIcon className='size-4' /> </Button></li>
            <li className="flex items-center">Churn risk: Low usage detected for 20 customers. <Button size="small" className="p-0" styleType="icon-borderless"><ChevronRightIcon className='size-4' /> </Button></li>
            <li className="flex items-center">Upsell opportunity for 25 active customers <Button size="small" className="p-0" styleType="icon-borderless"><ChevronRightIcon className='size-4' /> </Button></li>
            <li className="flex items-center">Entitlements under-utilized by 70% customers <Button size="small" className="p-0" styleType="icon-borderless"><ChevronRightIcon className='size-4' /> </Button></li>
          </ul>
        </Notification>
    </>)
}