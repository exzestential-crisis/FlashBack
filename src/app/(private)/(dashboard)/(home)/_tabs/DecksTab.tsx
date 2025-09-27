"use client";

import { useEffect, useState } from "react";
import { useDeckStore } from "@/stores/decks";

import { DeckCard } from "@/components/cards/decks";
import Loading from "@/app/loading";
import EmptyDeck from "@/components/empty/EmptyDeck";

export default function DecksTab() {
  const { decks, setDecks } = useDeckStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then((data) => {
        setDecks(Array.isArray(data) ? data : data.decks || []);
        setLoading(false);
      });
  }, [setDecks]);

  if (loading) return <Loading />;

  return (
    <div className="h-full p-4">
      {decks.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <EmptyDeck />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {decks.map((deck) => (
            <div key={deck.deckId} className="flex justify-center">
              <DeckCard deck={deck} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
