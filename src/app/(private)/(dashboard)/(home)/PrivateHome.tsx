"use client";

import { useState } from "react";
import { Tabs, AnimatedTabPanel } from "../../_components";
import { DecksTab, FoldersTab, FavouritesTab } from "./_tabs";

import { FaFolderOpen } from "react-icons/fa";
import { PiCardsThreeFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";

import { PlusButton, CascadeUpMenu } from "@/components/ui/custom";
import { MobileTopBar } from "@/components/layout";

import { useTabs } from "@/hooks/ui/useTabs";
import { useModalStore } from "@/stores/modalStore";

const tabPanels = [
  { key: "Decks", content: <DecksTab /> },
  { key: "Folders", content: <FoldersTab /> },
  { key: "Favourites", content: <FavouritesTab /> },
];

export default function PrivateHome() {
  const { tabs, activeTab, activeIndex, setActiveTab } = useTabs(tabPanels);
  const openModal = useModalStore((state) => state.openModal);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCreateDeckClick = () => {
    openModal("deck"); // no data needed for creating a new deck
  };

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
      onClick: handleCreateDeckClick,
    },
    {
      label: "Create Card",
      icon: TbCardsFilled,
      onClick: () => {
        console.log("Create Card clicked");
      },
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <MobileTopBar />
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab} // Just this - let the hook handle the index
      />

      <div className="flex-1">
        <AnimatedTabPanel panels={tabPanels} activeIndex={activeIndex} />

        <div className="fixed bottom-8 right-6 z-50">
          <PlusButton
            onClick={handleToggle}
            style="p-4"
            size="w-14 sm:w-20 sm:h-20"
          />

          <CascadeUpMenu isOpen={isMenuOpen} menuItems={menuItems} />
        </div>
      </div>
    </div>
  );
}
