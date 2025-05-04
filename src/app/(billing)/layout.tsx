import BaseLayout from "@/components/layout/BaseLayout";
import { LeftNavLayout } from "@/components/layout/LeftNavLayout";
import { TopBarLayout } from "@/components/layout/TopBarLayout";
import React from "react";

const BillingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      {/* <TopBarLayout /> s*/}
      {/* <BaseLayout>{children}</BaseLayout> */}
    </div>
  );
};

export default BillingLayout;
