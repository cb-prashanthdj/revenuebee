
'use client'
import { NavItem } from "@/app/types/NavType";
import { Badge } from "cb-sting-react-ts";
import { ChevronRight, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";




export const LeftNavLayout = ({navItems}: {navItems:NavItem[]}) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isNavActive, setIsNavActive] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const isCollapsed = false;
  const navWidth = isCollapsed ? (isNavHovered ? "w-64" : "w-16") : "w-64";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        event.stopPropagation();
        setActiveItem(null);
        setHoveredItem(null);
        setIsNavActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavHover = (isHovering: boolean) => {
    if (!isCollapsed) return;

    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);

    if (isHovering) {
      setIsNavHovered(true);
    } else {
      navTimeoutRef.current = setTimeout(() => {
        setIsNavHovered(false);
        setHoveredItem(null);
      }, 300);
    }
  };

  const handleNavItemClick = (index: number, item: NavItem) => {
    setIsNavActive(true);
    setActiveItem(index);
    setHoveredItem(index);

    // Only navigate if there are no subItems and href exists
    if (item.subItems.length === 0 && item.href) {
      router.push(item.href);
    }
  };

  const handleSubItemClick = (e: React.MouseEvent, href: string) => {
    e.stopPropagation();
    setActiveItem(null);
    setHoveredItem(null);
    setIsNavActive(false);
    router.push(href);
  };

  const handleItemHover = (index: number) => {
    if (isNavActive) {
      setHoveredItem(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isNavActive) {
      setHoveredItem(null);
    }
  };

  const handleSubmenuMouseEnter = (index: number) => {
    setHoveredItem(index);
  };

  const handleSubmenuMouseLeave = () => {
    if (!isNavActive) {
      setHoveredItem(null);
    }
  };

  const shouldShowSubmenu = (index: number) => {
    return (isNavActive || isNavHovered) && hoveredItem === index;
  };


  return (

      <nav
         ref={navRef}
        className={` ${navWidth}
        bg-white border-r border-gray-200 fixed left-0 top-10 bottom-0 z-10 
        transition-all duration-300 ease-in-out justify-between flex flex-col`}
      >
        <ul className="flex flex-col py-2 pl-0 ">
          {navItems && navItems.map((item:NavItem, index) => (
            <li
            key={item.id}
            className="relative"
            onMouseEnter={() => handleItemHover(index)}
            onClick={() => handleNavItemClick(index, item)}
          >
            <div
              className={`flex justify-between items-center gap-3 px-4 py-2 cursor-pointer transition-colors duration-150
                ${activeItem === index ? "bg-gray-100" : "hover:bg-gray-50"}
                ${hoveredItem === index ? "bg-gray-50" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gray-600 min-w-5" />
                <span
                  className={`text-gray-700 whitespace-nowrap transition-opacity duration-300 flex gap-regular items-center
                  ${
                    isCollapsed && !isNavHovered
                      ? "opacity-0.2 w-0 truncate"
                      : "opacity-100"
                  }`}
                >
                  {item.label}{item.tag && <Badge variant={item.tag.variant} className="font-semibold" rounded="small">{item.tag.label}</Badge>}
                </span>
              </div>
              {item.subItems.length > 0 && (
                <ChevronRight
                  className={`w-5 h-5 cursor-pointer transition-colors duration-150 text-gray-600 min-w-5 
                  ${
                    isCollapsed && !isNavHovered
                      ? "opacity-0 w-0 truncate"
                      : "opacity-100"
                  }`}
                />
              )}
            </div>

            {item.subItems.length > 0 && shouldShowSubmenu(index) && (
              <div
                className={`submenu absolute ${
                  isCollapsed && isNavHovered ? "left-64" : "left-full"
                } 
                  top-0 ml-1 bg-white rounded-md shadow-lg border border-gray-200 min-w-48 py-2 z-50`}
                onMouseEnter={() => handleSubmenuMouseEnter(index)}
                onMouseLeave={handleSubmenuMouseLeave}
              >
                <ul className="flex flex-col pl-0 mb-0">
                  {item.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={(e) => handleSubItemClick(e, subItem.href)}
                    >
                      {subItem.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          ))}
          
        </ul>
      </nav>
  
  );
};
