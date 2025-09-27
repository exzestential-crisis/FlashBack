import { db } from "@/db"; // your Drizzle instance
import { folders, Folder, NewFolder } from "../tables/folders";
import { eq } from "drizzle-orm";

export async function getFoldersByUser(userId: string): Promise<Folder[]> {
  return db.select().from(folders).where(eq(folders.userId, userId));
}

// --- Create a new folder ---
export async function createFolder(folderData: NewFolder): Promise<Folder> {
  const [newFolder] = await db.insert(folders).values(folderData).returning();
  return newFolder;
}

// --- Update a folder partially ---
export async function updateFolder(
  folderId: string,
  updateData: Partial<NewFolder>
): Promise<Folder | null> {
  const [updatedFolder] = await db
    .update(folders)
    .set(updateData)
    .where(eq(folders.folderId, folderId))
    .returning();
  return updatedFolder || null;
}

// --- Optional: Delete a folder ---
export async function deleteFolder(folderId: string): Promise<void> {
  await db.delete(folders).where(eq(folders.folderId, folderId));
}
