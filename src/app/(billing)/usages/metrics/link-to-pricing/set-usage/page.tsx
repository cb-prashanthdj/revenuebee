"use client";
import { CreateLayout } from "@/components/templates/CreateLayout";
import {
  Button,
  Card,
  CreateHeader,
  Drawer,
  Grid,
  Input,
  Link,
  STable as Table,
  Tabs,
  TabsList,
  TabsContent,
} from "cb-sting-react-ts";
import React, { useEffect, useState } from "react";
import { DeleteIcon, Trash2, ArrowRightIcon, Info } from "lucide-react";
import { IncludedUsage } from "../_components/IncludedUsage";
import { OnDemandUsage } from "../_components/OnDemandUsage";
import { FrequencySideNav } from "../_components/FrequencySideNav";
import { useFrequencyStore } from "./../../../_store/frequency-store";

const LinkToPricing = () => {
  const { drawerStatus, selectedViewItem, handleCloseDrawer } =
    useFrequencyStore();

  return (
    <CreateLayout>
      <CreateLayout.Header>
        <CreateHeader
          title="Step 2: Set included usage"
          breadcrumbItems={[
            {
              name: "Metered Feature: AI Agent Conversations",
              href: "/usages/metrics/link-to-pricing/choose",
            },
          ]}
          actionItems={
            <div className="flex gap-regular">
              <Button variant="neutral">Cancel</Button>
              <Link
                className="m-auto"
                href={
                  "/usages/metrics/details/dashboard?status=success-pricing"
                }
                passHref
              >
                <Button size="regular">
                  {" "}
                  Link Pricing <ArrowRightIcon className="size-4" />
                </Button>
              </Link>
            </div>
          }
        />
      </CreateLayout.Header>

      <CreateLayout.Grid gridColumns={12} className="min-h-screen">
        <CreateLayout.Content span={9}>
          <Tabs defaultTabID="tab1" onValueChange={() => {}} tabId="tab1">
            <TabsList
              size="regular"
              tabStyle="lined"
              tabs={[
                { id: "tab1", title: "Included usage" },
                { id: "tab2", title: "On-demand usage" },
              ]}
              variant="horizontal"
              width="inline"
            />
            <TabsContent onValueChange={() => {}} tabId="tab1">
              <IncludedUsage />
            </TabsContent>
            <TabsContent onValueChange={() => {}} tabId="tab2">
              <OnDemandUsage />
            </TabsContent>
          </Tabs>
        </CreateLayout.Content>

        <CreateLayout.SideNav span={3} className="bg-neutral-50">
          <FrequencySideNav />
        </CreateLayout.SideNav>
      </CreateLayout.Grid>

      {drawerStatus !== "hide" && selectedViewItem && (
        <Drawer
          hasCloseIcon
          height="short"
          onClose={handleCloseDrawer}
          placement="right"
          show={drawerStatus}
          width="regular"
          title={`Currencies and variants: ${selectedViewItem.section} ${selectedViewItem.name}`}
        >
          <div className="">
            <p>
              All variants and currencies automatically inherit the included
              usage of the Scale plan with a "Daily" frequency. However, you can
              modify this setting if needed.
            </p>
            <div className="w-1/2">
              <Input
                inputSize="regular"
                inputWidth="inline"
                label="default"
                labelText="Label"
                onChangeLogic={() => {}}
                placeholder="Search"
                type="text"
                variant="search"
                withIcon
              />
            </div>
            <div>
              <CurrencyUsage />
            </div>
          </div>
        </Drawer>
      )}
    </CreateLayout>
  );
};

const CurrencyUsage = () => {
  const { selectedViewItem, handleCloseDrawer, updateModifiedCurrencies } =
    useFrequencyStore();

  const [currencies, setCurrencies] = useState([
    { currency: "USD", variant: "California", tokens: "", isModified: false },
    { currency: "USD", variant: "Others", tokens: "", isModified: false },
    { currency: "EUR", variant: "-", tokens: "", isModified: false },
    { currency: "AUD", variant: "-", tokens: "", isModified: false },
    { currency: "GBP", variant: "-", tokens: "", isModified: false },
    { currency: "INR", variant: "-", tokens: "", isModified: false },
    { currency: "JPY", variant: "-", tokens: "", isModified: false },
    { currency: "CAD", variant: "-", tokens: "", isModified: false },
    { currency: "AED", variant: "-", tokens: "", isModified: false },
  ]);

  const [hasModifications, setHasModifications] = useState(false);

  useEffect(() => {
    if (selectedViewItem?.tokens) {
      setCurrencies((prev) =>
        prev.map((currency) => ({
          ...currency,
          tokens: selectedViewItem.tokens,
          isModified: false,
        }))
      );
    }
  }, [selectedViewItem?.tokens]);

  const handleTokenChange = (value: string, index: number) => {
    setCurrencies((prev) => {
      const newCurrencies = [...prev];
      const isModified = value !== selectedViewItem?.tokens;
      newCurrencies[index] = {
        ...newCurrencies[index],
        tokens: value,
        isModified,
      };
      return newCurrencies;
    });
    setHasModifications(true);
  };

  const handleSave = () => {
    if (selectedViewItem) {
      const modifiedCurrenciesData = currencies
        .filter((c) => c.isModified)
        .map(({ currency, variant, tokens }) => ({
          currency,
          variant,
          tokens,
        }));

      const key = `${selectedViewItem.section}-${selectedViewItem.name}`;
      updateModifiedCurrencies(key, modifiedCurrenciesData);
      handleCloseDrawer();
    }
  };

  return (
    <div>
      <Table mode="light" border="full" className="border border-neutral-200">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell
              align="left"
              className="bg-neutral-50 font-inter font-medium !text-[14px]"
            >
              Currency
            </Table.HeaderCell>
            <Table.HeaderCell
              align="left"
              className="bg-neutral-50 font-inter font-medium !text-[14px]"
            >
              Variant
            </Table.HeaderCell>
            <Table.HeaderCell
              align="left"
              className="bg-neutral-50 font-inter font-medium !text-[14px] flex items-center gap-1"
            >
              Included usage
              <Info className="w-4 h-4 text-neutral-500" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {currencies.map((row, index) => (
            <Table.Row key={`${row.currency}-${index}`}>
              <Table.Cell align="left">{row.currency}</Table.Cell>
              <Table.Cell align="left">{row.variant}</Table.Cell>
              <Table.Cell align="left">
                <div className="flex items-center justify-end gap-2">
                  <Input
                    value={row.tokens}
                    onChange={(e: any) => {
                      if (e.target?.value) {
                        handleTokenChange(e.target.value, index);
                      }
                    }}
                    placeholder="Enter tokens"
                    type="text"
                  />
                  <span className="text-sm text-neutral-500">tokens</span>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {hasModifications && (
        <div className="flex justify-end gap-3">
          <Button variant="neutral" onClick={handleCloseDrawer}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      )}

      <div className="text-sm text-neutral-500 flex items-center gap-1">
        <Info className="w-4 h-4 text-neutral-500" /> You can add more variants
        and prices under this plan in the product catalog.
      </div>
      <div className="mt-4">
        <Button size="large" onClick={handleCloseDrawer}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default LinkToPricing;
