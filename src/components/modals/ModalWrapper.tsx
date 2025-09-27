// components/modals/ModalWrapper.tsx
"use client";

import DeckModal from "./DeckModal";
// import DeleteModal from "./DeleteModal"; // create this
// import FolderModal from "./FolderModal"; // create this
import { useModalStore } from "@/stores/modalStore";

export default function ModalWrapper() {
  const { currentModal, modalData, closeModal } = useModalStore();

  if (!currentModal) return null;

  switch (currentModal) {
    case "deck":
      return <DeckModal initialData={modalData} onClose={closeModal} />;
    // case "delete":
    //   return <DeleteModal item={modalData} onClose={closeModal} />;
    // case "folder":
    //   return <FolderModal initialData={modalData} onClose={closeModal} />;
    default:
      return null;
  }
}
