import { AdjustmentsVerticalIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Button } from 'cb-sting-react-ts';
import React, { useState } from 'react'

const durationFilter = [
    { label: '1 min', value: '1min' },
    { label: '30 min', value: '30min' },
    { label: '1 hr', value: '1hr' },
    { label: '12 hr', value: '12hr' },
    { label: '24 hr', value: '24hr' }
  ];


function DurationFilter() {

    const [selectedTimeFilter, setSelectedTimeFilter] = useState('1hr');
    
  return (
    <div className="flex flex-col gap-regular">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-regular">
       
        <ul className="flex w-fit flex-shrink divide-x divide-neutral-100">
          {durationFilter.map((duration, index) => (
            <li
              key={duration.value}
              className={`py-small px-regular cursor-pointer border 
                ${selectedTimeFilter === duration.value ? 'bg-primary-50' : 'bg-white'}
                ${index === 0 ? 'rounded-l border-r-0' : ''}
                ${index === durationFilter.length - 1 ? 'rounded-r' : 'border-r-0'}
                ${index !== 0 && index !== durationFilter.length - 1 ? '' : 'border-r-1'}
              `}
            >
             <Button 
  variant="secondary" 
  onClick={(e) => {
    e.stopPropagation(); // Stop event bubbling
    console.log("Button inner click:", duration); // Add this
    // onClickHandler(duration);
  }}
>
  {duration.value}
</Button>
            </li>
          ))}
        </ul>
        <Button styleType="outline" size="regular" variant="neutral">
          <AdjustmentsVerticalIcon className="size-4" /> Filter
        </Button>
        {/* <div className={`font-semibold ${!failedState ? 'text-primary-400' : 'text-red-500'}`}>
          {failedState ? '6k' : timeRange.count} events
        </div> */}
      </div>

      <Button styleType="text" size="large" variant="neutral">
        <ViewColumnsIcon className="size-4" /> Edit Columns
      </Button>
    </div>
    
    {/* {selectedDuration && timeRange.start && (
      <div className="text-neutral-600">
        Showing {timeRange.count} events between {timeRange.start} and {timeRange.end} EST
      </div>
    )} */}
  </div>
  )
}

export { DurationFilter }
