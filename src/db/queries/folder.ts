import { db } from "@/db"; // your Drizzle instance
import { folders, Folder, NewFolder } from "../tables/folders";
import { eq, and } from "drizzle-orm";

// --- Get all folders for a user ---
export async function getFoldersByUser(userId: string): Promise<Folder[]> {
  return db.select().from(folders).where(eq(folders.userId, userId));
}

// --- Create a new folder ---
export async function createFolder(folderData: NewFolder): Promise<Folder> {
  const [newFolder] = await db.insert(folders).values(folderData).returning();
  return newFolder;
}

// --- Update a folder (user-scoped, like deck update) ---
export async function updateFolder(
  folderId: string,
  userId: string,
  updateData: Partial<NewFolder>
): Promise<Folder | null> {
  const [updatedFolder] = await db
    .update(folders)
    .set(updateData)
    .where(and(eq(folders.folderId, folderId), eq(folders.userId, userId)))
    .returning();

  return updatedFolder || null;
}

// --- Delete a folder (user-scoped, like deck delete) ---
export async function deleteFolder(
  folderId: string,
  userId: string
): Promise<void> {
  await db
    .delete(folders)
    .where(and(eq(folders.folderId, folderId), eq(folders.userId, userId)));
}
