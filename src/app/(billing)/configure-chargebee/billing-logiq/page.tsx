"use client";

import { NavigationItem } from "@/app/types/JumpToNavType";
import { CreateLayout } from "@/components/templates/CreateLayout";
import LeftJumpToNav from "@/components/ui/LeftJumpToNav";
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
import {ArrowLeftIcon, ChevronRight} from "lucide-react";
import React from "react";
import { ConfigurationsTab } from "@/app/(billing)/configure-chargebee/billing-logiq/create-site/_components/ConfigurationsTab";
import { CreateSiteModal } from "@/app/(billing)/configure-chargebee/billing-logiq/create-site/_components/CreateSiteModal";
import { AddMemberModal } from "@/app/(billing)/configure-chargebee/billing-logiq/create-site/_components/AddMemberModal";
import { BillingLogiqModal } from "@/app/(billing)/configure-chargebee/billing-logiq/_components/BillingLogiqModal";
import Link from "next/link";
const CreateTestSitePage = () => {
  const navigationItems: NavigationItem[] = [
    {
      id: "section1",
      title: "Customers & Subscriptions",
      href: "#customers_and_Subscriptions",
      sectionId: "section-1",
      disabled: false,
    },
    {
      id: "section2",
      title: "Billing & Invoices",
      href: "#billing_and_invoices",
      sectionId: "section-2",
      disabled: false,
    },
    {
      id: "section3",
      title: "Payments",
      href: "#payments",
      sectionId: "section-3",
      disabled: false,
    },
    {
      id: "section4",
      title: "Additional Settings",
      href: "#additional_settings",
      sectionId: "section-4",
      disabled: false,
    },
  ];

  const handleNavigate = (item: NavigationItem) => {
    console.log("Navigated to:", item.title);
  };

  return (
    <div>
      <CreateLayout>
        <CreateHeader
          actionItems={<div className="flex gap-regular"></div>}
          title="Configure Chargbee"
          subtitle="Billing LogIQ"
        />



        <Grid gap={"xxlarge"} className="p-xxlarge" cols={12}>
          <Column span={3} className={"space-y-8"}>
            <h4>Billing LogIQ</h4>
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
          {/*<Column*/}
          {/*    className="s-p-4"*/}
          {/*    span={2}*/}
          {/*>*/}

          {/*</Column>*/}
          <Column className="s-p-4 " span={9}>
            <section id="section-2" className={"space-y-8 mt-8"}>
              <Card padding={"none"} background="transparent" depth="none">
                <Card.Header title="Customers & Subscriptions" />
                <Card.Content>
                  <Card padding={"none"}>
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
                        subTitle="Configure how you want parent and child accounts to access child subscriptions from their Self-Serve Portal."
                        actionElement={<ChevronRight size={20} />}
                        title="Account hierarchy"
                      />
                      <CStackedItem
                        checked
                        id="p2"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Offer subscriptions as contracts. Set rules for how you want to handle subscriptions when contract term ends."
                        actionElement={<ChevronRight size={20} />}
                        title="Contract terms"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p3"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Add multiple coupons of the same type (percentage or fixed amount) in quotes and subscriptions."
                        actionElement={<ChevronRight size={20} />}
                        title="Multiple coupons for quotes & subscriptions"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p1"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Configure how you want parent and child accounts to access child subscriptions from their Self-Serve Portal."
                        actionElement={<ChevronRight size={20} />}
                        title="Account hierarchy"
                      />
                      <CStackedItem
                        checked
                        id="p2"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Offer subscriptions as contracts. Set rules for how you want to handle subscriptions when contract term ends."
                        actionElement={<ChevronRight size={20} />}
                        title="Contract terms"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p3"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Add multiple coupons of the same type (percentage or fixed amount) in quotes and subscriptions."
                        actionElement={<ChevronRight size={20} />}
                        title="Multiple coupons for quotes & subscriptions"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p1"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Manually add discounts in quotes and subscriptions as you create them."
                        actionElement={<BillingLogiqModal />}
                        title="Manual discounts for quotes & subscriptions"
                      />
                      <CStackedItem
                        checked
                        id="p2"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Offer subscriptions as contracts. Set rules for how you want to handle subscriptions when contract term ends."
                        actionElement={<ChevronRight size={20} />}
                        title="Contract terms"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p3"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Add multiple coupons of the same type (percentage or fixed amount) in quotes and subscriptions."
                        actionElement={<ChevronRight size={20} />}
                        title="Multiple coupons for quotes & subscriptions"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p1"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Configure how you want parent and child accounts to access child subscriptions from their Self-Serve Portal."
                        actionElement={<ChevronRight size={20} />}
                        title="Account hierarchy"
                      />
                      <CStackedItem
                        checked
                        id="p2"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Offer subscriptions as contracts. Set rules for how you want to handle subscriptions when contract term ends."
                        actionElement={<ChevronRight size={20} />}
                        title="Contract terms"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p3"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Add multiple coupons of the same type (percentage or fixed amount) in quotes and subscriptions."
                        actionElement={<ChevronRight size={20} />}
                        title="Multiple coupons for quotes & subscriptions"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p1"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Configure how you want parent and child accounts to access child subscriptions from their Self-Serve Portal."
                        actionElement={<ChevronRight size={20} />}
                        title="Account hierarchy"
                      />
                      <CStackedItem
                        checked
                        id="p2"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Offer subscriptions as contracts. Set rules for how you want to handle subscriptions when contract term ends."
                        actionElement={<ChevronRight size={20} />}
                        title="Contract terms"
                        variant="default"
                      />
                      <CStackedItem
                        checked
                        id="p3"
                        onDelete={function Qa() {}}
                        onItemClick={function Qa() {}}
                        subTitle="Add multiple coupons of the same type (percentage or fixed amount) in quotes and subscriptions."
                        actionElement={<ChevronRight size={20} />}
                        title="Multiple coupons for quotes & subscriptions"
                        variant="default"
                      />
                    </CStackedList>
                  </Card>
                </Card.Content>
              </Card>
            </section>
          </Column>
        </Grid>
      </CreateLayout>
    </div>
  );
};

export default CreateTestSitePage;
