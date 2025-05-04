import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "cb-sting-react-ts";
import { ArrowRightLeft, Globe, Star, Building } from "lucide-react";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";

export const BusinessEntitySwitcher = () => {
  const { siteConfig, setActiveBusinessEntity } = useSiteConfigStore();
  const [switchPopover, setSwitchPopover] = useState(false);
  const switchBusinessEntity = (id) => {
    setActiveBusinessEntity(id);
    setSwitchPopover(false);
    console.log(`Switched to business entity with id: ${id}`);
  };
  const getBusinessEntity = (id) => {
    return siteConfig.businessEntity.find((entity) => entity.id == id);
  };
  return (
    <div className="flex items-center  hover:bg-gray-100 gap-2 justify-auto">
      <Popover onOpenChange={() => {}} open={switchPopover}>
        <PopoverTrigger className="w-full">
          <div className="py-2 text-left gap-2 flex rounded-md items-center justify-between w-full">
            <div className=" p-2">
              <Globe size={20} />
            </div>
            <div className="mr-auto">
              <p className="  m-0 leading-snug">
                {siteConfig.activeBusinessEntity == "SITE"
                  ? siteConfig.siteName + " (Site)"
                  : getBusinessEntity(siteConfig.activeBusinessEntity)
                      ?.name}{" "}
              </p>
              <p className="text-sm opacity-80 m-0 truncate leading-snug">
                {getBusinessEntity(siteConfig.activeBusinessEntity)?.timezone}
              </p>
            </div>
            <Button
              size="regular"
              styleType="text"
              variant="neutral"
              className="!text-left !justify-start"
              onClick={() => setSwitchPopover(!switchPopover)}
            >
              <ArrowRightLeft size={20} />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          alignOffset={10}
          arrow
          arrowColour="s-fill-primary-50"
          className=" s-bg-white w-52 border h-auto  s-text-center s-rounded-lg shadow"
          side="right"
          sideOffset={20}
        >
          <div className="text-left flex flex-col pb-0">
            <Button
              size="regular"
              styleType="text"
              variant="neutral"
              className={`!text-left !justify-start ${
                siteConfig.activeBusinessEntity == "SITE" && "!font-semibold"
              }`}
              fullWidth={true}
              onClick={() => {
                switchBusinessEntity("SITE");
              }}
            >
              <Building className="mr-3" size={20} /> {siteConfig.siteName}{" "}
              (Site)
            </Button>
            {siteConfig.businessEntity.map((entity) => (
              <Button
                size="regular"
                styleType="text"
                variant="neutral"
                className={`!text-left !justify-start ${
                  siteConfig.activeBusinessEntity == entity.id &&
                  "!font-semibold"
                }`}
                fullWidth={true}
                onClick={() => {
                  switchBusinessEntity(entity.id);
                }}
              >
                <Building className="mr-3" size={20} />
                {entity.name}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
