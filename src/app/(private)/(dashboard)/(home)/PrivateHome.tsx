"use client";

import { useState } from "react";
import Tabs from "../../_components/Tabs";
import AnimatedTabPanel from "../../_components/AnimatedTabPanel";
import { DecksTab, FoldersTab, FavouritesTab } from "./_tabs";
import { FaFolderOpen } from "react-icons/fa";
import { PiCardsThreeFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";
import PlusButton from "@/components/ui/custom/PlusButton";
import CascadeUpMenu from "@/components/ui/custom/CascadeUpMenu";
import MobileTopBar from "@/components/layout/MobileTopBar";

export default function PrivateHome() {
  // ui states
  const panels = [
    { key: "Decks", content: <DecksTab /> },
    { key: "Folders", content: <FoldersTab /> },
    { key: "Favourites", content: <FavouritesTab /> },
  ];

  const tabs = panels.map((panel) => panel.key);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "Create Folder",
      icon: FaFolderOpen,
      onClick: () => {
        console.log("Create Folder clicked");
      },
    },
    {
      label: "Create Deck",
      icon: PiCardsThreeFill,
      onClick: () => {
        console.log("Create Deck clicked");
      },
    },
    {
      label: "Create Card",
      icon: TbCardsFilled,
      onClick: () => {
        console.log("Create Card clicked");
      },
    },
  ];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <MobileTopBar />
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveIndex(tabs.indexOf(tab));
        }}
      />

      <div className="flex-1">
        <AnimatedTabPanel panels={panels} activeIndex={activeIndex} />

        <div className="fixed bottom-8 right-6 z-50">
          <PlusButton
            onClick={handleToggle}
            style="p-4"
            size="w-14 sm:w-20 sm:h-20"
          />

          <CascadeUpMenu isOpen={isOpen} menuItems={menuItems} />
        </div>
      </div>
    </div>
  );
}
