import { CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "cb-sting-react-ts";
import { Copy } from "lucide-react";
import React from "react";
import { eventData } from "./Properties";
import { format } from "date-fns";

// const jsonData = {
//   idempotencyKey: "6c5bf4ee-1199-44de-b1e2-05498cc89eb",
//   usageTimestamp: "1726768884",
//   subscriptionId: "SUB-001",
//   customerId: "CUST-001",
//   attributes: {
//     input_tokens: "1000",
//     output_tokens: "6000",
//     region: "EU",
//     productType: "chat_gpt"
//   }
// };
const EventsJson = () => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(JSON.stringify(eventData, null, 2));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto pt-4">
      <div className="mb-4 flex justify-between items-center ">
        <h2 className="s-h5">Event Payload</h2>

        <Button styleType="text" onClick={copyToClipboard}>
          {!copied ? (
            <Copy className="w-4 h-4" />
          ) : (
            <CheckIcon className="size-4" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      <div className="bg-primary-800 rounded-lg p-6 font-mono text-sm relative overflow-hidden">
        <pre className="text-white overflow-x-auto bg-transparent">
          <code className="">
            <span>{"{"}</span>
            <div className="pl-6">
              <div>
                <span className="text-blue-400">"event_Id"</span>
                <span className="text-white">: </span>
                <span className="text-green-400">"qw23222"</span>
                <span>,</span>
              </div>
              <div>
                <span className="text-blue-400">"sub_id"</span>
                <span className="text-white">: </span>
                <span className="text-green-400">"sub1"</span>
                <span>,</span>
              </div>
              <div>
                <span className="text-blue-400">"timestamp"</span>
                <span className="text-white">: </span>
                <span className="text-green-400">
                  {format(new Date(Date.now()), "dd MMM yyy, hh:mm a")}
                </span>
                <span>,</span>
              </div>
              <div>
                <span className="text-blue-400">"ticket_id"</span>
                <span className="text-white">: </span>
                <span className="text-green-400">"sn22ih11"</span>
                <span>,</span>
              </div>
              <div>
                <span className="text-blue-400">"agent_type"</span>
                <span className="text-white">: </span>
                <span className="text-green-400">"AI agent"</span>
                <span>,</span>
              </div>
              <div>
                <span className="text-blue-400">"conversation_channel"</span>
                <span className="text-white">: </span>
                <span className="text-green-400">"Chat"</span>
                <span>,</span>
              </div>
              <div>
                <span className="text-blue-400">"conversation_time"</span>
                <span className="text-white">: </span>
                <span className="text-green-400">""</span>
              </div>
            </div>
            <span>{"}"}</span>
          </code>
        </pre>
      </div>
    </div>
  );
};

export { EventsJson };
