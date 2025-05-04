"use client";

import { CreateLayout } from "@/components/templates/CreateLayout";
import { Button, Tabs, TabsList, CreateHeader } from "cb-sting-react-ts";
import React from "react";
import SitesDetailsTable from "@/app/(billing)/configure-chargebee/billing-logiq/sites/_components/SitesDetailsTable";
import {useRouter} from "next/navigation";

const SitesPage = () => {
  const [eventsState, setEventsState] = React.useState<"active" | "expired">(
    "active"
  );
  const router = useRouter();
  return (
    <CreateLayout>
      <CreateHeader
        breadcrumbItems={[
          { href: "/", name: "Configure Chargebee" },
          { href: "/create", name: "Billing LogIQ" },
          { href: "/sites", name: "Sites" },
        ]}
        actionItems={
          <div className="flex gap-regular">
            <Button variant="primary" onClick={()=>{router.push('/configure-chargebee/billing-logiq/create-site')}}>Create Test Site</Button>
          </div>
        }
        title="Sites"
      />

      <div className="bodyContent">
        <Tabs
          defaultTabID="active"
          tabId="active"
          onValueChange={(value: "active" | "expired") => {
            setEventsState(value);
          }}
        >
          <TabsList
            size="regular"
            tabStyle="lined"
            tabs={[
              { id: "active", title: "Active" },
              { id: "expired", title: "Expired" },
            ]}
            variant="horizontal"
          />
        </Tabs>
        <SitesDetailsTable eventsState={eventsState} />
      </div>
    </CreateLayout>
  );
};

export default SitesPage;
