import { pgTable, uuid, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  cardId: uuid("card_id").defaultRandom().primaryKey(), // uuid_generate_v4()
  deckId: uuid("deck_id").notNull(),

  frontContent: text("front_content").notNull(),
  backContent: text("back_content").notNull(),

  frontContentType: varchar("front_content_type").notNull().default("plain"),
  backContentType: varchar("back_content_type").notNull().default("plain"),

  frontImageUrl: varchar("front_image_url"), // nullable by default
  backImageUrl: varchar("back_image_url"),
  notes: text("notes"),

  position: integer("position").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastModified: timestamp("last_modified", { withTimezone: true })
    .notNull()
    .defaultNow(),

  colorId: integer("color_id"),
});

// --- Auto-inferred types ---
export type Card = typeof cards.$inferSelect; // SELECT * FROM cards
export type NewCard = typeof cards.$inferInsert; // INSERT INTO cards
