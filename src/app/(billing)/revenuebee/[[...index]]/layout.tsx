"use client";

import React from "react";
import BaseLayout from "./_components/RBaseLayout";

const RevenueLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <BaseLayout>{children}</BaseLayout>
    </React.Fragment>

  );
};

export default RevenueLayout;
