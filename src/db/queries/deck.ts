import { db } from "@/db";
import { decks } from "@/db/tables/decks";
import { cards } from "@/db/tables/cards";
import { folders } from "@/db/tables/folders";
import { eq, getTableColumns, count, and } from "drizzle-orm";

import type { DeckWithMeta } from "@/db/types";
import type { Deck, NewDeck } from "@/db/tables/decks";

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

export async function getUserDecksByFolder(
  userId: string,
  folderId: string
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
    .where(and(eq(decks.userId, userId), eq(decks.folderId, folderId)))
    .groupBy(
      ...Object.values(getTableColumns(decks)),
      folders.name,
      folders.colorId
    );
}

export async function updateDeck(
  deckId: string,
  userId: string,
  updateData: Partial<NewDeck>
): Promise<Deck | null> {
  const [updatedDeck] = await db
    .update(decks)
    .set(updateData)
    .where(and(eq(decks.deckId, deckId), eq(decks.userId, userId)))
    .returning();

  return updatedDeck || null;
}

export async function createDeck(newDeck: NewDeck) {
  return await db.insert(decks).values(newDeck).returning();
}
