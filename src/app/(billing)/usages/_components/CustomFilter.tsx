'use client'

import { AdjustmentsVerticalIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, Card, SHeader,Input } from 'cb-sting-react-ts'
import React, { useState,useEffect,useRef } from 'react';
import {DatePicker} from "./DatePicker";
import { format, parse } from 'date-fns';

export const CustomFilter = ({onConditionsChange,onOk, onCancel}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({dateFrom:"", dateTo:""});
    const elementRef = useRef(null);
    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
    const handleSelectDate = (range) =>{
      setSelectedFilter(prvState => {
        return ({...prvState,dateFrom:range.from,dateTo:range.to, })
      })
      
    }
    const parseDate = (toFormat, date) => {
      if(date){
       const formatted = format(date, toFormat);

      return formatted;
    }
    }
    const handleOk = () => {
      setIsFilterOpen(false)
      onConditionsChange(selectedFilter.dateFrom,selectedFilter.dateTo);
      onOk(selectedFilter.dateFrom,selectedFilter.dateTo)
    }
    const handleCancel = () => {
      setIsFilterOpen(false)
      setSelectedFilter({dateFrom:"", dateTo:""})
    }
    useEffect(() => {
      const handleClickOutside = (event) => {
        console.error('clicked outside',isFilterOpen,elementRef.current);
        if (elementRef.current && !elementRef.current.contains(event.target)) {
          setIsFilterOpen(false)
        }
      };
      // Attach the event listener
      document.addEventListener('mousedown', handleClickOutside);
      // Clean up the event listener
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div >
      <Button 
                  variant="secondary" 
                  onClick={toggleFilter}
                >
                  Custom
                </Button>
          {/* <Button styleType="outline" size="regular" variant="neutral" onClick={toggleFilter}>
            <AdjustmentsVerticalIcon className="size-4" /> Filter
          </Button> */}
      <div ref={elementRef} className={`
       absolute top-10  w-1/3  z-10 transform transition-all duration-300
        ${isFilterOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}
      `} >
        <Card depth="raised" className='' >
        <SHeader type='card' title="Custom" actionElements={<Button size="small" styleType="text" variant="neutral" onClick={()=> setIsFilterOpen(false)}>
            <XMarkIcon className="size-4" />
            
            
        </Button>} />
        <div className="">
        <div className='flex flex-col gap-regular '>
          <div className='flex items-center gap-large justify-end'>
            <div className="w-1/12">
              From
            </div>
            <div className="w-5/12">
            <Input
              inputSize="regular"
              inputWidth="inline"
              label="hidden"
              labelText=""
              messageText=""
              onChangeLogic={function Qa() { }}
              placeholder=""
              type="text"
              variant="input"
              value={parseDate( "dd/MM/yyyy",selectedFilter.dateFrom)}
            />
            </div>
            <div className="w-4/12">
            <Input
              inputSize="regular"
              inputWidth="inline"
              label="hidden"
              labelText=""
              messageText=""
              onChangeLogic={function Qa() { }}
              placeholder=""
              type="text"
              variant="input"
              value={parseDate( "HH:mm:ss",selectedFilter.dateFrom)}
            /></div>
              <div  className="w-1/12">
              EST
            </div>
          </div>
          <div className='flex items-center gap-large pb-xlarge justify-end'>
            <div className="w-1/12">
              To
            </div>
            <div className="w-5/12">
            <Input
              inputSize="regular"
              inputWidth="inline"
              label="hidden"
              labelText=""
              messageText=""
              onChangeLogic={function Qa() { }}
              placeholder=""
              type="text"
              variant="input"
              value={parseDate( "dd/MM/yyyy",selectedFilter.dateTo)}
            />
            </div>
            <div className="w-4/12">
            <Input
              inputSize="regular"
              inputWidth="inline"
              label="hidden"
              labelText=""
              messageText=""
              onChangeLogic={function Qa() { }}
              placeholder=""
              type="text"
              variant="input"
              value={parseDate( "HH:mm:ss",selectedFilter.dateTo)}
            /></div>
              <div  className="w-1/12">
              EST
            </div>
          </div>
        
        </div>
        <div className=''>
        <DatePicker onOk={handleOk} onCancel={handleCancel} onChange={(range)=>{handleSelectDate(range)}}/>
        </div>
        
        </div>
        </Card>
      </div>
    </div>
  )
}

 CustomFilter
