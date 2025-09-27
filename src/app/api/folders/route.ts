// app/api/folders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/utils/helpers/getAuthenticatedUser";
import {
  getFoldersByUser,
  createFolder,
  updateFolder,
  deleteFolder,
} from "@/db/queries/folder";
import type { NewFolder } from "@/db/tables/folders";

// --- GET: get all folders for the authenticated user ---
export async function GET() {
  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const folders = await getFoldersByUser(user!.user_id);
  return NextResponse.json(folders);
}

// --- POST: create a new folder ---
export async function POST(req: NextRequest) {
  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const body = await req.json();
  const newFolder: NewFolder = {
    userId: user!.user_id,
    name: body.name,
    colorId: body.colorId,
    isFavorite: body.isFavorite ?? false,
  };

  const created = await createFolder(newFolder);
  return NextResponse.json(created);
}

// --- PATCH: update a folder ---
export async function PATCH(req: NextRequest) {
  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const body = await req.json();
  const folderId: string = body.folderId;

  const updateData: Partial<NewFolder> = {
    name: body.name,
    colorId: body.colorId,
    isFavorite: body.isFavorite,
  };

  // Remove undefined keys
  (Object.keys(updateData) as (keyof typeof updateData)[]).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  const updated = await updateFolder(folderId, user!.user_id, updateData);

  if (!updated) {
    return NextResponse.json(
      { error: "Folder not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

// --- DELETE: delete a folder ---
export async function DELETE(req: NextRequest) {
  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const { folderId } = await req.json();
  await deleteFolder(folderId, user!.user_id);

  return NextResponse.json({ success: true });
}
