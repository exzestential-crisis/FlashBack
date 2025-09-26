//db/types.ts

import type { Deck } from "@/db/tables/decks";

export type DeckWithMeta = Deck & {
  cardCount: number;
  folderName: string | null; // <- was `? string`, should allow null
  folderColor: number | null; // <- was `? number | null`, simplify
};
