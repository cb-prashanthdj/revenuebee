"use client";

import React from "react";

import BaseLayout from "@/components/layout/BaseLayout";

const BillableMetricLayouts = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <BaseLayout>{children}</BaseLayout>
    </React.Fragment>
  );
};

export default BillableMetricLayouts;
