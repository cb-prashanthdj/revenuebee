"use client";
import React, {useState} from "react";
import { LeftNavLayout } from "./LeftNavLayout";
import ChargeBeeLoading from "@/components/ui/ChargeBeeLoading";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const layoutType = "double";
    const [loading, setLoading] = useState(false);
  return (
    <div className="flex  bg-gray-50" style={{ height: `calc(100vh - 48px)` }}>
      {/* {navItems && <LeftNavLayout navItems={navItems} />} */}
      <LeftNavLayout setLoading={setLoading} />
      <main
        className={`
          flex-1 
          
          bg-gray-50 
          
          transition-all 
          duration-300
        `}
      >
        <div className="max-w-8xl ml-64 mx-auto ">
          <div className={`flex flex-col gap-6 `}>{children}</div>
            {loading && <ChargeBeeLoading />}
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
