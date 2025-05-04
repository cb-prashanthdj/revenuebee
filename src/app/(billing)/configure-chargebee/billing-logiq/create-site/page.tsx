"use client";
import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Column,
  CreateHeader,
  CStackedItem,
  CStackedList,
  Grid, Header,
} from "cb-sting-react-ts";
import { ConfigurationsTab } from "@/app/(billing)/configure-chargebee/billing-logiq/create-site/_components/ConfigurationsTab";
import { AddMemberModal } from "./_components/AddMemberModal";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import { useSiteCreateStore } from "@/app/(billing)/configure-chargebee/_store/create-site-store";
import { NavigationItem } from "@/app/types/JumpToNavType";
import LeftJumpToNav from "@/components/ui/LeftJumpToNav";
import { CreateSiteModal } from "@/app/(billing)/configure-chargebee/billing-logiq/create-site/_components/CreateSiteModal";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface SiteConfig {
  siteType: string;
  configType: "default" | "copy";
  selectedSite?: string;
}

const CreateTestSitePage = () => {
  const router = useRouter();
  const { teamMembers, setSiteType, sites } = useSiteCreateStore();

  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    siteType: "",
    configType: "default",
  });

  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);

  const [formErrors, setFormErrors] = useState<{
    siteType?: string;
    teamMembers?: string;
  }>({});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (siteConfig.siteType) {
      setSiteType(siteConfig.siteType);
    }

    if (attemptedSubmit) {
      validateForm();
    }
  }, [siteConfig, setSiteType, selectedTeamMembers, attemptedSubmit]);

  const navigationItems: NavigationItem[] = [
    {
      id: "section1",
      title: "Configurations",
      href: "#configurations",
      sectionId: "section-1",
      disabled: false,
    },
    {
      id: "section2",
      title: "Team Members",
      href: "#team_members",
      sectionId: "section-2",
      disabled: false,
    },
  ];

  const handleNavigate = (item: NavigationItem) => {
    console.log("Navigated to:", item.title);
  };

  const handleConfigChange = (config: SiteConfig) => {
    console.log("🔄 Config Updated:", config);
    setSiteConfig(config);

    if (attemptedSubmit) {
      if (config.siteType.trim() !== "") {
        setFormErrors((prev) => ({ ...prev, siteType: undefined }));
      } else {
        setFormErrors((prev) => ({ ...prev, siteType: "Site type is required" }));
      }
    }
  };

  const handleTeamMemberSelect = (id: string) => {
    let newSelectedMembers;
    if (selectedTeamMembers.includes(id)) {
      newSelectedMembers = selectedTeamMembers.filter(
          (memberId) => memberId !== id
      );
    } else if (selectedTeamMembers.length < 3) {
      newSelectedMembers = [...selectedTeamMembers, id];
    } else {
      return;
    }

    setSelectedTeamMembers(newSelectedMembers);

    if (attemptedSubmit) {
      if (newSelectedMembers.length > 0) {
        setFormErrors((prev) => ({ ...prev, teamMembers: undefined }));
      } else {
        setFormErrors((prev) => ({ ...prev, teamMembers: "At least one team member is required" }));
      }
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: { siteType?: string; teamMembers?: string } = {};

    if (siteConfig.siteType.trim() === "") {
      errors.siteType = "Site type is required";
    }

    if (selectedTeamMembers.length === 0) {
      errors.teamMembers = "At least one team member is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCancel = () => {
    console.log("Cancelling site creation");
    console.log("Current sites:", sites);
    router.back();
  };

  const disableAddMember = selectedTeamMembers.length >= 3;

  const handleFormSubmitAttempt = () => {
    setAttemptedSubmit(true);
    return validateForm();
  };

  return (
      <div>
        {/* Header with actions */}
        <CreateHeader
            actionItems={
              <div className="flex gap-regular">
                <Button variant="neutral" onClick={handleCancel}>
                  Cancel
                </Button>
                <CreateSiteModal
                    siteName={siteConfig.siteType}
                    selectedTeamMembers={selectedTeamMembers}
                    configType={siteConfig.configType}
                    selectedSite={siteConfig.selectedSite}
                    onSubmitAttempt={handleFormSubmitAttempt}
                />
              </div>
            }
            title="Create a new test site"
            subtitle="Use additional test sites to test features without impacting your current site."
        />

        {/* Page Content */}
        <Grid gap={"xxlarge"} className="p-xxlarge" cols={12}>
          {/* Left Sidebar Navigation */}
          <Column span={2}>
            <LeftJumpToNav
                navigationItems={navigationItems}
                title="Jump To"
                description="Navigate to different sections of the page"
                onNavigate={handleNavigate}
                className="my-custom-class"
                defaultTabId="section1"
                offset={80}
            />
          </Column>

          {/* Main Content */}
          <Column className="s-p-4" span={7}>
            {/* Configurations Section */}
            <section id="section-1">
              <ConfigurationsTab onConfigChange={handleConfigChange} />
              {attemptedSubmit && formErrors.siteType && (
                  <div className="text-red-500 mt-2">{formErrors.siteType}</div>
              )}
            </section>

            {/* Team Members Selection Section */}
            <section id="section-2" className={"space-y-8 mt-8"}>
              <Card
                  padding={"none"}
                  background="transparent"
                  depth="none"
                  className={"max-w-lg"}
              >
                <Card.Header
                    title="Team Members"
                    description={"Give team members admin access to this site."
                    }
                />
                <Card.Content>
                  {/* Display selected team members */}
                  {selectedTeamMembers.length > 0 && (
                      <Card padding={"none"}>
                        <CStackedList
                            border="solid"
                            divider
                            onItemClick={() => {}}
                            selectionType="multiple"
                            variant="dashed"
                        >
                          {selectedTeamMembers.map((id) => {
                            const member = teamMembers.find((m) => m.id === id);
                            // Add a check to ensure the member exists
                            if (!member) return null;

                            // Generate email based on name if not available
                            const email =
                                member.email ||
                                (member.name
                                    ? `${member.name
                                        .toLowerCase()
                                        .replace(/\s+/g, ".")}@example.com`
                                    : "email@example.com");

                            return (
                                <CStackedItem
                                    key={member.id}
                                    checked={true}
                                    id={member.id || ""}
                                    leftAvatar={member.leftAvatar || "https://via.placeholder.com/40"}
                                    onDelete={() =>
                                        handleTeamMemberSelect(member.id || "")
                                    }
                                    onItemClick={() => {}}
                                    subTitle={email} // Make sure email is displayed
                                    actionElement={
                                      <Badge variant="neutral">Admin</Badge>
                                    }
                                    title={member.name || "Unknown Member"}
                                    variant="default"
                                    trash
                                />
                            );
                          })}
                        </CStackedList>
                      </Card>
                  )}
                  {attemptedSubmit && formErrors.teamMembers && (
                      <div className="text-red-500 mt-2">
                        {formErrors.teamMembers}
                      </div>
                  )}

                  {/* Add Member Modal */}
                  <div className="pt-xlarge">
                    <AddMemberModal
                        disableAddMember={disableAddMember}
                        selectedTeamMembers={selectedTeamMembers}
                        setSelectedTeamMembers={setSelectedTeamMembers}
                        teamMembers={teamMembers}
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                  </div>
                </Card.Content>
              </Card>
            </section>
          </Column>
        </Grid>
      </div>
  );
};

export default CreateTestSitePage;