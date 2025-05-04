"use client";

import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ApiRunnerRequest } from "./ApiRunnerRequest";
import { ApiRunnerResponse } from "./ApiRunnerResponse";
import clsx from "clsx";

const requestCode = `
import chargebee
import json
chargebee.configure("{site_api_key}","{site}")
result = chargebee.Customer.update("__test__KyVnHhSBWlFGC2di",{ 
	"first_name" : "Denise",
	"last_name" : "Barone",     
	"locale" : "fr-CA"     
})
customer = result.customer
card = result.card
`;

const responseCode = `[ 
  "customer": {
    "allow_direct_debit": false,
    "auto_collection": "on",
    "card_status": "valid",
    "created_at": 1612891409,
    "currency_code": "USD",
    "email": "john.doe@example.com",
    "entity_code": "4",
    "first_name": "John",
    "id": "__test__KyVnHhSBWlFGC2di",
    "last_name": "Doe",
    "net_term_days": 0,
  }
 ]`;

export function ApiRunner({ className }: { className?: string }) {
  const reqRef = useRef<HTMLDetailsElement>(null);
  const resRef = useRef<HTMLDetailsElement>(null);
  const [reqToggleState, setReqToggleState] = useState(true);
  const [resToggleState, setResToggleState] = useState(true);

  const handleReqToggle = () => {
    const isOpen = reqRef.current?.open || false;
    setReqToggleState(isOpen);
  };

  const handleResToggle = () => {
    const isOpen = resRef.current?.open || false;
    setResToggleState(isOpen);
  };

  return (
    <div className={twMerge(className, "flex flex-col")}>
      <div
        className={clsx(
          reqToggleState && "h-[50%] bg-white/50",
          "overflow-y-auto px-2"
        )}
      >
        <ApiRunnerRequest
          reqRef={reqRef}
          handleReqToggle={handleReqToggle}
          reqToggleState={reqToggleState}
          requestCode={requestCode}
        />
      </div>
      <div
        className={clsx(
          resToggleState ? "h-[50%]" : "",
          "overflow-y-auto relative"
        )}
      >
        <ApiRunnerResponse
          resRef={resRef}
          handleResToggle={handleResToggle}
          resToggleState={resToggleState}
          responseCode={responseCode}
        />
      </div>
    </div>
  );
}
