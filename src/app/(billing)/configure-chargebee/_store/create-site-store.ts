import { create } from "zustand";
import sitesData from "./sites.json";
import teamMembersData from "./teamMembers.json";

const getExpirationDate = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getLastSync = (): string => "Just now";


const formatSiteType = (siteType: string): string => {
  return siteType.trim().toLowerCase().replace(/\s+/g, "-") || "sandbox";
};

const formatSiteUrl = (siteType: string): string => {
  const formattedType = formatSiteType(siteType);
  return `acmecorp-${formattedType}.chargebee.com`;
};

const generateUniqueSiteId = (existingSites: Site[]): string => {
  const existingSiteIds = existingSites.map(site => site.siteId || "");

  let newSiteId = "";
  let isUnique = false;

  while (!isUnique) {
    const randomNum = Math.floor(100 + Math.random() * 900); // ensures 3 digits (100-999)
    newSiteId = `site${randomNum}`;

    isUnique = !existingSiteIds.includes(newSiteId);
  }

  return newSiteId;
};

interface TeamMember {
  leftAvatar: string;
  id?: string;
  name?: string;
  email?: string;
}

interface Access {
  hasAccess: boolean;
  accessRequested: boolean;
}

interface Configuration {
  type: "default" | "copy";
  sourceSite?: string;
}

interface Site {
  site: string;       // Full site URL
  createdBy?: string;
  expiresOn?: string;
  lastSync?: string;
  showOptions: boolean;
  isActive: boolean;
  contactedSupport: boolean;
  siteType: string;   // The type value (e.g., "sandbox", "test")
  access: Access;
  siteName: string;   // Used for display purposes (e.g., "Acme Corp")
  teamMembers?: string[];
  configuration?: Configuration;
  siteId: string;     // Unique identifier in format "site" + 3 digits
}

interface SiteConfigStore {
  // Site Details
  sites: Site[];
  addSite: (
      siteType: string,
      createdBy: string,
      teamMemberIds?: string[],
      configType?: "default" | "copy",
      sourceSite?: string
  ) => void;
  removeSite: (siteUrl: string) => void;
  setContactedSupport: (siteUrl: string, status: boolean) => void;
  setAccessRequested: (siteUrl: string, status: boolean) => void;

  // Team Members
  teamMembers: TeamMember[];
  addTeamMember: (name: string, email?: string) => void;
  removeTeamMember: (id: string) => void;

  // Site Configurations
  siteName: string;  // This will remain "Acme Corp"
  siteType: string;  // This will store the site type input (e.g., "sandbox", "test")
  selectedConfiguration: "default" | "copy";
  existingSites: string[];
  selectedExistingSite: string | null;
  setSiteName: (name: string) => void;
  setSiteType: (type: string) => void;
  setSelectedConfiguration: (config: "default" | "copy") => void;
  setSelectedExistingSite: (site: string) => void;

  // Test Site Flag
  isTestSite: boolean;
  setIsTestSite: (isTest: boolean) => void;
  getIsTestSite: () => boolean;
  currentTestSite: string;
  setCurrentTestSite: (siteName: string) => void;

  // Get the formatted site URL with the new pattern
  getFormattedSiteUrl: () => string;
}

export const useSiteCreateStore = create<SiteConfigStore>((set, get) => ({
  sites: sitesData,
  teamMembers: teamMembersData,
  currentTestSite: "site111",
  siteName: "Acme Corp",
  siteType: "sandbox",

  addSite: (siteType, createdBy, teamMemberIds = [], configType = "default", sourceSite = null) => {

    const siteUrl = formatSiteUrl(siteType);

    set((state) => {

      const uniqueSiteId = generateUniqueSiteId(state.sites);

      return {
        sites: [
          ...state.sites,
          {
            site: siteUrl,
            createdBy,
            expiresOn: getExpirationDate(),
            lastSync: getLastSync(),
            showOptions: true,
            isActive: true,
            contactedSupport: false,
            siteType: siteType || "sandbox",
            access: { hasAccess: true, accessRequested: false },
            siteName: "Acme Corp",
            teamMembers: teamMemberIds,
            configuration: {
              type: configType,
              ...(sourceSite && { sourceSite })
            },
            siteId: uniqueSiteId
          },
        ],
      };
    });

    console.log("Added site:", siteUrl, "with team members:", teamMemberIds, "and configuration:", configType);
  },

  removeSite: (siteUrl) =>
      set((state) => ({
        sites: state.sites.filter((site) => site.site !== siteUrl),
      })),

  setContactedSupport: (siteUrl, status) =>
      set((state) => ({
        sites: state.sites.map((site) =>
            site.site === siteUrl ? { ...site, contactedSupport: status } : site
        ),
      })),

  setAccessRequested: (siteUrl, status) =>
      set((state) => ({
        sites: state.sites.map((site) =>
            site.site === siteUrl
                ? { ...site, access: { ...site.access, accessRequested: status } }
                : site
        ),
      })),

  addTeamMember: (name, email) =>
      set((state) => ({
        teamMembers: [
          ...state.teamMembers,
          {
            id: Date.now().toString(),
            name,
            email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
            leftAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
        ],
      })),

  removeTeamMember: (id) =>
      set((state) => ({
        teamMembers: state.teamMembers.filter((member) => member.id !== id),
      })),

  selectedConfiguration: "default",
  existingSites: ["Acme Corp Live", "Acme Corp Sandbox"],
  selectedExistingSite: null,
  isTestSite: false,

  setSiteName: (name) => set(() => ({ siteName: name })),
  setSiteType: (type) => set(() => ({ siteType: type })),

  setSelectedConfiguration: (config) =>
      set(() => ({
        selectedConfiguration: config,
        selectedExistingSite: config === "default" ? null : null, // Reset existing site selection
      })),

  setSelectedExistingSite: (site) =>
      set(() => ({ selectedExistingSite: site })),

  setIsTestSite: (isTest) => set(() => ({ isTestSite: isTest })),

  getIsTestSite: () => get().isTestSite,

  setCurrentTestSite: (siteName) => set(() => ({ currentTestSite: siteName })),

  // Update the URL format to match the new pattern
  getFormattedSiteUrl: () => {
    const { siteType } = get();
    const formattedType = siteType.trim().toLowerCase().replace(/\s+/g, "-") || "sandbox";
    return `acmecorp-${formattedType}.chargebee.com`;
  },
}));