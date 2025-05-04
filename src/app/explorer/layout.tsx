import React from "react";
import ExplorerHeader from "./_components/ui/ExplorerHeader";

const ExplorerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`bg-gradient-to-b from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0)] via-[hsl(185,22%,70%)] `}
    >
      <ExplorerHeader />
      {children}
    </div>
  );
};

export default ExplorerLayout;
