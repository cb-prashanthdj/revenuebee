"use client";

import { Pencil } from "lucide-react";
import { ApiRunner } from "./ApiRunner";
import { APIInfo } from "./ApiTool";
import { Sidebar } from "./PlaygroundSidebar";

export default function PlaygroundPage() {
  return (
    <div className="grid grid-cols-12 gap-4 min-h-[calc(100dvh-68px)] font-inter">
      <div className="col-span-3 w-full pl-10">
        <Sidebar
          relatedLinks={[
            { title: "Update billing info", href: "#" },
            { title: "Change billing date", href: "#" },
            { title: "Update payment method", href: "#" },
          ]}
        />
      </div>
      <div className="rounded-tl-[1.875rem] border border-[#a2c1c4] bg-gradient-to-r from-[#ffffff80] via-[#ffffff80] to-[#d2f6fa] shadow-[0_-6px_54px_0_rgba(0,0,0,0.35)] backdrop-filter backdrop-blur-md col-span-9 relative">
        <div className="fixed bottom-0 right-0 left-0 top-0 grid grid-cols-12">
          <APIInfo className="col-span-6" />
          <ApiRunner className="col-span-6" />
        </div>
      </div>
    </div>
  );
}
