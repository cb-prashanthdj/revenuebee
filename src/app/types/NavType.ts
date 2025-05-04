export interface SubItem {
    label: string;
    href: string;
  }
  
  export interface NavItem {
    id: string;
    icon: any;
    tag?: any;
    label: string;
    href?: string;
    subItems: SubItem[];
  }