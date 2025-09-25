import { db } from "@/db";
import { decks } from "@/db/tables/decks";
import { cards } from "@/db/tables/cards";
import { folders } from "@/db/tables/folders";
import { eq, sql, getTableColumns } from "drizzle-orm";
import type { DeckWithMeta } from "@/db/types";

export async function getUserDecksWithCounts(
  userId: string
): Promise<DeckWithMeta[]> {
  return await db
    .select({
      ...getTableColumns(decks), // ✅ selects all deck columns safely
      folderName: folders.name,
      folderColor: folders.colorId,
      cardCount: sql<number>`CAST(COUNT(${cards.cardId}) AS INT)`.as(
        "cardCount"
      ),
    })
    .from(decks)
    .leftJoin(cards, eq(cards.deckId, decks.deckId))
    .leftJoin(folders, eq(folders.folderId, decks.folderId))
    .where(eq(decks.userId, userId))
    .groupBy(
      decks.deckId,
      decks.name,
      decks.description,
      decks.createdAt,
      decks.lastModified,
      decks.isFavorite,
      decks.isPublic,
      decks.userId,
      decks.folderId,
      decks.lastStudied,
      decks.isDeleted,
      decks.deletedAt,
      folders.name,
      folders.colorId
    );
}
