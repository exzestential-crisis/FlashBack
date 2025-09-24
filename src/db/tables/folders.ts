import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const folders = pgTable("folders", {
  folderId: uuid("folder_id").defaultRandom().primaryKey(), // uuid_generate_v4()
  userId: uuid("user_id").notNull(),

  name: varchar("name", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastModified: timestamp("last_modified", { withTimezone: true })
    .notNull()
    .defaultNow(),

  isFavorite: boolean("is_favorite").notNull().default(false),
  colorId: integer("color_id"),
});

// --- Auto-inferred types ---
export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
