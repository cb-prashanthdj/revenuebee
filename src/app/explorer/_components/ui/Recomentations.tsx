"use client";

import { useState, useEffect } from "react";
import { PromptPlaceholder } from "./PromptPlaceholder";
import {
  RecommendationCard,
  RecommendationCardSkeleton,
} from "./RecommendationCard";
/**
 * Recomendation results page wrapper
 */
export function Recommendations({
  enablePromptPlaceholder = false,
  searchQuery = "",
  data,
}: {
  enablePromptPlaceholder?: boolean;
  searchQuery?: string;
  data?: { title: string; description: string; results: any[] };
}) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [searchQuery]);

  return (
    <div>
      {enablePromptPlaceholder && (
        <div className="fixed top-5 z-10 left-20">
          <PromptPlaceholder text={searchQuery} />
        </div>
      )}
      <div className="space-y-20 px-[max(1rem,_50%-74rem_/_2)]">
        {!isLoading && (
          <RecommendationCard
            title={data?.title || ""}
            description={data?.description || ""}
            results={data?.results || []}
          />
        )}
        {isLoading && <RecommendationCardSkeleton />}
      </div>
    </div>
  );
}
