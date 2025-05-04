"use client";

import { NavigationItem } from "@/app/types/JumpToNavType";
import { CreateLayout } from "@/components/templates/CreateLayout";
import LeftJumpToNav from "@/components/ui/LeftJumpToNav";
import {
  Badge,
  Banner,
  Button,
  Card,
  Column,
  CreateHeader,
  CStackedItem,
  CStackedList,
  Grid,
  Link,
  MBanner,
  Notification,
} from "cb-sting-react-ts";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
const AppPage = () => {
  const handleNavigate = (item: NavigationItem) => {
    console.log("Navigated to:", item.title);
  };
  const { isTestSite } = useSiteConfigStore();

  return (
    <div>
      <CreateLayout>
        <CreateHeader
          actionItems={
            <div className="flex gap-regular">
              <Button>
                {" "}
                Go to Marketplace{" "}
                <span>
                  <ArrowRight />
                </span>
              </Button>
            </div>
          }
          title="Apps"
        />

        <div className="bodyContent space-y-16">
          <div>
            <MBanner thumbnail="https://www.chargebee.com/docs/receivables/assets/screenshots/images/receivables-view/receivables-view-dashboard.png">
              <MBanner.Header>
                <MBanner.Title>
                  Find the right apps to complement your growing business
                </MBanner.Title>
              </MBanner.Header>
              <MBanner.Content>
                <MBanner.Text>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Wish to build for us?</span>
                    <span className="flex items-center gap-1">
                      <Link href={"#"}>Become a Developer Partner</Link>
                      <ExternalLink className={"text-blue-600"} size={13} />
                    </span>
                  </div>
                </MBanner.Text>
                <MBanner.Element>
                  <Button size="regular" styleType="default" variant="primary">
                    Go to Marketplace{" "}
                    <span>
                      <ArrowRight />{" "}
                    </span>
                  </Button>
                  <Button
                    onClick={() => {}}
                    size="regular"
                    styleType="text"
                    variant="neutral"
                  >
                    Dismiss
                  </Button>
                </MBanner.Element>
              </MBanner.Content>
            </MBanner>
          </div>

          <div className="">
            {isTestSite && (
              <Notification
                icon
                size="regular"
                variant="yellow"
                width="inline"
                iconContent={<InformationCircleIcon />}
              >
                <div className=" space-y-3 p-1 flex flex-col">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>
                      Your maximum limit on xyz has been reached. To increase
                      limit, please contact support.
                    </span>
                    <span className="flex items-center gap-1">
                      <Link href={"#"}>Request an Upgrade</Link>
                    </span>
                  </div>
                </div>
              </Notification>
            )}
          </div>

          <Card padding="none" background="transparent" depth="flat">
            <Card.Header alignItems="start" title="Apps Connected (3)" />
            <Card.Content>
              <div className={"w-1/3 space-y-8"}>
                <div>
                  You haven't installed any apps yet. Please visit Marketplace
                  to explore apps that complete your business workflows!
                </div>
                <Card padding="none">
                  <CStackedList
                    border="solid"
                    divider
                    onItemClick={() => {}}
                    selectionType="single"
                  >
                    <CStackedItem
                      checked
                      id="p1"
                      onDelete={function Qa() {}}
                      onItemClick={function Qa() {}}
                      actionElement={
                        <span
                          className={
                            "flex justify-center text-blue-600 items-center"
                          }
                        >
                          Manage <ChevronRight size={15} />
                        </span>
                      }
                      title="Quickbook"
                    />
                    <CStackedItem
                      checked
                      id="p2"
                      onDelete={function Qa() {}}
                      onItemClick={function Qa() {}}
                      actionElement={
                        <span
                          className={
                            "flex justify-center text-blue-600 items-center"
                          }
                        >
                          Manage <ChevronRight size={15} />
                        </span>
                      }
                      title="Salesforce"
                      variant="default"
                    />
                  </CStackedList>
                </Card>
              </div>
            </Card.Content>
          </Card>
        </div>
      </CreateLayout>
    </div>
  );
};

export default AppPage;
