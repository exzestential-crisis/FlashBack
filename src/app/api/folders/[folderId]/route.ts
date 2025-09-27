import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/utils/helpers/getAuthenticatedUser";
import { deleteFolder, updateFolder } from "@/db/queries/folder";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ folderId: string }> }
) {
  const { folderId } = await context.params; // ✅ must await

  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const body = await req.json();

  const updated = await updateFolder(folderId, user!.user_id, body);
  if (!updated) {
    return NextResponse.json(
      { error: "Folder not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ folderId: string }> }
) {
  const { folderId } = await context.params; // ✅ must await

  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  await deleteFolder(folderId, user!.user_id);

  return NextResponse.json({ success: true });
}
