// lib/db/index.ts - Typed Database Connection

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import type { User, NewUser } from "./schema";
import type { PublicUser } from "@/types/auth";

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

// Typed helper functions
export async function createUser(userData: NewUser): Promise<User> {
  const [user] = await db.insert(schema.users).values(userData).returning();

  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
}

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  return await db.query.users.findFirst({
    where: eq(schema.users.email, email),
  });
}

export async function findUserById(
  id: number
): Promise<PublicUser | undefined> {
  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, id),
    columns: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user as PublicUser | undefined;
}

export async function findUserByGoogleId(
  googleId: string
): Promise<User | undefined> {
  return await db.query.users.findFirst({
    where: eq(schema.users.googleId, googleId),
  });
}

export async function updateUserById(
  id: number,
  updates: Partial<Omit<User, "id" | "createdAt">>
): Promise<User | undefined> {
  const [user] = await db
    .update(schema.users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(schema.users.id, id))
    .returning();

  return user;
}

export async function deleteUserById(id: number): Promise<boolean> {
  const result = await db.delete(schema.users).where(eq(schema.users.id, id));

  return result.length > 0;
}
