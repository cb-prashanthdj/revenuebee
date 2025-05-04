"use client";

import React from "react";

import FullWidthLayout from "@/components/layout/FullWidthLayout";

const Billinglayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <FullWidthLayout>{children}</FullWidthLayout>
    </React.Fragment>
  );
};

export default Billinglayout;
