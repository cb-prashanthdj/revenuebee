"use client";
import { motion } from "framer-motion";

/* 
  NOTE:
  - the ID used here should match the ID used in Card Section
  - also helps with scrolling to the particular card section on click (by making use of `href` attribute, with the same ID)
*/
const navSections = [
  {
    title: "Customers",
    id: "customer",
    description:
      "Represents a customer, which can be an individual or organization that subscribes to your products or services.",
    children: [],
  },
  {
    title: "Subscriptions",
    id: "subscription",
    description:
      "Represents a customer, which can be an individual or organization that subscribes to your products or services.",
    children: ["Ramps", "Usage", "Discounts", "Gifts", "Addresses"],
  },
];

export function Sidebar({ activeId }: { activeId: string }) {
  return (
    <div className={`[&>*]:pl-16 sticky top-28`}>
      <p className="border-b border-solid border-black/10 text-[#012A38] opacity-50 py-4 mb-0 font-sora">
        Browse all APIs
      </p>
      {navSections.map((section, index) => (
        <NavSection activeId={activeId} key={index} id={section.id}>
          <a href={`#${section.id}`}>
            <NavHeading>{section.title}</NavHeading>
          </a>
          <NavDescription>{section.description}</NavDescription>
          {section.children.length > 0 && (
            <div className="mt-6">
              {section.children.map((child, childIndex) => (
                <NavHeading key={childIndex}>{child}</NavHeading>
              ))}
            </div>
          )}
        </NavSection>
      ))}
    </div>
  );
}

export function NavHeading({ children }: { children: React.ReactNode }) {
  return <h3 className={`text-[0.75rem] mb-2 font-sora`}>{children}</h3>;
}

export function NavDescription({ children }: { children: React.ReactNode }) {
  return <p className={`m-0 text-[1rem] font-inter font-[300]`}>{children}</p>;
}

/**
 * Note:
 * - When the activeId matches the id prop, a gradient is applied to the section (active highlight)
 * - Important to set the `layoutId` prop to a unique string (eg. `highlight`), reason - https://motion.dev/docs/react-layout-animations
 */
export function NavSection({
  children,
  activeId,
  id,
}: {
  children: React.ReactNode;
  activeId: string | null;
  id: string;
}) {
  return (
    <div
      className={`border-b border-solid border-black/10 py-8 isolate relative`}
    >
      {activeId === id && (
        <motion.div
          layoutId="highlight"
          className={`absolute inset-0 -z-10 bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:top-8 after:left-12 after:bottom-8 after:w-0.5 after:bg-black`}
        />
      )}
      {children}
    </div>
  );
}
