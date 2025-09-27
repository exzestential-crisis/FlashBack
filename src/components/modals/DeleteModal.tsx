"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { LightButton, TextButton } from "../ui/custom";
import { Cross } from "../icons";

interface DeleteModalProps {
  type: "deck" | "folder";
  name?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void; // allow async
}

export default function DeleteModal({
  type,
  name,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (isDeleting) return; // guard
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full max-w-sm p-6 relative mx-6 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close"
          disabled={isDeleting}
        >
          <Cross />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">
          Delete {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>

        {/* Message */}
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Are you sure you want to delete{" "}
          <span className="font-medium">{name || `this ${type}`}</span>? This
          action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <LightButton text="Cancel" onClick={onClose} disabled={isDeleting} />
          <TextButton
            text={isDeleting ? "Deleting..." : "Delete"}
            variant="danger"
            onClick={handleConfirm}
            disabled={isDeleting}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
