"use client";

import React, { useState } from "react";
import { Badge } from "cb-sting-react-ts";

import {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { useSiteCreateStore } from "@/app/(billing)/configure-chargebee/_store/create-site-store";
import { AccessRequest } from "@/app/(billing)/configure-chargebee/billing-logiq/sites/_components/AccessRequest";
import ActiveSiteActions from "./ActiveSiteActions";
import DeleteSiteDialog from "./DeleteSiteDialog";
import SupportActions from "@/app/(billing)/configure-chargebee/billing-logiq/sites/_components/SupportActions";

export interface SiteData {
  site: string;
  createdBy?: string;
  expiresOn?: string;
  lastSync?: string;
  showOptions: boolean;
  isActive: boolean;
  siteType: string;
  contactedSupport: boolean;
  access: {
    hasAccess: boolean;
    accessRequested: boolean;
  };
}

export interface SitesDetailsTableProps {
  eventsState: string;
}

// Main component
const SitesDetailsTable: React.FC<SitesDetailsTableProps> = ({
  eventsState,
}) => {
  const [accessRequested, setAccessRequested] = useState<boolean>(false);
  const [accessSent, setAccessSent] = useState<boolean>(false);
  const [siteToDelete, setSiteToDelete] = useState<string | null>(null);
  const { sites, removeSite, setContactedSupport } = useSiteCreateStore();

  // Filter sites based on the `eventsState`
  const filteredSites = sites.filter((site) =>
    eventsState === "active" ? site.isActive : !site.isActive
  );

  const handleRequestAccess = () => {
    setAccessRequested(true);
  };
  const handleAccessSent = () => {
    setAccessSent(true);
    setAccessRequested(false);
  };

  const handleDeleteSite = (siteName: string) => {
    setSiteToDelete(siteName);
  };

  const handleConfirmDelete = () => {
    if (siteToDelete) {
      removeSite(siteToDelete);
      setSiteToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setSiteToDelete(null);
  };

  return (
    <div className="sites-table space-y-4">
      <TableRoot
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Sites</TableHeaderCell>
            <TableHeaderCell>Created by</TableHeaderCell>
            <TableHeaderCell>
              {eventsState === "active" ? "Expires on" : "Expired on"}
            </TableHeaderCell>
            {eventsState === "active" && (
              <TableHeaderCell>Last sync</TableHeaderCell>
            )}
            <TableHeaderCell>{' '}</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSites.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className={'flex gap-2'}>
                  {row.site}{" "}
                  <span>
                  <Badge
                      variant={row.siteType === "live" ? "green" : "yellow"}
                      rounded={"small"}
                      mode="dark"
                  >
                    {row.siteType}
                  </Badge>
                </span>
                </div>
              </TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>{row.expiresOn}</TableCell>
              {eventsState === "active" && (
                <TableCell>{row.lastSync}</TableCell>
              )}
              <TableCell>
                {eventsState === "active" ? (
                  <ActiveSiteActions
                    site={row}
                    accessSent={accessSent}
                    onRequestAccess={handleRequestAccess}
                    onDeleteSite={handleDeleteSite}
                  />
                ) : (
                  <SupportActions
                    site={row.site}
                    contactSupported={row.contactedSupport}
                    setSupportContacted={setContactedSupport}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>

      {/* Modals/Dialogs */}
      {accessRequested && (
        <AccessRequest
          handleAccessSent={handleAccessSent}
          AccessRequested={accessRequested}
          setAccessRequested={setAccessRequested}
        />
      )}

      {siteToDelete && (
        <DeleteSiteDialog
          isOpen={!!siteToDelete}
          siteName={siteToDelete}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default SitesDetailsTable;
