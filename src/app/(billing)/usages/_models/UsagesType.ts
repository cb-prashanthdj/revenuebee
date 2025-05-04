export interface SuccessColumn {
  Header: string;
  accessor: keyof UsageEventSuccessData;
}
export interface FailedColumn {
  Header: string;
  accessor: keyof UsageEventFailedData;
}

export interface UsageEventFailedData {
  event_id?: string;
  failure_reason?: string;
  sub_id?: string;
  ticket_id?: string;
  agent_type?: string;
  timestamp?: string;
  attributes?: {
    language_pair?: string;
    model?: string;
  };
}
export interface UsageEventSuccessData {
  event_Id?: string;
  sub_id?: string;
  ticket_id?: string;
  agent_type?: string;
  conversation_status?: string;
  resolved_by?: string;
  resolved_type?: string;
  resolution_type?: string;
  AI_assisted?: string;
  resolution_time?: string;
  emails?: string;
  email_duration?: string;
  calls?: string;
  call_type?: string;
  call_duration?: string;
  model_name?: string;
  model_size?: string;
  timestamp?: Date;
  characters?: number;
  input_tokens?: number;
  output_tokens?: number;
  api_type?: string;
  resolution?: string;
  image_height?: number;
  image_width?: number;
  time_logged?: string;
  work_time_logged?: string;
  call_country?: string;
  ai_tokens_used?: string;
  conversation_channel?: string;
  ticket_resolved?: string;
}
export const EventSuccessColumns: SuccessColumn[] = [
  {
    Header: "Event ID",
    accessor: "event_Id" as keyof UsageEventSuccessData,
  },
  {
    Header: "Subscription ID",
    accessor: "sub_id" as keyof UsageEventSuccessData,
  },
  {
    Header: "Usage timestamp",
    accessor: "timestamp" as keyof UsageEventSuccessData,
  },
  {
    Header: "Ticket ID",
    accessor: "ticket_id",
  },
  {
    Header: "Agent type",
    accessor: "agent_type",
  },
  {
    Header: "Ticket Resolved",
    accessor: "ticket_resolved",
  },
  {
    Header: "Resolved by",
    accessor: "resolved_by",
  },
  {
    Header: "Resolution type",
    accessor: "resolution_type",
  },
  {
    Header: "Conversation channel",
    accessor: "conversation_channel",
  },
  {
    Header: "AI Assisted",
    accessor: "AI_assisted",
  },
  {
    Header: "Time logged",
    accessor: "time_logged",
  },
  {
    Header: "Conversation Time",
    accessor: "email_duration",
  },
  {
    Header: "Call type",
    accessor: "call_type",
  },
  {
    Header: "Call country",
    accessor: "call_country",
  },
];

export const EventFailedColumns: FailedColumn[] = [
  {
    Header: "event_id",
    accessor: "event_id" as keyof UsageEventFailedData,
  },
  {
    Header: "failure_reason",
    accessor: "failure_reason" as keyof UsageEventFailedData,
  },
  {
    Header: "sub_id",
    accessor: "sub_id" as keyof UsageEventFailedData,
  },
  {
    Header: "timestamp",
    accessor: "timestamp" as keyof UsageEventFailedData,
  },
  {
    Header: "attributes",
    accessor: "attributes" as keyof UsageEventFailedData,
  },
];

export interface UsageEventTableProps {
  eventState: "failed" | "success" | "processed";
  filteredDuration: string;
  refreshDatas?: number;
  customDuration?: {
    start: Date;
    end: Date;
  };
  onRender?: (data: { count: number }) => void;
  refreshState?: string;
}

export const UsageEventSuccessDataDemo = [
  {
    event_Id: "qw23222",
    sub_id: "sub1",
    timestamp: null,
    ticket_id: "sn22ih11",
    agent_type: "AI agent",
    conversation_channel: "Chat",
    conversation_time: "",
  },
  {
    event_Id: "qw24233",
    sub_id: "sub1",
    timestamp: null,
    ticket_id: "sn22ih12",
    agent_type: "AI agent",
    conversation_channel: "Chat",
    conversation_time: "",
  },
  {
    event_Id: "qw25324",
    sub_id: "sub2",
    timestamp: null,
    ticket_id: "sn22ih12",
    agent_type: "Human agent",
    conversation_channel: "Email",
    conversation_time: "",
  },
  {
    event_Id: "qw26425",
    sub_id: "sub2",
    timestamp: null,
    ticket_id: "sn22ih13",
    agent_type: "Human agent",
    conversation_channel: "Email",
    conversation_time: "",
  },
  {
    event_Id: "qw27526",
    sub_id: "sub2",
    timestamp: null,
    ticket_id: "sn22ih14",
    agent_type: "Human agent",
    conversation_channel: "Call",
    conversation_time: "",
  },
];

export const UsageEventSuccessRefreshDataDemo = [
  {
    event_Id: `qw212e1`,
    sub_id: `sub1`,
    timestamp: null,
    ticket_id: `sn22ih11`,
    agent_type: `AI agent`,
    ticket_resolved: "TRUE",
    resolved_by: `AI agent`,
    resolution_type: `Hard Resolution`,
    AI_assisted: ``,
    conversation_channel: 'Chat',
    resolution_time: `53 sec`,
    emails: ``,
    email_duration: `3 min`,
    calls: ``,
    call_type: "",
    call_duration: ``,
    // call_country: null,
  },
  {
    event_Id: `qw222e2`,
    sub_id: `sub1`,
    timestamp: null,
    ticket_id: `sn22ih12`,
    agent_type: `AI agent`,
    ticket_resolved: "FALSE",
    resolved_by: `AI agent`,
    resolution_type: `Soft Resolution`,
    AI_assisted: ``,
    conversation_channel: 'Chat',
    resolution_time: ``,
    emails: ``,
    email_duration: `2 min`,
    calls: ``,
    call_type: "",
    call_duration: ``,
    // call_country: null,
  },
  {
    event_Id: `qw232e3`,
    sub_id: `sub2`,
    timestamp: null,
    ticket_id: `sn22ih13`,
    agent_type: `Human agent`,
    ticket_resolved: "TRUE",
    resolved_by: ``,
    resolution_type: ``,
    AI_assisted: `FALSE`,
    conversation_channel: 'Email',
    resolution_time: ``,
    emails: `3`,
    email_duration: `45 min`,
    calls: `2`,
    call_type: "Toll Free",
    call_duration: `22 min`,
    // call_country: null,
  },
  {
    event_Id: `qw242e4`,
    sub_id: `sub2`,
    timestamp: null,
    ticket_id: `sn22ih14`,
    agent_type: `Human agent`,
    ticket_resolved: "TRUE",
    resolved_by: `Human agent`,
    resolution_type: `Hard Resolution`,
    AI_assisted: `TRUE`,
    conversation_channel: 'Call',
    resolution_time: ``,
    emails: `3`,
    email_duration: `23 min`,
    calls: `2`,
    call_type: "Toll Free",
    call_duration: `22 min`,
    // call_country: null,
  },
];

