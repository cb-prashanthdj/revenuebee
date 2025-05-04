"use client";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Notification } from "cb-sting-react-ts";
import Link from "next/link";

export const MetricsNotification = () => {
  return (
    <>
      <Notification
        size="regular"
        variant="primary"
        width="full"
        icon
        className=""
        iconContent={
          <div className="">
            <InformationCircleIcon />
          </div>
        }
      >
        <h5 className="font-normal mt-0.5">
          <Link
            href="/usages/metrics/link-to-pricing/choose"
            className="font-bold underline underline-offset-[4px]"
          >
            Link pricing
          </Link>{" "}
          to this metered feature to monetize it.
        </h5>
      </Notification>
    </>
  );
};
