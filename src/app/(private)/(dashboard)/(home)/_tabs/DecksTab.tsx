"use client";

import Loading from "@/app/loading";
import EmptyDeck from "@/components/empty/EmptyDeck";
import { DeckWithMeta } from "@/db/types";
import { useEffect, useState } from "react";

export default function DecksTab() {
  const [decks, setDecks] = useState<DeckWithMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // <-- check what actually comes back
        setDecks(Array.isArray(data) ? data : data.decks || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="h-full">
      {decks.length === 0 ? (
        <div className="flex items-center h-full">
          <EmptyDeck />
        </div>
      ) : (
        <div>yes something cuh</div>
      )}
    </div>
  );
}
