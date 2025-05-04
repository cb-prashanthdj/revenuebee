'use client'

import { Card, Link } from "cb-sting-react-ts"
import { Trash2 } from "lucide-react"


interface FrequencyItemCardProps {
    title: string,
    usage: string,
    plan: string,
    productFamily: string
  }

export const FrequencyItemCard: React.FC<FrequencyItemCardProps> = ({ title, usage, plan, productFamily}) => {
    return (
      <Card>
        <Card.Header title={title} actionElement={<Link href='#'
    decoration="none"
    variant="neutral"
  >
    <Trash2 size={16} />
  </Link>} />
        <Card.Content>
        <div>Included usage: {usage}</div>
          <div>Plan: {plan}</div>
          <div>Product family: {productFamily}</div>
        </Card.Content>
      </Card>
    )
  }
  