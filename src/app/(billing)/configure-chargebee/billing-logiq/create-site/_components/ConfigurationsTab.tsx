import React, { useState, useEffect } from "react";
import {
  Notification,
  RadioButton,
  RadioGroup,
  Input,
  SelectMenu,
  SelectItem,
  Badge,
  Card,
} from "cb-sting-react-ts";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {useSiteCreateStore} from "@/app/(billing)/configure-chargebee/_store/create-site-store";

interface ConfigurationsTabProps {
  onConfigChange: (config: {
    siteType: string;
    configType: string;
    selectedSite?: string;
  }) => void;
}

export const ConfigurationsTab: React.FC<ConfigurationsTabProps> = ({
  onConfigChange,
}) => {
  const [siteType, setSiteType] = useState<string>("");
  const [configType, setConfigType] = useState<string>("default");
  const [copyExistingSite, setCopyExistingSite] = useState<boolean>(false);
  const {sites} = useSiteCreateStore();
  const [selectedSite, setSelectedSite] = useState<string>(sites[0]?.siteId);
  const handleSiteTypeChange = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    // Handle both standard React events and direct string values
    const newSiteType = typeof e === "string" ? e : e.target?.value || "";

    console.log("Site type changing to:", newSiteType);

    setSiteType(newSiteType);
    onConfigChange({
      siteType: newSiteType,
      configType: copyExistingSite ? "copy" : "default",
      ...(copyExistingSite && { selectedSite }),
    });
  };

  const handleConfigTypeChange = (isCopy: boolean) => {
    setCopyExistingSite(isCopy);
    const newConfigType = isCopy ? "copy" : "default";
    setConfigType(newConfigType);
    onConfigChange({
      siteType,
      configType: newConfigType,
      ...(isCopy && { selectedSite }),
    });
  };

  const handleSiteSelection = (value: string) => {
    console.log("Site selection:", value);
    setSelectedSite(value);
    onConfigChange({
      siteType,
      configType: "copy",
      selectedSite: value,
    });
  };

  // Helper to format the site URL based on the entered site type
  // Using the pattern: acmecorp-[siteType].chargebee.com
  const getFormattedSiteUrl = () => {
    const formattedType = siteType.trim()
      ? siteType.toLowerCase().replace(/\s+/g, "-")
      : "sandbox";
    return `acmecorp-${formattedType}.chargebee.com`;
  };

  return (
    <div className={"space-y-8"}>
      <Notification
        icon
        size="regular"
        variant="yellow"
        width="full"
        iconContent={
          <div className="">
            <InformationCircleIcon />
          </div>
        }
      >
        <span className="s-notification-copy">
          This site is valid for 30 days.
        </span>
      </Notification>

      <div className="flex items-start justify-between w-5/6">
        {/* Input container */}
        <div className="flex items-start self-stretch w-[300px]">
          <Input
            inputSize="regular"
            inputWidth="inline"
            label="default"
            labelText="Site type"
            messageText=""
            onChange={handleSiteTypeChange}
            placeholder="Eg: Sandbox"
            type="text"
            variant="input"
            value={siteType}
            data-testid="site-type-input"
          />
        </div>

        <div className="flex p-1 flex-col items-end border  border-gray-300 rounded-lg">
          <Card padding="none" background="transparent" depth="flat">
            <Card.Header
              alignItems="start"
              titleElement={
                <div className="flex flex-col ml-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#505458] font-inter font-normal">
                      Acme Corp
                    </span>
                    <Badge rounded={"small"} variant="yellow" mode="dark">
                      {siteType.toUpperCase() || "SANDBOX"}
                    </Badge>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">acmecorp-</span>
                    <span className="font-bold">
                      {siteType
                        ? siteType.toLowerCase().replace(/\s+/g, "-")
                        : "sandbox"}
                    </span>
                    .chargebee.com
                  </div>
                </div>
              }
            />
          </Card>
        </div>
      </div>

      <Card padding="none" background="transparent" depth="flat">
        <Card.Header
          alignItems="start"
          title="Configuration"
          description="Decide how settings like billing configurations, branding, and payment gateways should be set up for this site."
        />
      </Card>

      <div>
        <RadioGroup
          defaultValue={
            configType === "default"
              ? "option value Rich"
              : "option value Rich 2"
          }
          title="Choose the configuration type:"
          description=""
        >
          <RadioButton id="option1Rich" value="option value Rich">
            <label
              htmlFor="option1Rich"
              onClick={() => handleConfigTypeChange(false)}
            >
              <div>
                <h5 className={"font-inter font-normal"}>
                  Use default Chargebee configurations
                </h5>
                <p className={"font-inter font-normal text-neutral-500"}>
                  Use the standard settings provided by Chargebee right out of
                  the box.
                </p>
              </div>
            </label>
          </RadioButton>

          <RadioButton
            id="option2Rich"
            value="option value Rich 2"
            disabled={false}
            position="start"
          >
            <label
              htmlFor="option2Rich"
              onClick={() => handleConfigTypeChange(true)}
            >
              <div>
                <h5 className={"font-inter font-normal"}>
                  Copy from an existing site
                </h5>
                <p className={"font-inter font-normal text-neutral-500"}>
                  Import settings from an existing site to replicate its
                  behavior for more accurate testing.
                </p>
              </div>
            </label>
          </RadioButton>
        </RadioGroup>

        {copyExistingSite && (
          <div className={"w-[300px]"}>
            <SelectMenu
              label="default"
              labelText="Select existing site:"
              size="large"
              value={selectedSite}
              onValueChange={handleSiteSelection}
              widthMenu="wide"
            >
              {sites
                  .filter((site) => site.isActive && site.access.hasAccess)
                  .map((site) => (
                      <SelectItem key={site.siteId} value={site.siteId}>
                        {site.siteName}{" "}
                        <Badge rounded="small" variant={`${site.siteType === 'live' ? 'green' : 'yellow'}`} mode="dark">
                          {site.siteType.toUpperCase()}
                        </Badge>{" "}
                      </SelectItem>
                  ))
              }
            </SelectMenu>
          </div>
        )}
      </div>
    </div>
  );
};
