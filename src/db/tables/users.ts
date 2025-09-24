import { pgTable, uuid, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: uuid("user_id").defaultRandom().primaryKey(), // uuid_generate_v4()
  authId: uuid("auth_id"), // external auth provider link (nullable)

  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  themePreference: varchar("theme_preference", { length: 50 }),
  lastLogin: timestamp("last_login", { withTimezone: true }),

  userType: varchar("user_type", { length: 50 }),
  interests: jsonb("interests"), // array/object of user interests

  schoolId: uuid("school_id"), // references schools table (if it exists)
});

// --- Types ---
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
