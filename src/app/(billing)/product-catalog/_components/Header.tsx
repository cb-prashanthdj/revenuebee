"use client";

import React from "react";

type CardHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export const CardHeader = ({ title, children }: CardHeaderProps) => {
  return (
    <div className="flex justify-between flex-wrap">
      <div className="space-y-small">
        <h1 className="s-h4 tracking-tight mt-1 mb-3">{title}</h1>
      </div>
      <div className="w-content flex gap-xlarge flex-wrap">{children}</div>
    </div>
  );
};
