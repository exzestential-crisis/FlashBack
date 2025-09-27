"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import type { Folder } from "@/db/tables/folders";

import { Input, Dropdown } from "../forms";
import { LightButton, TextButton } from "../ui/custom";
import { useFolderStore } from "@/stores/folders";
import { colorData } from "@/utils/colorUtils";
import { Cross } from "../icons";

interface FolderModalProps {
  folderId?: string;
  initialData?: Folder;
  onClose?: () => void;
}

export default function FolderModal({
  folderId,
  initialData,
  onClose,
}: FolderModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [selectedColor, setSelectedColor] = useState(
    initialData?.colorId ? String(initialData.colorId) : ""
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addFolder = useFolderStore((state) => state.addFolder);
  const updateFolder = useFolderStore((state) => state.updateFolder);

  const colorOptions = colorData.map((c) => ({
    value: String(c.color_id),
    label: c.name,
    icon: (
      <span
        className="inline-block w-4 h-4 rounded-full border border-zinc-300 dark:border-zinc-600"
        style={{ backgroundColor: c.hex_code }}
      />
    ),
  }));

  useEffect(() => {
    document.getElementById("folder-name-input")?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrorMessage("Folder name cannot be empty.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const payload = {
      folderId: initialData?.folderId,
      name,
      colorId: selectedColor ? Number(selectedColor) : null,
    };

    try {
      const res = await fetch(
        initialData ? `/api/folders/${initialData.folderId}` : "/api/folders",
        {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save folder");

      const savedFolder: Folder = await res.json();

      if (initialData) updateFolder(savedFolder);
      else addFolder(savedFolder);

      onClose?.();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false); // re-enable if failed
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
          {initialData ? "Edit Folder" : "Create New Folder"}
        </h2>

        <div className="flex flex-col gap-2">
          <Input
            id="folder-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Folder Name"
            showRequiredIndicator
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <Dropdown
            value={selectedColor}
            onChange={setSelectedColor}
            options={colorOptions}
            placeholder="Choose a color"
            variant="plain"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <LightButton text="Cancel" onClick={onClose} />
          <TextButton
            text={initialData ? "Save Changes" : "Create Folder"}
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
