import { db } from "@/db";
import { decks } from "@/db/tables/decks";
import { cards } from "@/db/tables/cards";
import { folders } from "@/db/tables/folders";
import { eq, sql, getTableColumns, count } from "drizzle-orm";
import type { DeckWithMeta } from "@/db/types";

export async function getUserDecksWithCounts(
  userId: string
): Promise<DeckWithMeta[]> {
  return await db
    .select({
      ...getTableColumns(decks),
      folderName: folders.name,
      folderColor: folders.colorId,
      cardCount: count(cards.cardId).as("cardCount"),
    })
    .from(decks)
    .leftJoin(cards, eq(cards.deckId, decks.deckId))
    .leftJoin(folders, eq(folders.folderId, decks.folderId))
    .where(eq(decks.userId, userId))
    .groupBy(
      ...Object.values(getTableColumns(decks)),
      folders.name,
      folders.colorId
    );
}
