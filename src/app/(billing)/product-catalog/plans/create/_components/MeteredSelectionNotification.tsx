'use client'

import React from 'react'
import {Notification} from 'cb-sting-react-ts'

type MeteredSelectionNotificationProps = {
   children: React.ReactNode
}

const MeteredSelectionNotification: React.FC<MeteredSelectionNotificationProps> = ({children}) => {
  return (
   
   <Notification
  icon
  size="small"
  variant="info"
>
  <span className="s-notification-copy">
    {children}
  </span>
</Notification>
   
  )
}

export  {MeteredSelectionNotification}
