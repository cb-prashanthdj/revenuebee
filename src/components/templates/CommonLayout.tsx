import React, { HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface HeaderProps {
  children?: string | number | React.ReactElement | React.ReactElement[];
  title?: string;
  className?: string;
}

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: string | number | React.ReactElement | React.ReactElement[];
  span?: number;
}

interface CommonLayoutProps {
  Header: React.FC<HeaderProps>;
  Content: React.FC<ContentProps>;
  //   TabsNav: React.FC<NavProps>
  //   SideNav: React.FC<NavProps>
  //   Grid: React.FC<CreateLayoutGridProps>
}

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const CommonHeader: React.FC<HeaderProps> = ({
  children,
  title,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("sticky left-0 right-0 z-10 bg-black ", className)}
      {...props}
    >
      {children}
    </div>
  );
};

CommonLayout.Header = CommonHeader;

export { CommonLayout };
