import React from 'react';
import {Button, OverFlowMenu, Popover, PopoverContent, PopoverTrigger} from 'cb-sting-react-ts';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { SiteData } from './SitesDetailsTable';
import { AccessRequest } from "@/app/(billing)/configure-chargebee/billing-logiq/sites/_components/AccessRequest";

interface ActiveSiteActionsProps {
    site: SiteData;
    onRequestAccess: (siteName: string) => void;
    onDeleteSite: (siteName: string) => void;
    accessSent: boolean;
}

const ActiveSiteActions: React.FC<ActiveSiteActionsProps> = ({
                                                                 site,
                                                                 onRequestAccess,
                                                                 accessSent,
                                                                 onDeleteSite
                                                             }) => {

    const getQuickActions = (siteName: string) => [
        {
            label: 'Transfer Configurations',
            value: 'transfer', // Added required value property
            action: () => alert(`Transferring configurations for ${siteName}`),
        },
        {
            label: 'Invite team members',
            value: 'invite', // Added required value property
            action: () => alert(`Inviting members to ${siteName}`),
        },
        {
            label: 'Clear data',
            value: 'clear', // Added required value property
            action: () => alert(`Clearing data for ${siteName}`),
        },
        {
            label: 'Delete site',
            value: 'delete', // Added required value property
            customclass: "!text-red-500",
            action: () => onDeleteSite(siteName),
        },
    ];

    const requestAccess = () => [
        {
            customclass: accessSent ? "max-w-80 !text-grey-100" : '',
            label: accessSent ? "Your access request has been sent to the site owner You'll receive an email invitation to the site once your request is approved." : 'Request Access',
            value: 'request-access', // Added required value property
            action: accessSent ? undefined : () => onRequestAccess(site.site), // Modified to call with site name
            disabled: accessSent,
        },
    ];

    return (
        <div>
            {site.access.hasAccess ? (<OverFlowMenu
                launchIcon={<EllipsisVerticalIcon /> }
                menuGroups={[
                    {
                        title: site.showOptions ? "" : "",
                        items: site.showOptions ? getQuickActions(site.site) : requestAccess()
                    },
                ]}
                position="left"
                variant="om-multiple"
            />) : (<Popover
                onOpenChange={() => {}}
            >
                <PopoverTrigger>
                    <Button styleType={'icon-borderless'} variant={'neutral'}>
                        <EllipsisVerticalIcon className={''}/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="center"
                    alignOffset={5}
                    className=" bg-white border  s-w-44  s-p-4 s-text-center s-rounded-lg shadow"
                    side="left"
                    sideOffset={5}
                >
                    <div className={'space-y-2'}>
                        <Button variant={'neutral'} disabled={accessSent} styleType={'outline'} onClick={()=>{onRequestAccess(site.site)}}>Request Access</Button>
                        {    accessSent  && (<p className={'text-left'}>Your access request has been sent to the site owner. You’ll receive an email invitation to the site once your request is approved.</p>)
                        }
                    </div>
                </PopoverContent>
            </Popover>)}

        </div>

    );
};

export default ActiveSiteActions;