"use client";
import { CommonLayout } from "@/components/templates/CommonLayout";

import RevenueChat from "@/app/(billing)/revenuebee/[[...index]]/_components/RevenueChat";

const ApprovalsListPage = () => {

  return (
    <CommonLayout>
      <RevenueChat/>
    </CommonLayout>
  );
};

export default ApprovalsListPage;
