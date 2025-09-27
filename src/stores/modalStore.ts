// stores/modalStore.ts
import { create } from "zustand";
import type { DeckWithMeta } from "@/db/types";
import type { Folder } from "@/db/tables/folders";

type ModalType = "deck" | "delete" | "folder";

interface ModalStore {
  currentModal?: ModalType;
  modalData?: any; // can be DeckWithMeta, Folder, or item id for delete
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  currentModal: undefined,
  modalData: undefined,
  openModal: (type, data) => set({ currentModal: type, modalData: data }),
  closeModal: () => set({ currentModal: undefined, modalData: undefined }),
}));
