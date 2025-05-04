import { NavItem } from "@/app/types/NavType";
import { AppWindowIcon, CalendarIcon, ChartColumnIncreasing, ChartNoAxesColumn, ChartPie, CircleCheckBig, FileClock, FileTextIcon, HomeIcon, LibraryIcon, MessageSquareIcon, Settings2Icon, SettingsIcon, ShoppingCartIcon, UsersIcon, WalletCards } from "lucide-react";


export const navItems: NavItem[] = [
    { id: "home", icon: HomeIcon, label: "Home", href: "/billing/home", subItems: [] },
    {
        id: "customer",
      icon: UsersIcon,
      label: "Customers",
      href: "/billing/customers",
      subItems: [],
    },
    {
        id: "subscription",
      icon: CalendarIcon,
      label: "Subscriptions",
      href: "/billing/subscriptions",
      subItems: [],
    },
    {
        id: "invoice",
      icon: MessageSquareIcon,
      label: "Invoices & Credit Notes",
      subItems: [
        { label: "Invoice", href: "/billing/invoices" },
        { label: "Credit Notes", href: "/billing/credit-notes" },
      ],
    },
    {
        id: "quote",
      icon: FileTextIcon,
      label: "Quotes",
      href: "/billing/quotes",
      subItems: [],
    },
    {
        id: "order",
      icon: ShoppingCartIcon,
      label: "Orders",
      href: "/billing/orders",
      subItems: [],
    },
    {
        id: "omnichannel",
      icon: Settings2Icon,
      label: "Omnichannel",
      subItems: [
        { label: "Subscriptions", href: "/billing/omnichannel/subscriptions" },
      ],
    },
    {
        id: "product",
      icon: LibraryIcon,
      label: "Product Catalog",
      subItems: [
        { label: "Plans", href: "/billing/product-catalog/plans" },
        { label: "Addons", href: "/billing/product-catalog/addons" },
        { label: "Coupons", href: "/billing/product-catalog/coupons" },
        { label: "Coupons Sets", href: "/billing/product-catalog/coupon-sets" },
      ],
    },
    { 
        id: "usages",
      icon: ChartNoAxesColumn, 
      label: 'Usages', 
      tag: {label:'New', variant:"neutral"},
      href: "/billing/customers",
      subItems: [
        { label: 'Usages', href: '/usages/' },
        { label: 'Usage Events', href: '/usages/events' },
        { label: 'Metered Feature', href: '/usages/metrics/list' },
       
      ]
    },
    { 
        id: "payment",
      icon: WalletCards , 
      label: 'Payments', 
      subItems: [
        { label: 'Dashboard', href: '/billing/payment-gateway/payment-gateway/' },
        { label: 'Transactions', href: '/billing/payment-gateway/payments-orchestration' },
        { label: 'Payments Orchestration', href: '/billing/payment-gateway/payments-orchestration' },
      ]
    },
    { 
        id: "logs",
      icon: FileClock, 
      label: 'Logs', 
      subItems: [
        { label: "Transactions", href: "/billing/logs/transactions" },
        { label: "Email Logs", href: "/billing/logs/emails" },
        { label: "Events", href: "/billing/logs/events" },
      ],
    },
    {
        id: "approval",
      icon: CircleCheckBig,
      label: "Approvals",
      href: "/billing/approvals",
      subItems: [],
    },
    {
        id: "revenue-story",
      icon: ChartColumnIncreasing,
      label: "RevenueStory",
      href: "/billing/revenue-story",
      subItems: [],
    },
    { id : "apps", icon: AppWindowIcon, label: "Apps", href: "/billing/apps", subItems: [] },
    {
        id: "reports",
      icon: ChartPie,
      label: "Classic Reports",
      href: "/billing/reports",
      subItems: [],
    },
    {
        id: "configure-chargebee",
      icon: SettingsIcon,
      label: "Configure Chargebee",
      href: "/billing/configure-chargebee/general",
      subItems: [],
    },
  ];