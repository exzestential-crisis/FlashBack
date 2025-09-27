import { create } from "zustand";
import type { DeckWithMeta } from "@/db/types";
import type { Folder } from "@/db/tables/folders";

type ModalType = "deck" | "delete" | "folder";

type ModalData =
  | { type: "deck"; data: DeckWithMeta }
  | { type: "folder"; data: Folder }
  | {
      type: "delete";
      data: { id: string; name: string; target: "deck" | "folder" };
    };

interface ModalStore {
  currentModal?: ModalType;
  modalData?: ModalData;
  openModal: (
    type: ModalType,
    data?:
      | DeckWithMeta
      | Folder
      | { id: string; name: string; target: "deck" | "folder" }
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  currentModal: undefined,
  modalData: undefined,
  openModal: (type, data) => {
    let modalData: ModalData | undefined = undefined;
    if (data !== undefined) {
      if (type === "deck") {
        modalData = { type: "deck", data: data as DeckWithMeta };
      } else if (type === "folder") {
        modalData = { type: "folder", data: data as Folder };
      } else if (type === "delete") {
        modalData = {
          type: "delete",
          data: data as { id: string; name: string; target: "deck" | "folder" },
        };
      }
    }
    set({ currentModal: type, modalData });
  },
  closeModal: () => set({ currentModal: undefined, modalData: undefined }),
}));
