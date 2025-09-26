"use client";

import { useState } from "react";
import { getColorVariants } from "@/utils/colorUtils";
import { KebabMenu } from "@/components/ui";
import type { DeckWithMeta } from "@/db/types";

type DeckProps = {
  deck: DeckWithMeta;
  onEdit?: (deck: DeckWithMeta) => void;
  onDelete?: (deck: DeckWithMeta) => void;
};

export default function Deck({ deck, onEdit, onDelete }: DeckProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = getColorVariants(deck.folderColor || 8);

  return (
    <div
      className="relative h-40 w-60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-200"
        style={{ transform: isHovered ? "translateY(-6px)" : "translateY(0)" }}
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
        style={{ transform: isHovered ? "translateY(3px)" : "translateY(0)" }}
      >
        <div className="relative flex flex-grow flex-col h-full p-2">
          <KebabMenu
            className="absolute right-0 mt-1"
            options={[
              { label: "Edit", onClick: () => onEdit?.(deck) },
              { label: "Delete", onClick: () => onDelete?.(deck) },
            ]}
          />
          <div className="flex items-start justify-between">
            <div className="w-[90%]">
              <h2 className="font-bold text-lg p-0 truncate">{deck.name}</h2>
              <p className="text-xs dark:text-zinc-400 p-0 truncate">
                {deck.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto gap-2">
            <p className="text-sm dark:text-zinc-400">{deck.folderName}</p>
            <p className="text-sm">{deck.cardCount} Cards</p>
          </div>
        </div>
      </div>
    </div>
  );
}
