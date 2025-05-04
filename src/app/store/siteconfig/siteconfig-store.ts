import { create } from "zustand";
import siteConfigData from "./siteconfig.json";
import sitesData from "../../(billing)/configure-chargebee/_store/sites.json";

interface BusinessEntity {
  id: string;
  name: string;
  businessType: string;
  country: string;
  timezone: string;
  taxId: string;
  currency: string;
}

interface SiteConfig {
  siteName: string;
  activeBusinessEntity?: string;
  businessEntity: BusinessEntity[];
}

interface SiteConfigStore {
  siteConfig: SiteConfig;
  isNewSite: boolean;
  isTestSite: boolean;
  currentTestSiteType: string;
  setActiveBusinessEntity: (id: string) => boolean;
  getActiveBusinessEntity: () => BusinessEntity | undefined;
  getAllBusinessEntities: () => BusinessEntity[];
  setIsNewSite: (value: boolean) => void;
  setIsTestSite: (value: boolean) => void;
  getIsTestSite: () => boolean;
  setCurrentTestSiteType: (siteName: string) => void;
  getCurrentTestSiteType: () => string;
}

export const useSiteConfigStore = create<SiteConfigStore>((set, get) => ({
  siteConfig: siteConfigData,
  isNewSite: false,
  isTestSite: false,
  currentTestSiteType: 'live',

  setIsNewSite: (value: boolean) => {
    set({ isNewSite: value });
  },

  setIsTestSite: (value: boolean) => {
    set({ isTestSite: value });
  },

  getIsTestSite: () => {
    return get().isTestSite;
  },

  setCurrentTestSiteType: (siteType: string) => {
    set({ currentTestSiteType: siteType });
  },

  getCurrentTestSiteType: () => {
    return get().currentTestSiteType;
  },

  setActiveBusinessEntity: (id: string) => {
    const businessEntities = get().siteConfig.businessEntity;
    const entityExists = businessEntities.some((entity) => entity.id === id);

    if (id !== "SITE" && !entityExists) {
      console.error(`Business entity with ID ${id} not found`);
      return false;
    }

    set((state) => ({
      siteConfig: {
        ...state.siteConfig,
        activeBusinessEntity: id,
      },
    }));

    return true;
  },

  getActiveBusinessEntity: () => {
    const { siteConfig } = get();
    const activeId = siteConfig.activeBusinessEntity;
    if (!activeId) return undefined;
    return siteConfig.businessEntity.find((entity) => entity.id === activeId);
  },

  getAllBusinessEntities: () => {
    return get().siteConfig.businessEntity;
  },
}));