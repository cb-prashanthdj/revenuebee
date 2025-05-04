'use client'

import { CreateLayout } from '@/components/templates/CreateLayout'
import { Button, Card, Column, CreateHeader, Grid, Link, SHeader, TabNavLink, TabNav, Tabs, TabsList } from 'cb-sting-react-ts'
import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { CreatePlanForm } from './_components/CreatePlanForm'


const CreatePlanPage = () => {

  const navigationTabs = <>
 <Tabs
  defaultTabID="tab1"
  onValueChange={() => {}}
  tabId="tab1"
>
  <TabsList
    size="regular"
    tabStyle="lined"
    tabs={[
      {
        id: 'tab1',
        title: 'Create a New Plan'
      },
      {
        
        id: 'tab2',
        title: 'Customer Facing Info'
      },
     
    ]}
    variant="vertical"
    width="full"
  />
 
</Tabs>
  </>
  return (
    <React.Fragment>
  

<CreateLayout>
  <CreateLayout.Header >
    <CreateHeader 
    title="Create a New Plan"
    breadcrumbItems={[{name: 'All Plans', href: '/billing/product-catalog/plans'}]}
    actionItems={
      <div className=' flex gap-regular'>
        <Button variant='neutral'>Dismiss</Button>
        <Button>Create</Button>
      </div>
    }
    />
  </CreateLayout.Header>
  <Grid cols={{ default:12 }} className=' min-h-screen '>
   <CreateLayout.TabsNav span={2}>{navigationTabs}</CreateLayout.TabsNav>
    <CreateLayout.Content span={6}>
      <CreatePlanForm />
    </CreateLayout.Content>
   
  </Grid>
</CreateLayout>


    </React.Fragment>
  )
}

export default CreatePlanPage
