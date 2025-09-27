// stores/tabs.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TabsStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useTabsStore = create<TabsStore>()(
  persist(
    (set) => ({
      activeTab: "", // will default to first tab in hook if empty
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "tabs-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
