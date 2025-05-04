import React from 'react';
import {Button, Tooltip} from 'cb-sting-react-ts';
import {ContactSupport} from "@/app/(billing)/configure-chargebee/billing-logiq/sites/_components/ContactSupport";

interface ExpiredSiteActionsProps {
    site: string, // Changed from String to string
    contactSupported: boolean,
    setSupportContacted?: (siteName: string, status: boolean) => void
}

const SupportActions: React.FC<ExpiredSiteActionsProps> = ({
                                                               site,
                                                               contactSupported,
                                                               setSupportContacted
                                                           }) => {
    return (
        <Button
            onClick={() => {
            }}
            size="regular"
            styleType="text"
            variant="primary"
        >
            {contactSupported ? (
                <Tooltip
                    color="dark"
                    label="We've received your request to extend the usage of this site. Our support team will reach out to you shortly."
                    placement="bottom"
                    width="Regular"
                >
                    <Button
                        size="regular"
                        styleType="text"
                        variant="primary"
                        disabled={true}
                    >
                        Contact Support
                    </Button>
                </Tooltip>
            ) : (
                <ContactSupport SupportSite={site}/>
            )}
        </Button>
    );
};

export default SupportActions;