"use client";

import { useState } from "react";
import { getColorVariants } from "@/utils/colorUtils";
import { useModalStore } from "@/stores/modalStore";

import { KebabMenu } from "@/components/ui";
import type { DeckWithMeta } from "@/db/types";

type DeckProps = {
  deck: DeckWithMeta;
  onDelete?: (deck: DeckWithMeta) => void;
};

export default function Deck({ deck }: DeckProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { openModal } = useModalStore();

  const colors = getColorVariants(deck.folderColor || 8);

  return (
    <div
      className="relative h-40 w-60 max-sm:h-32 max-sm:w-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-200"
        style={{
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        <div
          className="absolute right-0 h-full w-full rounded-2xl"
          style={{ backgroundColor: colors.dark }}
        />
        <div
          className="absolute right-0 h-full w-[95%] rounded-2xl z-10"
          style={{ backgroundColor: colors.base }}
        />
        <div
          className="absolute right-0 h-full w-[90%] rounded-2xl z-20"
          style={{ backgroundColor: colors.light }}
        />
      </div>

      {/* Content overlay */}
      <div
        className="absolute bottom-0 z-30 bg-white dark:bg-zinc-700 h-2/3 w-full rounded-b-xl transition-all duration-200"
        style={{
          transform: isHovered ? "translateY(3px)" : "translateY(0)",
        }}
      >
        <div className="relative flex flex-grow flex-col h-full p-2 max-sm:p-1">
          <KebabMenu
            className="absolute right-0 mt-1 text-sm max-sm:text-xs"
            options={[
              {
                label: "Edit",
                onClick: () => openModal("deck", deck),
              },
              {
                label: "Delete",
                onClick: () =>
                  openModal("delete", {
                    id: deck.deckId,
                    name: deck.name,
                    target: "deck",
                  }),
              },
            ]}
          />
          <div className="flex items-start justify-between">
            <div className="w-[90%]">
              <h2 className="font-bold text-lg p-0 truncate max-sm:text-base">
                {deck.name}
              </h2>
              <p className="text-xs dark:text-zinc-400 p-0 truncate max-sm:text-[10px]">
                {deck.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <p className="text-sm dark:text-zinc-400 max-sm:text-xs truncate max-w-9/12">
              {deck.folderName}
            </p>
            <p className="text-sm max-sm:text-xs">{deck.cardCount} Cards</p>
          </div>
        </div>
      </div>
    </div>
  );
}
