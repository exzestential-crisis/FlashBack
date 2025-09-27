// hooks/useTabs.ts
import { useTabsStore } from "@/stores/tabs";

interface TabPanel {
  key: string;
  content: React.ReactNode;
}

export function useTabs(panels: TabPanel[]) {
  const { activeTab: storeActiveTab, setActiveTab: setStoreActiveTab } =
    useTabsStore();
  const tabs = panels.map((panel) => panel.key);

  // Default to first tab if store is empty or invalid
  const activeTab =
    storeActiveTab && tabs.includes(storeActiveTab) ? storeActiveTab : tabs[0];

  const setActiveTab = (tab: string) => {
    if (tabs.includes(tab)) {
      setStoreActiveTab(tab);
    }
  };

  const activeIndex = tabs.indexOf(activeTab);

  return { tabs, activeTab, activeIndex, setActiveTab };
}
