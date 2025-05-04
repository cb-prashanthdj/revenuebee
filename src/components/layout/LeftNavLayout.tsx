"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Box,
  Crown,
  Clipboard,
  PieChart,
  File,
  Grid,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Ellipsis,
  LogOut,
  Star,
  ChevronUp,
  Plus,
} from "lucide-react";
import { signInWithGoogle, logout, auth } from "../../firebase";
import FullPageLoader from "@/components/ui/FullPageLoader";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from "cb-sting-react-ts";
import cbLogo from "@/app/assets/img/cb-logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../app/store/auth/useAuthStore";
import { useSiteConfigStore } from "@/app/store/siteconfig/siteconfig-store";
import { BusinessEntitySwitcher } from "@/components/ui/BusinessEntitySwitcher";
import { useSiteCreateStore } from "@/app/(billing)/configure-chargebee/_store/create-site-store";

interface LeftNavLayoutProps {
  setLoading?: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

export const LeftNavLayout = ({ setLoading }: LeftNavLayoutProps) => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [openSection, setOpenSection] = useState("");
  const { isTestSite, currentTestSiteType, setCurrentTestSiteType, setIsTestSite } =
    useSiteConfigStore();
  const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(false);
  const siteMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const { sites } = useSiteCreateStore();

  const [siteInfo, setSiteInfo] = useState(() => {
    const selectedSite = sites.find((site) => site.siteType === currentTestSiteType);
    return {
      siteName: selectedSite?.siteName,
      site: selectedSite?.site ,
      siteType: selectedSite?.siteType,
    };
  });

