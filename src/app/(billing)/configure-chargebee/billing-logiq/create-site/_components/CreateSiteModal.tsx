import React, { useState } from 'react';
import { SModal, Button } from 'cb-sting-react-ts';
import { useRouter } from "next/navigation";
import { useSiteCreateStore } from "@/app/(billing)/configure-chargebee/_store/create-site-store";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import Image from "next/image";
import ProcessingGif from "@/app/assets/img/CB-processing_Orange_v06.gif";

interface CreateSiteModalProps {
    siteName: string;
    selectedTeamMembers?: string[];
    configType?: "default" | "copy";
    selectedSite?: string;
    onSubmitAttempt?: () => boolean;
}

export const CreateSiteModal: React.FC<CreateSiteModalProps> = ({
                                                                    siteName,
                                                                    selectedTeamMembers = [], // Default to empty array if not provided
                                                                    configType = "default",   // Default to "default" if not provided
                                                                    selectedSite = null,      // Default to null if not provided
                                                                    onSubmitAttempt
                                                                }) => {
    const router = useRouter();
    const { addSite, sites } = useSiteCreateStore();
    const { setIsTestSite, setCurrentTestSiteType } = useSiteConfigStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const currentUserEmail = "admin@acmecorp.com";

    const handleCreateSite = () => {
        if (onSubmitAttempt && !onSubmitAttempt()) {
            return;
        }

        const formattedSiteType = siteName.trim()
            ? siteName.toLowerCase().replace(/\s+/g, "-")
            : "sandbox";

        const fullSiteUrl = `acmecorp-${formattedSiteType}.chargebee.com`;

        addSite(
            siteName,
            currentUserEmail,
            selectedTeamMembers,
            configType,
            selectedSite
        );


        setIsOpen(true);

        setTimeout(() => {
            setIsTestSite(true);
            setCurrentTestSiteType(formattedSiteType)
            router.push('/dashboard');
        }, 3000);

        console.log("Site created:", fullSiteUrl);
        console.log("Configuration:", configType === "default" ? "Default" : `Copied from ${selectedSite}`);
        console.log("Team members:", selectedTeamMembers);
        console.log("Existing sites are:", sites);
    };

    // const handlePreviewData = () => {
    //     if (onSubmitAttempt && !onSubmitAttempt()) {
    //         return;
    //     }
    //
    //     const previewData = {
    //         siteType: siteName,
    //         createdBy: currentUserEmail,
    //         teamMemberIds: selectedTeamMembers,
    //         configType,
    //         sourceSite: selectedSite || null
    //     };
    //
    //     console.log("Preview of site data:", previewData);
    //
    //     alert(JSON.stringify(previewData, null, 2));
    // };

    const handleSiteUpdate = (url: string) => {
        setIsTestSite(true);

        if (url) {
            router.push(url);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <div className="flex gap-regular">
            {/* Preview Button */}
            {/*<Button*/}
            {/*    variant="neutral"*/}
            {/*    styleType="outline"*/}
            {/*    onClick={handlePreviewData}*/}
            {/*>*/}
            {/*    Preview*/}
            {/*</Button>*/}

            {/* Create Button */}
            <Button variant='primary' onClick={handleCreateSite}>Create</Button>

            {/* Creating Site Modal */}
            <SModal.Root open={isOpen} onOpenChange={handleOpenChange}>
                <SModal.Content size={'small'} variant="default">
                    <SModal.Header>
                        <SModal.Title>
                            Creating a new test site
                        </SModal.Title>
                    </SModal.Header>
                    <SModal.Body className="p-8">
                        <div className="flex flex-col justify-center items-center space-y-8">
                            <Image src={ProcessingGif} alt="Processing..." width={50} height={50} />

                            <p className="text-center">
                                This process may take some time as your configurations are copied to the new site. You can safely leave this page. Once the site is ready, it will appear in your site switcher menu at the top-right corner.
                            </p>
                            <Button onClick={() => handleSiteUpdate('/dashboard')}>Go to Chargebee Home</Button>
                        </div>
                    </SModal.Body>
                </SModal.Content>
            </SModal.Root>
        </div>
    );
};