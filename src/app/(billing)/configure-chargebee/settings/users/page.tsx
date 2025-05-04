"use client";

import { NavigationItem } from "@/app/types/JumpToNavType";
import { CreateLayout } from "@/components/templates/CreateLayout";

import {
  Badge,
  Button,
  Card,
  Column,
  CreateHeader,
  CStackedItem,
  CStackedList,
  Grid,
  Link,
  Notification,
  OverFlowMenu,
} from "cb-sting-react-ts";
import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { SparklesIcon, LifeBuoy, PlusIcon, BookOpen } from "lucide-react";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
const CreateTestSitePage = () => {
  const { isTestSite } = useSiteConfigStore();

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

  return (
    <div>
      <CreateLayout>
        <Grid gap={"xxlarge"} className="p-xxlarge" cols={12}>
          <Column className=" space-y-8 " span={11}>
            {isTestSite && (
              <Notification
                size="regular"
                variant="yellow"
                width="full"
                close
                iconContent={<SparklesIcon />}
              >
                <h5 className="font-semibold ">Team members limit reached</h5>
                <p>
                  You have reached the maximum limit of 3 team members for your
                  account. To add more members, please contact Chargebee
                  Support.
                </p>
                <div className="flex pt-6 gap-6">
                  <li className={"list-none"}>
                    <Link
                      href={"#"}
                      size="small"
                      className="font-semibold !text-yellow-900 hover:underline flex gap-1 justify-center items-center cursor-pointer"
                      styleType="text"
                    >
                      <span>
                        <LifeBuoy />
                      </span>{" "}
                      Reach Out to Support
                    </Link>
                  </li>
                  <li className={"list-none"}>
                    <Link
                      href={"#"}
                      size="small"
                      className="font-semibold !text-yellow-900 hover:underline flex gap-1 justify-center items-center cursor-pointer"
                      styleType="text"
                    >
                      <span>
                        <BookOpen />
                      </span>{" "}
                      Learn more about team management
                    </Link>
                  </li>
                </div>
              </Notification>
            )}
            <div id="users" className={"space-y-8 "}>
              <Card padding={"none"} background="transparent" depth="none">
                <Card.Content>
                  <Card padding={"none"} className={"max-w-lg"}>
                    <CStackedList
                      border="solid"
                      divider
                      onItemClick={() => {}}
                      variant="dashed"
                    >
                      <CStackedItem
                        checked
                        id="p1"
                        leftAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="john@acmecorp.com"
                        actionElement={
                          <Button variant={"neutral"}>
                            <PlusIcon className="size-3 />" />
                            Invite Team Members
                          </Button>
                        }
                        titleElement={
                          <div>
                            John Doe{" "}
                            <Badge rounded="small" variant={"neutral"}>
                              Admin
                            </Badge>
                          </div>
                        }
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p2"
                        leftAvatar="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="john@acmecorp.com"
                        actionElement={
                          <OverFlowMenu
                            launchIcon={<EllipsisVerticalIcon />}
                            menuGroups={[
                              {
                                title: "Team Members",
                                items: [
                                  {
                                    action: "#",
                                    label: "List item",
                                    value: "li01",
                                  },
                                ],
                              },
                            ]}
                            position="left"
                            variant="om-multiple"
                          />
                        }
                        title="John Doe"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p3"
                        leftAvatar="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="john@acmecorp.com"
                        actionElement={
                          <OverFlowMenu
                            launchIcon={<EllipsisVerticalIcon />}
                            menuGroups={[
                              {
                                title: "Team Members",
                                items: [
                                  {
                                    action: "#",
                                    label: "List item",
                                    value: "li01",
                                  },
                                ],
                              },
                            ]}
                            position="left"
                            variant="om-multiple"
                          />
                        }
                        title="John Doe"
                        variant="default"
                      />
                    </CStackedList>
                  </Card>
                </Card.Content>
              </Card>
            </div>
          </Column>
        </Grid>
      </CreateLayout>
    </div>
  );
};

export default CreateTestSitePage;
