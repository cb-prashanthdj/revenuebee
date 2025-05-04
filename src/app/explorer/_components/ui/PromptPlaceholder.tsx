"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import Rings from "../_assets/rings.svg";

const PlaceholderVariants = {
  hidden: { opacity: 0, y: -100, x: 100 }, // Start fully transparent and slightly above the screen
  show: {
    opacity: 1,
    y: -10,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  }, // Fade-in and slide to position
  exit: {
    opacity: 0,
    y: -100,
    x: 100,
    transition: { duration: 0.4, ease: "easeIn" },
  }, // Fade-out and slide up
};
/**
 * Sidenav Minimized version of Promplt box upon scrolling down to the page
 */
export function PromptPlaceholder({ text }: { text?: string }) {
  return (
    <AnimatePresence>
      <motion.div
        key="suggestions"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={PlaceholderVariants}
      >
        <a href="#top">
          <div
            className={`flex p-4 justify-start items-start border-white  border-4 !pl-4 bg-gray-100 rounded-2xl shadow-md m-4 min-h-4`}
          >
            <Image width={18} src={Rings} alt="recommendation" />
            <p className="m-0 text-gray-700">{text}</p>
          </div>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