  const otherAccounts = [
    { name: "SkyNet", count: "2 sites" },
    { name: "OsCorp", count: "1 site" },
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleNavItemClick = (url) => {
    if (url) {
      router.push(url);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    router.push("/sign-in");
  };

  const toggleSiteMenu = () => {
    setIsSiteMenuOpen(!isSiteMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        siteMenuRef.current &&
        !siteMenuRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsSiteMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [siteMenuRef, toggleButtonRef]);

  const handleSiteChange = (site,siteId) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (site.siteType !== "live") {
        setIsTestSite(true);
        setCurrentTestSiteType(site.siteType);
        console.log()
        const selectedSite = sites.find((s) => s.siteId === siteId);
        console.log("Sites", sites);
        console.log("selectedSite", selectedSite);
        setSiteInfo({
          siteName: selectedSite?.siteName,
          site: selectedSite?.site,
          siteType: selectedSite?.siteType,
        });
      } else {
        setIsTestSite(false);
        setCurrentTestSiteType(site.siteType);
      }
      router.push("/dashboard");
    }, 2000);
  };
  const getCurrentTestSite = (siteName: string) => {
    const foundSite = sites.find((site) => site.siteName === siteName);
    return foundSite ? foundSite.site : undefined;
  };
  const getSiteType = (siteName: string) => {
    const SiteCategory = sites.find((site) => site.siteName === siteName);
    return SiteCategory ? SiteCategory.siteType : undefined;
  };
  return (
    <div className="w-64 h-screen bg-white text-gray-800 fixed flex flex-col border-r shadow-md">
      {/* Fixed header section - not scrollable */}
      <div className="sticky top-0 z-10 bg-white p-2">
        <div className="relative">
          <div
            ref={toggleButtonRef}
            onClick={toggleSiteMenu}
            className="bg-[#002e3b] text-white p-2 flex rounded-md items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Image src={cbLogo} alt="Chargebee" className="w-6" />

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold m-0">
                    {siteInfo.siteName}
                  </p>
                  <span>
                    <Badge
                      variant={`${
                        isTestSite && siteInfo.siteType != "live"
                          ? "yellow"
                          : "green"
                      }`}
                      mode="dark"
                      rounded={"small"}
                    >
                      {siteInfo.siteType.toUpperCase()}
                    </Badge>
                  </span>
                </div>
                <p className="text-xs opacity-80 m-0 truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                  {siteInfo.site}
                </p>
              </div>
            </div>

            <div className="ml-auto">
              {isSiteMenuOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
          </div>

          {isSiteMenuOpen && (
            <div
              ref={siteMenuRef}
              className="absolute top-full h-[80vh] left-0 right-0 z-50 w-full rounded-b-md bg-white font-inter text-gray-700"
            >
              <div className="px-1 py-2 overflow-scroll rounded-md border">
                {sites.map((site, index) =>
                  site.isActive && site.access.hasAccess ? (
                    <div
                      key={index}
                      className="hover:bg-gray-100 cursor-pointer rounded-md"
                      onClick={() => handleSiteChange(site,site.siteId)}
                    >
                      <div className="flex items-center gap-2 p-2 ml-2">
                        <p className="m-0">{site.siteName}</p>
                        <span className={'text-xs'}>
                          <Badge
                            variant={`${
                              site.siteType != "live" ? "yellow" : "green"
                            }`}
                            rounded="small"
                            mode="dark"
                          >

                            {site.siteType.toUpperCase()}
                          </Badge>
                        </span>
                      </div>
                    </div>
                  ) : null
                )}
                <div className="border-t border-gray-200 my-2" />

                <div className="px-1 border-gray-200 hover:bg-gray-100 rounded-md">
                  <div
                    className="flex items-center justify-between py-2 cursor-pointer  px-3 "
                    onClick={() =>
                      handleNavItemClick(
                        "/configure-chargebee/billing-logiq/create-site"
                      )
                    }
                  >
                    <div className="flex items-center ">
                      <p className="text-base m-0">Create new site</p>
                    </div>
                    <Plus size={18} className="text-neutral-500"/>
                  </div>
                </div>

                <div className="px-1  border-gray-200 hover:bg-gray-100 rounded-md">
                  <div
                    className="flex items-center justify-between py-2 hover:bg-gray-100 cursor-pointer rounded-md px-3 "
                    onClick={() =>
                      handleNavItemClick(
                        "/configure-chargebee/billing-logiq/sites"
                      )
                    }
                  >
                    <p className="text-base m-0">Manage sites</p>
                    <ChevronRight size={18} className="text-neutral-500" />
                  </div>
                </div>

                <div className="px-1 border-gray-200 mt-2">
                  <p className="text-sm text-gray-500 m-0 px-3">
                    You can add up to 2 additional test sites to an account.{" "}
                    <span className="text-blue-600 cursor-pointer">
                      Learn more
                    </span>
                  </p>
                </div>
              </div>

              <div className=" py-1 border-gray-200">
                <p className="text-sm text-gray-500 px-2 py-2 m-0">
                  Other accounts you have access to
                </p>

                {otherAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="my-2 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between p-1 cursor-pointer px-3">
                      <div>
                        <p className="text-base font-medium text-gray-700 m-0">
                          {account.name}
                        </p>
                        <p className="text-sm text-gray-500 m-0">
                          {account.count}
                        </p>
                      </div>
                      <ChevronDown size={18} className="text-neutral-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content section */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto px-2">
          <BusinessEntitySwitcher />
          <input
            type="text"
            placeholder="Go to"
            className="w-full bg-white rounded-md p-2 mt-0 text-sm border focus:outline-none"
          />
          <div className="p-4 gap-0 mt-2 flex flex-col rounded-md ">
            <div className="flex font-bold items-center justify-between">
              <p className="leading-none flex items-center mb-1">
                <Crown className="mr-3" size={20} /> Setup Guide
              </p>
              <p className="text-xs text-gray-600 leading-none mb-1">0%</p>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-1">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
          <hr className="border-t border-gray-200 my-2" />

          <nav className={`mt-2 ${isSiteMenuOpen ? "invisible" : "visible"}`}>
            <ul className="flex flex-col gap-0 pl-0">
              <li
                className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavItemClick("/")}
              >
                <Home className="mr-3" size={20} />
                <span className="text-base font-semibold">Home</span>
              </li>
              <li
                className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavItemClick("/customers")}
              >
                <Users className="mr-3" size={20} />
                <span className="text-base font-medium">Customers</span>
              </li>
              <li
                className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavItemClick("/subscriptions")}
              >
                <Calendar className="mr-3" size={20} />
                <span className="text-base font-medium">Subscriptions</span>
              </li>
              <li>
                <div
                  onClick={() => toggleSection("invoices")}
                  className="flex justify-between items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex">
                    <FileText className="mr-3" size={20} />
                    <span className="text-base font-medium">
                      Invoices & Credit Notes
                    </span>
                  </div>
                  {openSection === "invoices" ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
                {openSection === "invoices" && (
                  <ul className="pl-12">
                    <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                      Invoices
                    </li>
                    <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                      Credit Notes
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div
                  onClick={() => toggleSection("usages")}
                  className="flex justify-between items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex">
                    <Box className="mr-3" size={20} />
                    <span className="text-base font-medium">Usages</span>
                  </div>
                  {openSection === "usages" ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
                {openSection === "usages" && (
                  <ul className="pl-12 space-y-1">
                    <li
                      className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => handleNavItemClick("/usages/get-started")}
                    >
                      Usages
                    </li>
                    <li
                      className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => handleNavItemClick("/usages/events")}
                    >
                      Usage Events
                    </li>
                    <li
                      className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => handleNavItemClick("/usages/metrics/list")}
                    >
                      Metered Feature
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div
                  onClick={() => toggleSection("productCatalog")}
                  className="flex justify-between items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex">
                    <Box className="mr-3" size={20} />
                    <span className="text-base font-medium">
                      Product Catalog
                    </span>
                  </div>
                  {openSection === "productCatalog" ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
                {openSection === "productCatalog" && (
                  <ul className="pl-12 space-y-1">
                    <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                      Product Families
                    </li>
                    <li
                      className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() =>
                        handleNavItemClick("/product-catalog/plans/list")
                      }
                    >
                      Plans
                    </li>
                    <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                      Addons
                    </li>
                    <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                      Charges
                    </li>
                    <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                      Coupons
                    </li>
                    <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                      Coupon Sets
                    </li>
                  </ul>
                )}
              </li>
              <li className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer">
                <Crown className="mr-3" size={20} />
                <span className="text-base font-medium">Entitlements</span>
              </li>
              <li className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer">
                <Clipboard className="mr-3" size={20} />
                <span className="text-base font-medium">Logs</span>
              </li>
              <li className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer">
                <PieChart className="mr-3" size={20} />
                <span className="text-base font-medium">RevenueStory</span>
              </li>
              <li className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer">
                <File className="mr-3" size={20} />
                <span className="text-base font-medium">Classic Reports</span>
              </li>
              <li
                className="flex items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavItemClick("/configure-chargebee/apps")}
              >
                <Grid className="mr-3" size={20} />
                <span className="text-base font-medium">Apps</span>
              </li>
              <div
                onClick={() => toggleSection("settings")}
                className="flex justify-between items-center p-1 pl-4 font-semibold hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex">
                  <Settings className="mr-3" size={20} />
                  <span className="text-base font-medium">Settings</span>
                </div>
                {openSection === "settings" ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {openSection === "settings" && (
                <ul className="pl-12 space-y-1">
                  <li
                    className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => handleNavItemClick("/configure-chargebee")}
                  >
                    Configure Chargebee
                  </li>
                  <li
                    className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() =>
                      handleNavItemClick(
                        "/configure-chargebee/settings/import-and-export"
                      )
                    }
                  >
                    Import & Export Data
                  </li>
                  <li
                    className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() =>
                      handleNavItemClick("/configure-chargebee/settings/users")
                    }
                  >
                    Team Members
                  </li>
                  <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                    Chargebee Notifications
                  </li>
                  <li className="p-1 text-base text-gray-600 hover:text-gray-800 cursor-pointer">
                    Security
                  </li>
                </ul>
              )}
            </ul>
          </nav>
        </div>

        {/* Footer - sticky at bottom of sidebar */}
        <div className="border-t sticky bottom-0 bg-white">
          <div className="flex flex-col ">
            <div className="flex items-center p-2 hover:bg-gray-100">
              <HelpCircle className="mr-2" size={18} />
              <span className="text-base font-medium">Need Help?</span>
            </div>
            {user && (
              <div className="flex items-center p-2 hover:bg-gray-100 gap-2 justify-auto">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {user.displayName[0]}
                </div>
                <span className="ml-2 text-base font-semibold overflow-hidden whitespace-pre mr-auto ">
                  {user.displayName}
                </span>
                <Popover onOpenChange={() => {}}>
                  <PopoverTrigger>
                    <Ellipsis size={20} className="" />
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    alignOffset={10}
                    arrow
                    arrowColour="s-fill-primary-50"
                    className=" s-bg-white mb-1  w-auto border h-64  s-text-center s-rounded-lg shadow"
                    side="right"
                    sideOffset={20}
                  >
                    <div className="text-left h-64 flex flex-col">
                      <p className="mb-0 border-b p-2">Give feedback</p>
                      <div className="flex p-2">
                        <div className="w-12 h-12 bg-blue-500 text-white text-2xl flex items-center justify-center font-bold">
                          {user.displayName[0]}
                        </div>
                        <span className="ml-2 text-base font-semibold overflow-hidden whitespace-nowrap flex flex-col">
                          {user.displayName}
                          <span className="font-normal">{user.email}</span>
                        </span>
                      </div>
                      <Button
                        size="regular"
                        styleType="text"
                        variant="neutral"
                        className="mt-auto text-left !justify-start"
                        fullWidth={true}
                      >
                        <Star className="mr-3" size={20} /> What's new
                      </Button>
                      <Button
                        onClick={() => handleSignOut()}
                        size="regular"
                        styleType="text"
                        variant="primary"
                        className="text-left !justify-start"
                        fullWidth={true}
                      >
                        <LogOut className="mr-3" size={20} /> Sign out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
