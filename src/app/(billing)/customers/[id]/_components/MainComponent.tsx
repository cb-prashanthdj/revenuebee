'use client'
import React from 'react'
import { Button, Column, ContainedHeader, ContainedList, ContainedListItem, ContainedListItems, ContainedListValue, ContainedTitle, Grid, Header, Link, SHeader, Tabs, TabsList } from 'cb-sting-react-ts'
import { ArrowLeftIcon } from 'lucide-react'
import { RightActionPanel } from './RightActionPanel'


const MainComponent = () => {





  return (
   <div>
    <SHeader title="Customer Name" type='hero' />
      
      <Grid cols={12} className='gap-xlarge'>
        <Column span={2}>
          {/* <JumpToTabs /> */} s
        </Column>

        <Column span={7} className='bg-neutral-50'> Body</Column>
        <Column span={3}>
       <RightActionPanel />
        </Column>
      </Grid>
    
   </div>
  )
}

export default MainComponent
