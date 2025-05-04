
'use client'
import React from 'react'
        
        import { Input, Button, Card, CheckList, Badge, RadioButton, RadioGroup, SHeader, Notification} from 'cb-sting-react-ts'
import{useForm} from "react-hook-form" 
import { SelectItem, SelectMenu } from 'cb-sting-react-ts';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './FormComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { MeteredSelectionNotification } from './MeteredSelectionNotification';



const CreatePlanForm = () => {
const formSchema = z.object({
    productFamily: z.string().min(2, {
    message: "productFamily must be at least 2 characters.",
  }),
  externalName: z.string(),
  internalName: z.string(),
  description: z.string(),
  planId: z.string(),
  isMeteredPlan: z.boolean(),
    meteredOption: z.string(),
    meteredFeature: z.string(),
    displaySelfServe: z.boolean(),
    displayInCheckout: z.boolean(),
    redirectUrl: z.string().url(),
})

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          productFamily: "",
          externalName: "",
          description: "",
          planId: "",
          isMeteredPlan: false,
          meteredOption: "",
          meteredFeature: "",
          displaySelfServe: false,
          displayInCheckout: false,
          redirectUrl: "",
        },
      })

      const [meteredOption, setMeteredOption] = React.useState<string>("");

  return (
    <Form {...form} >
    <form onSubmit={form.handleSubmit(console.log)} className="space-y-xxlarge ">

      <Card>
   <div className='space-y-large'>
   <FormField control={form.control} name="productFamily" render={({
      field
    }) => <FormItem>
          <FormLabel>Product Family</FormLabel>
          <FormControl>
          <SelectMenu size='large' {...field} value={field.value} name={field.name} onValueChange={field.onChange}>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectMenu>   
          </FormControl>
          {/* <FormDescription>
            This is your public display name.
          </FormDescription> */}
          <FormMessage />
        </FormItem>} />


       <div className='w-2/3'>
       <FormField control={form.control} name="externalName" render={({
      field
    }) => <FormItem>
          <FormLabel>External Name</FormLabel>
          <FormControl>
          <Input inputSize="large" type="text" {...field} />
          </FormControl>
          
          <FormDescription>
            This will be used in Self-Serve Portal
          </FormDescription> 
        </FormItem>} /></div>

        <div className='w-2/3'>
       <FormField control={form.control} name="internalName" render={({
      field
    }) => <FormItem>
          <FormLabel>Internal Name</FormLabel>
          <FormControl>
          <Input placeholder="" inputSize="large" type="text" {...field} />
          </FormControl>
          
          <FormDescription>
            This will be used in Self-Serve Portal
          </FormDescription> 
        </FormItem>} /></div>

        <div className='w-2/3'>
    <FormField control={form.control} name="description" render={({
      field
    }) => <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            {/* <Textarea {...field} /> */}
            <Input placeholder="" inputSize="large" type="text" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>} />
</div>

<div className='w-2/3'>

        <FormField control={form.control} name="description" render={({
      field
    }) => <FormItem>
          <FormLabel>Plan ID</FormLabel>
          <FormControl>
            {/* <Textarea {...field} /> */}
            <Input placeholder="" inputSize="large" type="text" {...field} />
          </FormControl>
          <FormDescription>
           Reference used by Chargebee to identify this plan
          </FormDescription>
          <FormMessage />
        </FormItem>} />
        </div>

        <div className='w-max' >
          <div className='flex gap-regular items center'>
          <CheckList align="horizontal" width="inline" listDescription="" onChangeLogic={() => {}} title="" variant="basic">

<CheckList.Item value="1" className=' flex gap-regular'>
This plan is metered  
</CheckList.Item>
</CheckList>

<Badge variant="neutral" > What is metering?</Badge>
          </div>
         
        </div>

        <div>
        <FormField control={form.control} name="meteredOption" render={({
      field
    }) => <FormItem>
          {/* <FormLabel>Metered Option</FormLabel> */}
          <FormControl>
            {/* <Textarea {...field} /> */}
            <RadioGroup
  align="horizontal"
  defaultValue=""
  description=""
  // onChangeLogic={() => {
   
  //   setMeteredOption(field.value);
  // }}
  title=""
  variant="contained"
>
  <RadioButton
    contained
    onClick={() => {
     setMeteredOption("inChargebee");
    }}
    id="option1Rich"
    richContent
    value="inChargebee"
  >
    <label htmlFor="option1Rich">
      <div>
        <h6>
        Metered in Chargebee
        </h6>
        <p>
        We meter usage consumption from events data you send in.
        </p>
      </div>
    </label>
  </RadioButton>
  <RadioButton
    contained
    onClick={() => {
      setMeteredOption("outChargebee");
     }}
    id="option2Rich"
    richContent
    value="outChargebee"
  >
    <label htmlFor="option2Rich">
      <div>
        <h6>
        Metered outside Chargebee
        </h6>
        <p>
        You take care of metering it, and send us consumption data for billing.
        </p>
      </div>
    </label>
  </RadioButton>
</RadioGroup>
          </FormControl>
          
          <FormMessage />
        </FormItem>} />

        {meteredOption === "inChargebee" && <>
          <div className='h-2'></div>
        <MeteredSelectionNotification>
          <div className='font-semibold'>To enable Chargebee to meter, set up Usage-Based Billing:</div>
          <ol className='mb-0 pb-0'>
            <li>Send usage events under Usages - Usage Events.</li>
            <li>Create metered features to calculate consumption.</li>
            <li>Link the metered features to this plan.</li>
            </ol>
        </MeteredSelectionNotification></>} 

        {meteredOption === "outChargebee" && <>
          <div className='h-2'></div>
        <MeteredSelectionNotification>
          <div>At the end of billing cycle, invoices will be generated in “Pending state”. You need to add usage data, review, and publish it.</div>
        </MeteredSelectionNotification></>} 
       
        </div>

        <div>
          <FormField control={form.control} name="meteredFeature" render={({
      field
    }) => <FormItem>
          <FormLabel>Choose Metered Feature you want to link to this Plan</FormLabel> 
          <FormControl>
              <SelectMenu
              >
              <SelectItem value="option1">AI Agent Conversations</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
             
              </SelectMenu>
          </FormControl>
          <FormMessage>
          After creating this plan, you will be able to set pricing and bill customers based on usage of this feature.
          </FormMessage>
        </FormItem>} />

    
        </div>
        <div>
        <Notification
  icon
  size="small"
  variant="neutral"
>
  <span className="s-notification-copy">
  You can add more features that are not metered under “Entitlements - Add Feature” after creating this plan
  </span>
</Notification>
        </div>




   </div>
   </Card>

<Card>
<Card.Header title='Customer Facing Info' />

  <FormField control={form.control} name="displaySelfServe" render={({
      field
    }) => <FormItem>
          
          <FormControl>
         
            <CheckList
    align="vertical"
    listDescription=""
    onChangeLogic={() => {}}
    selectedValues={[
      '1'
    ]}
    title=""
    variant="basic"
  >
   <CheckList.Item value="1">
      <div>Display in Self SServe</div>
      <div className='text-sm text-neutral-500'>
            This will be used in Self-Serve Portal
          </div> 
    </CheckList.Item>
  </CheckList>
           
          </FormControl>
          
         
        </FormItem>} />

        <FormField control={form.control} name="displaySelfServe" render={({
      field
    }) => <FormItem>
          
          <FormControl>
         
            <CheckList
    align="vertical"
    listDescription=""
    onChangeLogic={() => {}}
    selectedValues={[
      '1'
    ]}
    title=""
    variant="basic"
  >
   <CheckList.Item value="1">
      <div>Display in Checkout</div>
      <div className='text-sm text-neutral-500'>
            This will be used in Self-Serve Portal
          </div> 
    </CheckList.Item>
  </CheckList>
           
          </FormControl>
          
         
        </FormItem>} />

 <FormField control={form.control} name="description" render={({
      field 
 }) => <FormItem>
          <FormLabel>Redirect URL</FormLabel>
          <FormControl>
            {/* <Textarea {...field} /> */}
            <Input placeholder="" inputSize="large" type="text" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>} />

</Card>



 
  
  </form>
</Form>
  )
}

export  {CreatePlanForm}


