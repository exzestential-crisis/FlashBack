// stores/folders.ts
import { create } from "zustand";
import type { Folder } from "@/db/tables/folders";

interface FolderStore {
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
  addFolder: (folder: Folder) => void;
  updateFolder: (folder: Folder) => void;
  removeFolder: (folderId: string) => void;
}

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
  addFolder: (folder) =>
    set((state) => ({ folders: [...state.folders, folder] })),
  updateFolder: (folder) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.folderId === folder.folderId ? folder : f
      ),
    })),
  removeFolder: (folderId) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.folderId !== folderId),
    })),
}));
