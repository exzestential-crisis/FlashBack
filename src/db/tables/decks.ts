//db/tables/deck.ts

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// --- Decks table ---
export const decks = pgTable("decks", {
  deckId: uuid("deck_id").defaultRandom().primaryKey(), // uuid_generate_v4()
  userId: uuid("user_id").notNull(),
  folderId: uuid("folder_id"),

  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastModified: timestamp("last_modified", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastStudied: timestamp("last_studied", { withTimezone: true }),

  isFavorite: boolean("is_favorite").notNull().default(false),
  isPublic: boolean("is_public").notNull().default(false),
  isDeleted: boolean("is_deleted").notNull().default(false),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

// --- Auto-inferred types ---
export type Deck = typeof decks.$inferSelect; // SELECT * FROM decks
export type NewDeck = typeof decks.$inferInsert; // INSERT INTO decks
