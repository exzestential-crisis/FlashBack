"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import type { DeckWithMeta } from "@/db/types";
import { useDeckStore } from "@/stores/decks";

import { Input, TextArea } from "../forms";
import { LightButton, TextButton } from "../ui/custom";

interface DeckModalProps {
  folderId?: string;
  initialData?: DeckWithMeta;
  onClose?: () => void;
}

export default function DeckModal({
  folderId,
  initialData,
  onClose,
}: DeckModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [currentFolderId, setCurrentFolderId] = useState(
    folderId || initialData?.folderId || null
  );
  const [errorMessage, setErrorMessage] = useState(""); // new state

  const addDeck = useDeckStore((state) => state.addDeck);
  const updateDeck = useDeckStore((state) => state.updateDeck);

  // Autofocus first input on open
  useEffect(() => {
    document.getElementById("deck-name-input")?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrorMessage("Deck name cannot be empty."); // show error
      return;
    }
    setErrorMessage(""); // clear error if valid

    const payload = { name, description, folderId: currentFolderId };

    try {
      const res = await fetch(
        initialData ? `/api/decks/${initialData.deckId}` : "/api/decks",
        {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save deck");

      const savedDeck: DeckWithMeta = await res.json();

      if (initialData) updateDeck(savedDeck);
      else addDeck(savedDeck);

      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Deck" : "Create New Deck"}
        </h2>

        <div className="flex flex-col gap-2">
          <Input
            id="deck-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Deck Name"
            showRequiredIndicator
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deck Description"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <LightButton text="Cancel" onClick={onClose} />
          <TextButton
            text={initialData ? "Save Changes" : "Create Deck"}
            onClick={handleSubmit}
            variant="default"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
