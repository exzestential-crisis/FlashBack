"use client";

import { BaseModal, Spinner, EmptyState, Deck } from "@/components";
import { useEffect, useState } from "react";

// API response type
type DeckApiType = {
  id: string;
  name: string;
  description: string;
  folder: {
    name: string;
    color_id: number;
  };
  card_count: number;
};

export default function DeckTab() {
  // ui
  const [decks, setDecks] = useState<DeckApiType[]>([]);
  const [folders, setFolders] = useState<
    Array<{ folder_id: string; name: string; color_id: number }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [IsEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Track which deck is being edited
  const [selectedDeck, setSelectedDeck] = useState<DeckApiType | null>(null);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    folder_id: "",
  });

  // data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch both decks and folders
        const [decksRes, foldersRes] = await Promise.all([
          fetch("/api/decks"),
          fetch("/api/folders"),
        ]);

        const [decksJson, foldersJson] = await Promise.all([
          decksRes.json(),
          foldersRes.json(),
        ]);

        if (!decksRes.ok) {
          throw new Error(decksJson.error || "Failed to fetch decks");
        }

        if (!foldersRes.ok) {
          throw new Error(foldersJson.error || "Failed to fetch folders");
        }

        setDecks(decksJson.decks);
        setFolders(foldersJson.folders);
      } catch (err) {
        console.error("failed to fetch data: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle edit - now accepts the deck data
  const handleEdit = (deck: DeckApiType) => {
    setSelectedDeck(deck);
    setEditForm({
      name: deck.name,
      description: deck.description,
      folder_id: deck.folder.name, // You might need to adjust this based on your folder structure
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (deck: DeckApiType) => {
    setSelectedDeck(deck);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission
  const handleSaveEdit = async () => {
    if (!selectedDeck) return;

    try {
      const res = await fetch(`/api/decks/${selectedDeck.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          folder_id: editForm.folder_id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update deck");
      }

      // Refresh the decks list
      const updatedRes = await fetch("/api/decks");
      const updatedJson = await updatedRes.json();
      setDecks(updatedJson.decks);

      // Close modal and reset state
      setIsEditModalOpen(false);
      setSelectedDeck(null);
      setEditForm({ name: "", description: "", folder_id: "" });
    } catch (err) {
      console.error("Failed to update deck:", err);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: keyof typeof editForm, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <Spinner full />;

  return (
    <div className="p-4 h-full">
      {decks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {decks.map((deck: DeckApiType) => (
            <div key={deck.id} className="flex justify-center py-4">
              <Deck
                id={deck.id}
                name={deck.name}
                description={deck.description}
                folderName={deck.folder.name}
                cardCount={deck.card_count}
                colorId={deck.folder.color_id}
                onEdit={() => handleEdit(deck)} // Pass the deck data
                onDelete={() => handleDelete(deck)} // Pass the deck data
              />
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <BaseModal
        isOpen={IsEditModalOpen}
        confirmText="Save"
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDeck(null);
          setEditForm({ name: "", description: "", folder_id: "" });
        }}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedDeck(null);
          setEditForm({ name: "", description: "", folder_id: "" });
        }}
        onConfirm={handleSaveEdit} // Add this to handle save
      >
        <h2 className="text-lg font-bold mb-4">
          Edit Deck: {selectedDeck?.name}
        </h2>
        <div className="mb-4 space-y-4">
          <label
            className="block dark:text-zinc-300 text-sm font-semibold mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="
              appearance-none dark:bg-zinc-700 
              focus:ring-sky-700 focus:border-sky-700 focus:outline-none 
              p-2.5 rounded-lg w-full"
            id="title"
            type="text"
            placeholder="Deck Title"
            value={editForm.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <label
            className="block dark:text-zinc-300 text-sm font-semibold mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="
              appearance-none dark:bg-zinc-700 
              focus:ring-sky-700 focus:border-sky-700 focus:outline-none 
              p-2.5 rounded-lg w-full mb-2"
            id="description"
            placeholder="Deck Description"
            value={editForm.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <label
            className="block dark:text-zinc-300 text-sm font-semibold mb-1"
            htmlFor="folder"
          >
            Select Folder
          </label>
          <select
            id="folder"
            name="folder"
            className="
              appearance-none dark:bg-zinc-700 
              focus:ring-sky-700 focus:border-sky-700 focus:outline-none 
              p-2.5 rounded-lg w-full mb-2"
            value={editForm.folder_id}
            onChange={(e) => handleInputChange("folder_id", e.target.value)}
          >
            {folders.map((folder) => (
              <option key={folder.folder_id} value={folder.folder_id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
      </BaseModal>

      {/* Delete Modal */}
      <BaseModal
        isOpen={isDeleteModalOpen}
        cancelText="Delete"
        confirmText="Cancel"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedDeck(null);
        }}
      >
        <h2 className="text-lg font-bold mb-2">
          Delete Deck: {selectedDeck?.name}?
        </h2>
        <div className="mb-6">
          <p className="font-semibold">
            Are you sure you want to delete this deck?
          </p>
          <p className="text-xs text-zinc-300">
            This will move the deck to your trash. You can restore or
            permanently delete it later from the Trash page.
          </p>
        </div>
      </BaseModal>
    </div>
  );
}
