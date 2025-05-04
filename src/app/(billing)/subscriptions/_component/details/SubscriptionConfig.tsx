import { ContainedList } from 'cb-sting-react-ts'
import React from 'react'

export type BillingDetail = {
    label: string;
    value: string | React.ReactNode;
  };

const SubscriptionConfig = ({ data }: { data: BillingDetail[] }) => {
  return (
    <ContainedList labels="block" padding="large" variant="basic">
      <ContainedList.Items>
        {data.map((detail) => (
          <ContainedList.Item key={detail.label} >
            <ContainedList.Label>{detail.label}</ContainedList.Label>
            <ContainedList.Value ><>{detail.value}</></ContainedList.Value>
          </ContainedList.Item>
        ))}
      </ContainedList.Items>
    </ContainedList>
  )
}

export default SubscriptionConfig
