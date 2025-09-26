"use client";

import React from "react";

type TabsProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Tabs({ tabs, activeTab, setActiveTab }: TabsProps) {
  return (
    <div
      className="
        relative 
        flex justify-center items-center 
      dark:bg-zinc-800
        shadow-[rgba(0,0,0,0.25)_0_4px_6px_0px]
    "
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab)}
          className="p-4 text-sm sm:text-base"
          style={{ width: `calc(100% / ${tabs.length})` }}
        >
          {tab}
        </button>
      ))}

      {/* Animated Bottom Border */}
      <div
        className="absolute bottom-0 h-1 bg-brand transition-all duration-300 ease-in-out"
        style={{
          width: `calc(100% / ${tabs.length})`,
          left: `calc(${(tabs.indexOf(activeTab) / tabs.length) * 100}%)`,
        }}
      />
    </div>
  );
}
