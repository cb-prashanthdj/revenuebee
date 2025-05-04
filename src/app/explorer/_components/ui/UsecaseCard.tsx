"use client";
import Link from "next/link";

export function UseCasesCard({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={`border border-[#a2c1c4] backdrop-filter backdrop-blur-[4px] bg-[linear-gradient(0deg,rgba(255,255,255,0.5)0%,rgba(255,255,255,0.5)100%),linear-gradient(222deg,rgba(144,194,199,0)13.06%,rgba(143,204,218,0.2)36.39%,#d2f6fa63.38%)]  !shadow-sm !rounded-lg p-2 flex flex-col  cursor-pointer overflow-hidden h-48`}
    >
      <Link
        href="/explorer/playground"
        className="flex flex-col justify-between flex-1 leading-tight"
      >
        <div className="font-semibold"> {title} </div>
        <div className="italic">{description}</div>
      </Link>
    </div>
  );
}
