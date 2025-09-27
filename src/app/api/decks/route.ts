// app/api/decks/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/utils/helpers/getAuthenticatedUser";
import { createDeck, getUserDecksWithCounts } from "@/db/queries/deck";
import { NewDeck } from "@/db/tables/decks";

export async function GET() {
  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const userId = user!.user_id;
  const decks = await getUserDecksWithCounts(userId);

  return NextResponse.json(decks);
}

export async function POST(req: NextRequest) {
  const { error, user, response } = await getAuthenticatedUser();
  if (error) return response;

  const body = await req.json();

  const newDeck: NewDeck = {
    userId: user!.user_id,
    name: body.name,
    description: body.description ?? null,
    folderId: body.folderId ?? null,
  };

  // Create the deck
  await createDeck(newDeck);

  // Fetch the full deck with computed fields
  const fullDecks = await getUserDecksWithCounts(user!.user_id);
  const createdDeck = fullDecks.find(
    (d) => d.name === body.name && d.folderId === body.folderId
  );

  return NextResponse.json(createdDeck);
}
