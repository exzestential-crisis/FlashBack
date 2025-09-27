"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import type { DeckWithMeta } from "@/db/types";
import { useDeckStore } from "@/stores/decks";
import { useFolderStore } from "@/stores/folders"; // 👈 assuming you have this

import { Dropdown, Input, TextArea } from "../forms";
import { LightButton, TextButton } from "../ui/custom";
import { Cross } from "../icons";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addDeck = useDeckStore((state) => state.addDeck);
  const updateDeck = useDeckStore((state) => state.updateDeck);
  const folders = useFolderStore((state) => state.folders); // 👈 grab folders

  useEffect(() => {
    document.getElementById("deck-name-input")?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrorMessage("Deck name cannot be empty.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full max-w-md p-6 relative mx-6 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close"
        >
          <Cross />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Deck" : "Create New Deck"}
        </h2>

        <div className="flex flex-col gap-3">
          {/* Name */}
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

          {/* Description */}
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deck Description"
          />

          <Dropdown
            id="folder-selector"
            value={currentFolderId ?? ""}
            onChange={(val) => setCurrentFolderId(val || null)}
            options={[
              { value: "", label: "No folder" },
              ...folders.map((folder) => ({
                value: folder.folderId,
                label: folder.name,
              })),
            ]}
            placeholder="Select a folder..."
            variant="plain" // or "blue" if you want the styled one
            required={false}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <LightButton text="Cancel" onClick={onClose} />
          <TextButton
            text={initialData ? "Save Changes" : "Create Deck"}
            onClick={handleSubmit}
            variant="default"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
