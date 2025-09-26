"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiSidebar } from "react-icons/bi";
import { FaBell, FaHome, FaPlus, FaRegChartBar, FaUser } from "react-icons/fa";
import { FaEarthAmericas, FaGear, FaClock } from "react-icons/fa6";
import { HiMenuAlt1 } from "react-icons/hi";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true); // Start collapsed on mobile

  const tabs = [
    { name: "Home", icon: FaHome, link: "/" },
    { name: "Discover", icon: FaEarthAmericas, link: "/discover" },
    { name: "Create", icon: FaPlus, link: "/create" },
    { name: "Statistics", icon: FaRegChartBar, link: "/statistics" },
    { name: "Notifications", icon: FaBell, link: "/notifications" },
    { name: "Profile", icon: FaUser, link: "/profile" },
    { name: "Timer", icon: FaClock, link: "/timer" },
  ];

  return (
    <div className="sidebar flex">
      {/* Mobile toggle button icon - always visible, slides smoothly */}
      <HiMenuAlt1
        className={`
          h-8 w-8 text-zinc-400
          fixed top-3 z-50 cursor-pointer
          sm:hidden
          transition-all duration-300 ease-in-out
          ${collapsed ? "left-4" : "left-50"}
        `}
        onClick={() => setCollapsed(!collapsed)}
      />

      {/* Mobile overlay - fades in/out smoothly */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-30
          sm:hidden
          transition-all duration-300 ease-in-out
          ${
            collapsed
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }
        `}
        onClick={() => setCollapsed(true)}
      />

      <div
        className={`
          flex flex-col
          dark:bg-zinc-800 bg-white
          border-e-2 p-4 border-zinc-200 dark:border-zinc-800
          h-screen overflow-hidden
          transition-all duration-300 ease-in-out
          
          sm:relative sm:translate-x-0 sm:z-auto
          fixed z-40 left-0 top-0
          w-64
          ${
            collapsed
              ? "sm:w-20 transform -translate-x-full sm:translate-x-0"
              : "sm:w-64 transform translate-x-0"
          }
      `}
      >
        {/* Brand + Collapse button */}
        <div className="flex items-center">
          <Link
            className={`
              flex items-center
              cursor-pointer
              transition-all duration-300 ease-in-out
              ${
                collapsed
                  ? "sm:opacity-0 sm:translate-x-[-10px] sm:pointer-events-none opacity-100 translate-x-0"
                  : "opacity-100 translate-x-0"
              }
              `}
            href={"/"}
          >
            <img
              src={"./logo.svg"}
              className="pe-3 sm:pe-1 h-6 sm:h-12"
              alt="Flashback"
            />
            <h1 className="text-lg sm:text-2xl font-bold">FlashBack</h1>
          </Link>
          <div className="flex items-center h-auto sm:h-14">
            {/* Desktop toggle button */}
            <button
              className={`
                absolute right-6 top-7 cursor-pointer
                hidden sm:flex
                transition-all duration-300 ease-in-out
                ${collapsed ? "mx-auto" : "ms-auto"}
              `}
              onClick={() => setCollapsed(!collapsed)}
            >
              <BiSidebar className="h-8 w-8 text-zinc-400" />
            </button>
          </div>
        </div>

        <hr className="my-4 text-zinc-200 dark:text-zinc-400" />

        {/* Tabs */}
        <div className="tabs flex flex-col flex-grow">
          <div className="space-y-2 flex-grow">
            {tabs.map((tab, index) => (
              <SidebarTab
                key={index}
                icon={tab.icon}
                name={tab.name}
                link={tab.link}
                collapsed={collapsed}
              />
            ))}
          </div>

          <SidebarTab
            icon={FaGear}
            name="Settings"
            link="/settings"
            collapsed={collapsed}
            className="mt-auto"
          />
        </div>
      </div>
    </div>
  );
}

type SidebarTabType = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  link: string;
  collapsed: boolean;
  className?: string;
};

const SidebarTab = ({
  icon: Icon,
  name,
  link,
  collapsed,
  className = "",
}: SidebarTabType) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      className={`
      relative flex items-center
      h-10 px-3
      rounded-lg
      hover:bg-zinc-200 dark:hover:bg-zinc-900
      transition-colors duration-300
      cursor-pointer
      ${className}
      ${isActive ? "bg-brand text-white pointer-events-none" : ""}
    `}
      href={link}
    >
      <div className="flex justify-center items-center w-5 h-5 z-10">
        <Icon
          className={`
          w-full h-full
          ${isActive ? "text-white" : "text-zinc-400"}
        `}
        />
      </div>

      <span
        className={`
          absolute left-13
          transition-all duration-300 ease-in-out
          whitespace-nowrap 
          text-sm z-0 
          ${
            collapsed
              ? "sm:opacity-0 sm:translate-x-[-10px] sm:pointer-events-none opacity-100 translate-x-0"
              : "opacity-100 translate-x-0"
          }`}
      >
        {name}
      </span>
    </Link>
  );
};
