"use client";

import { ArrowLeft, Pencil } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import Rank from "../_assets/rank.svg";
import Rings from "../_assets/rings.svg";
import { Badge } from "./Badge";

interface RelatedLinks {
  title: string;
  href: string;
}

interface SidebarProps {
  relatedLinks: RelatedLinks[];
}

export function Sidebar({ relatedLinks }: SidebarProps) {
  return (
    <div className="flex flex-col relative">
      <Link href="/explorer">
        <button className="bg-shade-teal-500 bg-opacity-10 py-2 px-[1.8rem] text-shade-teal-900 rounded-full flex gap-1 items-center font-semibold">
          <ArrowLeft className="size-4" /> Back
        </button>
      </Link>
      <div className="mt-2 ml-0">
        <PromptPlaceholder promptText="Describe your business challenge or goal in detail" />
      </div>

      {relatedLinks.length > 0 && (
        <div className="mt-4">
          <h5 className="uppercase tracking-wider text-sm font-[500] text-[#012A384D] mb-4">
            related
          </h5>
          <div className="flex flex-col gap-2">
            {relatedLinks.map((link: any) => (
              <Link key={link.title} href={link.href}>
                <Badge>
                  <Pencil className="size-3" />
                  {link.title}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="sticky mt-10 py-2 px-4">
        <MarketingCTA />
      </div>
    </div>
  );
}

function PromptPlaceholder({ promptText }: { promptText: string }) {
  return (
    <Link href="/explorer">
      <div className="flex gap-2 p-4 justify-start items-start  border-white  border-4  bg-gray-100 rounded-2xl shadow-md mb-4 min-h-4 ">
        <Image width={18} src={Rings} alt="recommendation" />
        <p className="m-0 text-gray-700">{promptText}</p>
      </div>
    </Link>
  );
}

function MarketingCTA() {
  return (
    <div className="w-full m-auto flex flex-col gap-1">
      <div
        className={`border rounded-full border-shade-teal-500/20 py-2 px-3 text-black  flex gap-3 text-center items-center bg-[linear-gradient(-150deg,theme(colors.shade-aqua.200)_0%,theme(colors.shade-aqua.100)_100%),linear-gradient(45deg,theme(colors.shade-aqua.100)_-63.79%,theme(colors.shade-aqua.100)_3.73%,theme(colors.shade-aqua.900)_81.85%)]`}
      >
        <Image src={Rank} alt="suggestion" />
        <span className="leading-tight text-left font-semibold">
          Ranked #1 in G2 for fastest implementation
        </span>
      </div>
      <div className="text-center">
        <p className="text-gray-800 text-sm m-4 leading-normal">
          Thousands of businesses worldwide trust Chargebee to manage and
          maximize recurring revenue
        </p>
      </div>

      <button
        className={`border-2 border-shade-aqua-800  hover:bg-gray-700 text-white font-semibold py-3 px-6 flex items-center space-x-2 m-auto bg-[linear-gradient(-10deg,theme(colors.shade-aqua.300)_0%,theme(colors.shade-aqua.800)_100%)] [text-shadow:1px_3px_0px_rgba(0,0,0,0.4)]`}
      >
        <span>Sign up for a demo</span>
      </button>
    </div>
  );
}
