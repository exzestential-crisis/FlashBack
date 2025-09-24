import { relations } from "drizzle-orm";
import { cards } from "./cards";
import { decks } from "./decks";
import { folders } from "./folders";
import { users } from "./users";

export const cardsRelations = relations(cards, ({ one }) => ({
  deck: one(decks, {
    fields: [cards.deckId],
    references: [decks.deckId],
  }),
}));

export const decksRelations = relations(decks, ({ one, many }) => ({
  cards: many(cards),
  folder: one(folders, {
    fields: [decks.folderId],
    references: [folders.folderId],
  }),
}));

export const foldersRelations = relations(folders, ({ many }) => ({
  decks: many(decks),
}));

export const usersRelations = relations(users, ({ many }) => ({
  decks: many(decks),
  folders: many(folders),
}));