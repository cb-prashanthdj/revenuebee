import React from 'react'
import {SModal, Button, Input, Card, CStackedList, CStackedItem, SAlertDialog} from 'cb-sting-react-ts'
import { PlusIcon } from 'lucide-react'
import { useSiteCreateStore} from "@/app/(billing)/configure-chargebee/_store/create-site-store";

interface ContactSupportProps {
    SupportSite: string;
}

const ContactSupport: React.FC<ContactSupportProps> = ({SupportSite}) => {
    const { setContactedSupport } = useSiteCreateStore();

    const handleContactSupport = (siteName: string) => {
        setContactedSupport(siteName, true);
    };

    return (
        <SAlertDialog
            action={{
                elemenet: <Button size="regular">{' '}Request Support{' '}</Button>,
                label: 'Continue',
                onClick: () => {handleContactSupport(SupportSite)}
            }}
            cancel={{
                elemenet: <Button size="regular" styleType="outline" variant="neutral">{' '}Dismiss{' '}</Button>,
                label: 'Later',
                onClick: () => {}
            }}
            description="Our support team will be notified of your request. They will reach out to you shortly to discuss options for extending the usage of your expired sandboxes."
            title="Contact Support?"
            trigger={<Button styleType={'text'}>Contact Support</Button>}
        />
    )
}

export { ContactSupport }