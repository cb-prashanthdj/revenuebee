"use client";
import Image from "next/image";
import Rings from "../_assets/rings.svg";
import {
  suggestionButtonVariants,
  suggestionItemVariants,
} from "../_assets/animation.variants.const";
import RingsFilled from "../_assets/rings-filled.svg";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";

import { CircleArrowUpIcon, CircleXIcon } from "lucide-react";
/**
 * Renders AI Prompt text box on homepage
 */
interface ExplorerChatBoxProps {
  search: string;
  height?: string;
  setSearch: (search: string) => void;
  label?: string;
  description?: string;
  placeholder?: string;
  enableSuggestions?: boolean;
}

const ExplorerChatBox = ({
  search,
  setSearch,
  label,
  description,
  placeholder,
  enableSuggestions = false,
  height,
}: ExplorerChatBoxProps) => {
  const [query, setQuery] = useState("");

  function handleSubmit(
    e?:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e) e.preventDefault();
    setSearch(query);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      setSearch("");
    }
  }, [query, setSearch]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`h-56 w-full bg-gradient-to-br from-transparent to-white  blur-[250px] -z-10 absolute -top-8 left-0`}
      />
      <div
        className={`h-56 w-full bg-gradient-to-br from-transparent to-white  blur-[250px] -z-10 absolute -top-20 left-0`}
      />
      <div
        className={`rounded-full bg-[hsl(194,90%,12%)/0.95] blur-md w-1/2 h-40 -z-10 absolute left-0 top-32`}
      />
      <div
        className={`rounded-full bg-[hsl(194,90%,12%)/0.95] blur-md w-1/2 h-40 -z-10 absolute right-0 top-32`}
      />

      {(label || description) && (
        <div className={`flex px-[1.1875rem] py-3 gap-2 font-sora`}>
          <h2
            className={`bg-gradient-to-r from-shade-red-500 to-shade-red-800 bg-clip-text text-transparent text-[1rem] leading-tight`}
          >
            {label || ""}
          </h2>
          <p className="m-0 leading-tight text-[1rem] text-[#012A38B2]">
            {description || ""}
          </p>
        </div>
      )}
      <Textarea
        search={search}
        query={query}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        placeholder={placeholder}
        height={height}
      />

      {enableSuggestions && (
        <AnimatePresence mode="wait">
          {!search && (
            <motion.div
              key="suggestions"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={suggestionButtonVariants}
              className={`rounded-b-[2.5rem] bg-[linear-gradient(0deg,rgba(1,42,56,0.1)_0%,rgba(1,42,56,0.1)_100%),linear-gradient(0deg,rgba(211,217,220,0)_0%,rgba(211,217,220,0)_100%)] py-5 px-6 mx-5 flex gap-2  before:mask-custom`}
            >
              <motion.div variants={suggestionItemVariants}>
                <SuggestionButton>
                  Change preferred currency for invoices, payments and language
                </SuggestionButton>
              </motion.div>
              <motion.div variants={suggestionItemVariants}>
                <SuggestionButton>
                  Enable automatic payment collection for a customer
                </SuggestionButton>
              </motion.div>
              <motion.div variants={suggestionItemVariants}>
                <SuggestionButton>
                  Update my customer&apos;s credit card information
                </SuggestionButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </form>
  );
};
/**
 * Suggestion Button under AI Prompt box upon entering query
 */
function SuggestionButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={twMerge(
        "before:bg-gradient-to-r from-shade-red-500 to-shade-red-800 before:absolute before:inset-0 before:rounded-[inherit] before:p-[2px] before:content-[''] before:mask-custom rounded-[1.25rem] bg-[rgba(255,255,255,0.52)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-0 font-sora flex items-start p-4 gap-[0.375rem] text-left text-balance font-medium text-[0.75rem]",
        className
      )}
    >
      <Image src={RingsFilled} alt="suggestion" />
      <span
        className={`bg-gradient-to-r from-shade-red-500 to-shade-red-800 bg-clip-text text-transparent leading-tight font-medium`}
      >
        {children}
      </span>
    </button>
  );
}
/**
 * Actual Textarea component which renders inside ExplorerChatBox
 */
interface TextareaProps {
  search: string;
  placeholder?: string;
  query: string;
  height?: string;
  setQuery: (query: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

function Textarea({
  search,
  query,
  setQuery,
  handleKeyDown,
  placeholder,
  height,
}: TextareaProps) {
  return (
    <motion.div
      initial={false}
      className={clsx(
        `backdrop-blur-[22px] shadow-[0px_4px_19px_rgba(0,0,0,0.25),_0_0_12px_hsl(0_0%_100%)_inset] bg-[linear-gradient(0deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.5)_100%),linear-gradient(0deg,rgba(211,217,220,0)_0%,rgba(211,217,220,0)_100%)] flex rounded-[1.25rem] py-[1.25rem] px-[1.1875rem] items-baseline gap-3 font-sora origin-top`,
        search &&
          "relative before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:z-[-1] before:p-[2px] before:bg-[linear-gradient(90deg,#e93406_0%,#831d04_100%)] before:mask-custom"
      )}
      animate={{
        height: height ? height : search ? "16rem" : "12rem",
      }}
      transition={{
        duration: 0.1, // Slightly faster
        ease: [0.4, 0.0, 0.2, 1], // Custom easing for smoother expansion
      }}
    >
      <Image src={Rings} alt="your business challenge" />
      <textarea
        className={`bg-blue-400 flex-1 font-medium self-stretch placeholder:text-[#012A38] placeholder:opacity-50 text-[0.875rem] appearance-none resize-none bg-transparent focus:outline-none`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || ""}
      />
      {query && (
        <AnimatePresence mode="wait">
          <motion.div
            key="search-submit"
            initial="hidden"
            animate="show"
            variants={suggestionButtonVariants}
            className="flex gap-2 absolute bottom-4 right-4 items-end"
          >
            <button
              onClick={(e) => handleKeyDown}
              className={`inset-0 rounded-[1.25rem] bg-gradient-to-b from-white/20 to-white/20`}
            >
              <CircleArrowUpIcon className="size-5" />
            </button>
          </motion.div>
          <motion.div
            key="search-clear"
            initial="hidden"
            animate="show"
            variants={suggestionItemVariants}
            className="flex gap-2 absolute top-4 right-4 items-end"
          >
            <button
              onClick={(e) => setQuery("")}
              className={`bg-neutral-100 rounded-full p-2 flex  items-center gap-2 leading-tight font-medium text-[0.75rem] text-left font-sora `}
            >
              <CircleXIcon className="size-5" /> Clear
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export { ExplorerChatBox };
