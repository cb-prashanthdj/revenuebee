import Image from "next/image";
import Rings from "../_assets/rings.svg";
import {
  RecommendationResults,
  RecommendationResultsSkeleton,
} from "./RecommendationResults";

export function RecommendationCard({
  title,
  description,
  results,
}: {
  title: string;
  description: string;
  results: any[];
}) {
  return (
    <div className={` grid grid-cols-12 `}>
      {(title || description) && (
        <div className={` col-span-6  top-0`}>
          <div
            className={`isolate before:content-[''] before:absolute before:-top-32 before:right-0 before:bottom-0 before:left-0 before:rounded-[1.25rem] before:bg-gradient-to-r from-[rgba(255,255,255,0.62)] via-[rgba(255,255,255,0.44)] to-[rgba(1,42,56,0)] before:-z-10 !sticky top-16 p-[4rem]`}
          >
            <Image width={36} height={52} src={Rings} alt="recommendation" />
            <p
              className={`font-inter text-[#4F6169] text-xl leading-tight mt-4 max-w-[26rem]`}
            >
              {description}
            </p>
            <div
              className={`py-[0.4rem] px-[0.8rem] font-inter font-[700] tracking-tight leading-none text-[0.68244rem] uppercase bg-[#012A38] text-[#F1F3F4] w-fit rounded-[0.38rem]`}
            >
              {title}
            </div>
          </div>
        </div>
      )}
      <div className="col-span-6 pb-[2.2rem]">
        {results.map((res, index) => {
          return (
            <RecommendationResults
              tag={res.tag}
              actionLabel={res.actionLabel}
              actionUrl={res.actionUrl}
              title={res.title}
              description={res.description}
              reqType={res.reqType}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
export function RecommendationCardSkeleton() {
  return (
    <div className={` grid grid-cols-12 `}>
      <div className={` col-span-6  top-0`}>
        <div
          className={` isolate before:content-[''] before:absolute before:-top-32 before:right-0 before:bottom-0 before:left-0 before:rounded-[1.25rem] before:bg-gradient-to-r from-[rgba(255,255,255,0.62)] via-[rgba(255,255,255,0.44)] to-[rgba(1,42,56,0)] before:-z-10 !sticky top-16 p-[4rem]`}
        >
          <div className="w-10 h-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="space-y-2 mt-4">
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-3/5 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="w-32 h-6 mt-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="col-span-6 pb-[2.2rem]">
        <RecommendationResultsSkeleton />
        <RecommendationResultsSkeleton />
        <RecommendationResultsSkeleton />
        <RecommendationResultsSkeleton />
      </div>
    </div>
  );
}
