// components/modals/ModalWrapper.tsx
"use client";

import DeckModal from "./DeckModal";
import DeleteModal from "./DeleteModal";
import FolderModal from "./FolderModal";
import { useModalStore } from "@/stores/modalStore";
import { useDeckStore } from "@/stores/decks";
import { useFolderStore } from "@/stores/folders";

export default function ModalWrapper() {
  const { currentModal, modalData, closeModal } = useModalStore();
  const removeDeck = useDeckStore((s) => s.removeDeck);
  const removeFolder = useFolderStore((s) => s.removeFolder);

  if (!currentModal) return null;

  switch (currentModal) {
    case "deck":
      return (
        <DeckModal
          initialData={
            modalData && modalData.type === "deck" ? modalData.data : undefined
          }
          onClose={closeModal}
        />
      );

    case "delete":
      if (!modalData || modalData.type !== "delete") return null;

      return (
        <DeleteModal
          type={modalData.data.target}
          name={modalData.data.name}
          onClose={closeModal}
          onConfirm={async () => {
            if (modalData.data.target === "deck") {
              await fetch(`/api/decks/${modalData.data.id}`, {
                method: "DELETE",
              });
              removeDeck(modalData.data.id);
            } else {
              await fetch(`/api/folders/${modalData.data.id}`, {
                method: "DELETE",
              });
              removeFolder(modalData.data.id);
            }
            closeModal();
          }}
        />
      );
      if (!modalData) return null;

    case "folder":
      return (
        <FolderModal
          initialData={
            modalData && modalData.type === "folder"
              ? modalData.data
              : undefined
          }
          onClose={closeModal}
        />
      );

    default:
      return null;
  }
}
