'use client'

import { AdjustmentsVerticalIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, Card, SHeader,Input } from 'cb-sting-react-ts'
import React, { useState } from 'react';
import { DayPicker,getDefaultClassNames,DateRange } from "react-day-picker";
import "react-day-picker/style.css";
export const DatePicker = ({onOk, onCancel,onChange}) => {
    const defaultClassNames = getDefaultClassNames();
    const [range, setRange] = useState<DateRange | undefined>();

  const resetSelection = () => {
    setRange(undefined); // Clear the selected range
    onCancel();
  };
  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from) {
        // Set current time to the start date (from)
        const currentTime = new Date();
        range.from.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
      }
  
      if (range?.to) {
        // Set current time to the end date (to)
        const currentTime = new Date();
        range.to.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
      }
    setRange(range);
    onChange(range)
  };
    return(
        <div className='divide-y'><DayPicker
          mode="range"
          selected={range}
        onSelect={handleSelect}
          classNames={{
            weekday:`bg-white  text-sm font-light text-center`,
            weekdays:``,
            week_number_header:`bg-white `,
            months:`w-full `,
            month_grid:`w-full divide-y `,
            day_button:`${defaultClassNames.day_button} bg-primary-400 rounded-full !w-[35px] !h-[35px]`,
            day:`${defaultClassNames.day} bg-white !w-[35px] !h-[35px]`,
            range_start:`${defaultClassNames.range_start} bg-primary-400 `,
            today: `border-primary-400`, // Add a border to today's date
            selected: `bg-primary-400 border-primary-400  `, // Highlight the selected day
            root: `${defaultClassNames.root}  p-2 w-full`, // Add a shadow to the root element
            chevron: `${defaultClassNames.chevron} fill-primary-400` // Change the color of the chevron
          }}
        />
        <div className="pt-4 flex justify-end gap-large">
          <Button styleType="outline" variant="neutral" onClick={resetSelection}>Cancel</Button>
          <Button disabled={!(range?.from < range?.to)} onClick={onOk}>Apply</Button>
        </div>
        </div>
    )
};