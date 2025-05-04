import { PencilIcon } from "lucide-react";
import Link from "next/link";
/**
 * Invidual Recommended result item component holding list of results after searching query in homepage AI prompt box
 */
export function RecommendationResults({
  title,
  description,
  reqType,
  tag,
  actionLabel,
  actionUrl,
}: {
  title: string;
  description: string;
  reqType: string;
  tag: string;
  actionLabel: string;
  actionUrl: string;
}) {
  return (
    <div
      className={`rounded-[1.875rem] border border-[#a2c1c4] backdrop-filter backdrop-blur-[4px] bg-[linear-gradient(0deg,_hsla(0,_0%,_100%,_0.5),_hsla(0,_0%,_100%,_0.5)),_linear-gradient(222deg,_rgba(144,_194,_199,_0)_13.06%,_rgba(143,_204,_218,_0.2)_36.39%,_#d2f6fa_63.38%)] shadow-[0px_-6px_54px_0px_rgba(0,0,0,0.35)] flex flex-col  pl-[2rem] pr-[2.5rem] py-[1.8rem] text-[#012A38] mt-[2.5rem] `}
    >
      <div className={`flex justify-between items-center`}>
        <div
          className={`bg-gradient-to-r from-transparent to-shade-lime-500 inline-flex py-1.5 px-3 items-center gap-1 rounded-md text-[#012a38] text-xs font-bold tracking-tight mt-3 ml-[0.94rem] w-fit !m-0`}
        >
          <PencilIcon className="w-4 h-4" /> {tag}
        </div>
        <div
          className={`uppercase bg-[#012A38] text-[#F1F3F4] text-[0.68244rem] py-[0.3rem] px-[0.8rem] rounded-full font-inter font-[700] tracking-tight leading-none`}
        >
          {reqType}
        </div>
      </div>
      <div
        className={`text-[1.3125rem] tracking-tight font-inter text-balance my-4`}
      >
        {title}
      </div>
      <p className={`font-inter text-[1rem] mb-10`}>{description}</p>

      <Link
        href={actionUrl}
        className={`flex justify-center items-center text-[#012a38] font-normal leading-none tracking-tighter bg-white border-2 border-[#012a38] py-2.5 px-[1.375rem] font-inter self-start`}
      >
        <b>{actionLabel}↗</b>
      </Link>
    </div>
  );
}
/**
 * Skeleton version of invidual Recommended result item
 */
export function RecommendationResultsSkeleton() {
  return (
    <div
      className={` rounded-[1.875rem] border border-[#a2c1c4] backdrop-filter backdrop-blur-[4px] bg-[linear-gradient(0deg,_hsla(0,_0%,_100%,_0.5),_hsla(0,_0%,_100%,_0.5)),_linear-gradient(222deg,_rgba(144,_194,_199,_0)_13.06%,_rgba(143,_204,_218,_0.2)_36.39%,_#d2f6fa_63.38%)] shadow-[0px_-6px_54px_0px_rgba(0,0,0,0.35)] flex flex-col  pl-[2rem] pr-[2.5rem] py-[1.8rem] text-[#012A38] mt-[2.5rem] `}
    >
      <div className="flex justify-between items-center">
        <div
          className={` bg-gradient-to-r from-transparent to-shade-lime-500 inline-flex py-1.5 px-3 items-center gap-1 rounded-md text-[#012a38] text-xs font-bold tracking-tight mt-3 ml-[0.94rem] w-fit !m-0`}
        >
          <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="w-20 h-5 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="text-[1.3125rem] tracking-tight font-inter text-balance my-4">
        <div className="w-56 h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-60 h-8 bg-gray-300 rounded animate-pulse mt-2"></div>
      </div>
      <div className="space-y-2 mt-4">
        <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div className="w-1/3 h-10 mt-4 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
}
