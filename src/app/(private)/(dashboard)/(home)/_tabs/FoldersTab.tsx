"use client";

import Loading from "@/app/loading";
import EmptyFolder from "@/components/empty/EmptyFolder";
import { useEffect, useState } from "react";
import { useFolderStore } from "@/stores/folders";

export default function FoldersTab() {
  const { folders, setFolders } = useFolderStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/folders")
      .then((res) => res.json())
      .then((data) => {
        setFolders(Array.isArray(data) ? data : data.folders || []);
        setLoading(false);
      });
  }, [setFolders]);

  if (loading) return <Loading />;

  return (
    <div className="h-full">
      {folders.length === 0 ? (
        <div className="flex items-center h-full">
          <EmptyFolder />
        </div>
      ) : (
        <pre>{JSON.stringify(folders, null, 2)}</pre>
      )}
    </div>
  );
}
