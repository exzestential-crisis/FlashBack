"use client";

import { useEffect, useState } from "react";
import { useFolderStore } from "@/stores/folders";

import Loading from "@/app/loading";
import EmptyFolder from "@/components/empty/EmptyFolder";

import { FolderCard } from "@/components/cards/folders";

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

  if (folders.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <EmptyFolder />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {folders.map((folder) => (
        <FolderCard key={folder.folderId} folder={folder} />
      ))}
    </div>
  );
}
