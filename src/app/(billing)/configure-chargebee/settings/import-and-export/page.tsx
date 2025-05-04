'use client';

import { CreateLayout } from '@/components/templates/CreateLayout';
import {
    Button,
    Tabs,
    TabsList,
    CreateHeader, TabsContent, Card, Badge, Tooltip, OverFlowMenu, CSelect
} from 'cb-sting-react-ts';
import React, {ReactNode} from 'react';
import SitesDetailsTable from "@/app/(billing)/configure-chargebee/billing-logiq/sites/_components/SitesDetailsTable";
import Link from "next/link";
import {ArrowLeftIcon, ArrowRightIcon,SquareArrowOutUpRight} from "lucide-react";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import {CardHeader} from "@/app/(billing)/subscriptions/_component/Header";
import SelectableRowList
    from "@/app/(billing)/configure-chargebee/settings/import-and-export/_components/SelectableRowList";
import {useSiteConfigStore} from "@/app/store/siteconfig/siteconfig-store";




const apiData = [
    {
        header: 'Barametrics',
        subText: 'whv2_16Bkx7Tku47qn3E',
        link: 'https://webhook.site/dca4de45-61c8-49c0-8736-5a69a5861ce7'
    },
    {
        header: 'Gmail',
        subText: 'whv2_16Bkx7Tku47qn3E',
        link: 'https://webhook.site/dca4de45-61c8-49c0-8736-5a69a5861ce7'
    },
    {
        header: 'Webhooks for events',
        subText: 'whv2_16Bkx7Tku47qn3E',
        link: 'https://webhook.site/dca4de45-61c8-49c0-8736-5a69a5861ce7'
    },
];


function CSelectItem(props: { value: string, children: React.ReactNode }) {
    return null;
}

const BulkOperationsPage = () =>{

    const [eventsState, setEventsState] = React.useState<boolean>(
        true);
    return (

        <CreateLayout>
            <CreateHeader
                // backAction={<Link href={'#'}><Button size="small" styleType="text" variant="neutral"><ArrowLeftIcon />{' '}Back</Button></Link>}
                //
                title="Import & Export Data"
                subtitle={"Bulk Operations"}
            />

            <CreateLayout.Grid gridColumns={11} className="min-h-screen px-6 mt-6">
                <CreateLayout.Content span={10} className={'space-y-8'}>
                    <div className={'space-y-8'}>
                    <Card padding={'none'} background="transparent" depth="none">
                        <Card.Content>
                            <div className={'space-y-6'}>
                                <h4 className={'font-light text-lg'}>CHOOSE AN OPERATION</h4>
                                <CSelect
                                    label="inline"
                                    labelText="Showing"
                                    onSearch={() => {}}
                                    onValueChange={() => {}}
                                    placeholder="Select an option"
                                    size="large"
                                    variant="stacked"
                                    widthMenu="inline"
                                >
                                    <CSelect.Item
                                        value="Option 1"
                                    >
                                        Option 1
                                    </CSelect.Item>
                                    <CSelect.Item
                                        value="Option 2"
                                    >
                                        Option 2
                                    </CSelect.Item>
                                    <CSelect.Item
                                        value="value 3"
                                    >
                                        Option 3
                                    </CSelect.Item>
                                </CSelect>
                            </div>
                        </Card.Content>
                    </Card>

                        <Card padding={"none"} background="transparent" depth="none">
                            <Card.Content>
                                <SelectableRowList/>
                            </Card.Content>
                        </Card>
                    </div>
                </CreateLayout.Content>
            </CreateLayout.Grid>
        </CreateLayout>
    );
};

export default BulkOperationsPage;
