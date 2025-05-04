"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Sparkle } from "lucide-react";
import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";

interface CardGroupProps {
  id: number;
  cards: {
    tag: string;
    title: React.JSX.Element;
  }[];
}

type CardSectionId = string;

/* 
  CONSTANTS: The units here is REM's 

  Reason for hard coded values:
  - support the card stack layout in a more predictable way / have a consistent layout
  - since the cards are absolutely positioned, with these values and offsets it's easier to position and also calculate the card stack's dimensions
*/
const CARD_HEIGHT = 10.125;
const CARD_WIDTH = 15.375;

const CARD_OFFSET_VERTICAL = 2.5;
const CARD_OFFSET_HORIZONTAL = 0.75;

// Minimised State of the Card when not hovered (turns into a pill)
const PILL_HEIGHT = 3.75;
const PILL_SPACING = 0.75;

/**
 * Renders Card stacks section wise
 * Eg. Customer card group, Subscription card group
 */
function ApiManagement({
  activeId,
  setActiveId,
  apiGroup,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
  apiGroup: { id: string; items: CardGroupProps[] }[];
}) {
  return (
    <>
      {apiGroup &&
        apiGroup.map((group, index) => (
          <CardSection
            key={index}
            id={group.id}
            group={group.items}
            activeId={activeId}
            setActiveId={(id) => setActiveId(id)}
          />
        ))}
    </>
  );
}

/**
 * Renders the card stacks of the particular card section
 * Keeps track of the active section, by
 * - by default setting the first section (customers) as active
 * - when the card section reaches the top 40% of the viewport, set the visible section as active
 */
const CardSection = ({
  id,
  group,
  activeId,
  setActiveId,
}: {
  id: CardSectionId;
  group: CardGroupProps[];
  activeId: string;
  setActiveId: (id: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "0px 0px -60% 0px",
  });

  useLayoutEffect(() => {
    if (isInView) {
      setActiveId(id);
    } else {
      setActiveId("customer");
    }
  }, [isInView, id, setActiveId]);

  return (
    <CardStack isActive={activeId === id} id={id} refProp={ref} group={group} />
  );
};

/**
 * Renders the card stacks of the particular card group, (4 cards at max in a stack, currently set in the dummy data level)
 * Keeps track of the hovered card index for each card stack, other card index lower than the hovered card index will be rendered as a pill
 */
function CardStack({
  group,
  refProp,
  id,
  isActive,
}: {
  group: CardGroupProps[];
  refProp: React.RefObject<HTMLDivElement | null>;
  id: string;
  isActive: boolean;
}) {
  const [hoveredCards, setHoveredCards] = useState<Record<number, number>>({});

  const handleGroupLeave = (groupId: string) => {
    setHoveredCards((prev) => ({
      ...prev,
      [groupId]: -1,
    }));
  };

  const handleCardHover = (groupId: string, index: number) => {
    setHoveredCards((prev) => ({
      ...prev,
      [groupId]: index,
    }));
  };

  return (
    <motion.div
      className={clsx("flex flex-wrap gap-8", !isActive && "opacity-60")}
      ref={refProp}
    >
      {group.map((groupItem) => {
        const style = {
          height: `calc(${CARD_HEIGHT}rem + ${CARD_OFFSET_VERTICAL}rem * ${groupItem.cards.length})`,
          width: `calc(${CARD_WIDTH}rem + ${groupItem.cards.length} * ${CARD_OFFSET_HORIZONTAL}rem)`,
        };

        return (
          <motion.div
            key={groupItem.id}
            className="relative"
            style={style}
            onMouseLeave={() => handleGroupLeave(String(groupItem.id))}
            id={id}
          >
            <AnimatePresence>
              {groupItem.cards.map((card, index: number) => (
                <Card
                  key={index}
                  tag={card.tag}
                  title={card.title}
                  stack={index}
                  selectedIndex={hoveredCards[groupItem.id]}
                  isHovered={hoveredCards[groupItem.id] === index}
                  onHover={() => handleCardHover(String(groupItem.id), index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * Renders a single card
 * - Card can be pill or stacked
 * - Card can be hovered
 */
function Card({
  tag,
  title,
  stack,
  isHovered,
  selectedIndex,
  onHover,
}: {
  tag: string;
  title?: React.ReactElement;
  stack: number;
  isHovered?: boolean;
  selectedIndex: number;
  onHover?: () => void;
}) {
  const noCardsHovered = selectedIndex === -1;
  const isPilled = selectedIndex < stack;

  const getCardPosition = () => {
    // Default stacked position (non-pill)
    if (noCardsHovered) {
      return {
        top: `calc(${CARD_OFFSET_VERTICAL}rem * ${stack})`,
        right: `calc(${CARD_OFFSET_HORIZONTAL}rem * ${stack})`,
        scale: 1,
        height: `${CARD_HEIGHT}rem`,
      };
    }

    // Align with the hovered card's position plus pill spacing
    // Set to pill height and modified position through transform
    if (isPilled) {
      return {
        x: `calc(${-CARD_OFFSET_HORIZONTAL}rem * ${stack})`,
        y: `calc(${CARD_HEIGHT}rem - ${PILL_HEIGHT - PILL_SPACING}rem)`,
        scale: 1,
        height: `${PILL_HEIGHT}rem`,
      };
    }

    // Non-pill cards (hovered and above) maintain original position
    return {
      top: `calc(${CARD_OFFSET_VERTICAL}rem * ${stack})`,
      right: `calc(${CARD_OFFSET_HORIZONTAL}rem * ${stack})`,
      scale: isHovered ? 1.05 : 1,
      height: `${CARD_HEIGHT}rem`,
    };
  };

  // Only show the content for the hovered card
  const shouldShowContent = !isPilled || noCardsHovered;

  return (
    <motion.div
      className={`rounded-[1.875rem] border border-[#a2c1c4] backdrop-filter backdrop-blur-[4px] bg-[linear-gradient(0deg,_hsla(0,_0%,_100%,_0.5),_hsla(0,_0%,_100%,_0.5)),_linear-gradient(222deg,_rgba(144,_194,_199,_0)_13.06%,_rgba(143,_204,_218,_0.2)_36.39%,_#d2f6fa_63.38%)] shadow-[0px_-6px_54px_0px_rgba(0,0,0,0.35)] absolute flex flex-col cursor-pointer overflow-hidden`}
      style={{
        width: `${CARD_WIDTH}rem`,
      }}
      initial={{
        top: `calc(${CARD_OFFSET_VERTICAL}rem * ${stack})`,
        right: `calc(${CARD_OFFSET_HORIZONTAL}rem * ${stack})`,
        scale: 1,
      }}
      animate={getCardPosition()}
      onHoverStart={onHover}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1.2,
        bounce: 0.1,
      }}
    >
      <Link href="/explorer/playground" className="flex flex-col flex-1">
        <motion.div
          className={`bg-gradient-to-r from-transparent to-shade-lime-500 inline-flex py-1.5 px-3 items-center gap-1 rounded-md text-[#012a38] text-xs font-bold tracking-tight mt-3 ml-[0.94rem] self-start font-inter`}
        >
          <Sparkle className="w-4 h-4" />
          {tag}
        </motion.div>
        <motion.div
          className="mt-auto ml-[1.3rem] mb-[1.3rem] mr-[1.3rem] text-[1rem]"
          animate={{
            opacity: shouldShowContent ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default ApiManagement;
