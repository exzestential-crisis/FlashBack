import { NextResponse, NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/utils/helpers/getAuthenticatedUser";
import { updateDeck, getUserDecksWithCounts } from "@/db/queries/deck";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  const { deckId } = await params;

  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const body = await req.json();
  const updateData = {
    name: body.name,
    description: body.description,
    folderId: body.folderId,
  };

  Object.keys(updateData).forEach(
    (key) =>
      updateData[key as keyof typeof updateData] === undefined &&
      delete updateData[key as keyof typeof updateData]
  );

  const updated = await updateDeck(deckId, user!.user_id, updateData);

  if (!updated) {
    return NextResponse.json(
      { error: "Deck not found or unauthorized" },
      { status: 404 }
    );
  }

  // Fetch the full deck with counts, folder name/color
  const [updatedDeckWithMeta] = await getUserDecksWithCounts(
    user!.user_id
  ).then((decks) => decks.filter((d) => d.deckId === deckId));

  return NextResponse.json(updatedDeckWithMeta);
}
