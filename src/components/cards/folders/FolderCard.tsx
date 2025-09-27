"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { getColorVariants } from "@/utils/colorUtils";
import { useModalStore } from "@/stores/modalStore";
import type { Folder } from "@/db/tables/folders";

import { KebabMenu } from "@/components/ui";

type FolderCardProps = {
  folder: Folder;
  onDelete?: (folder: Folder) => void;
};

export default function FolderCard({ folder }: FolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = getColorVariants(folder.colorId ?? 8);

  const { openModal } = useModalStore();

  return (
    <div className="px-4 h-40 w-60 max-sm:h-32 max-sm:w-44">
      <div
        className="relative h-full w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Back Layer */}
        <motion.div
          className="relative h-full w-full z-0"
          initial={{ scaleY: 1, rotate: 0, skewX: 0 }}
          animate={{
            x: isHovered ? -8 : 0,
            y: isHovered ? 4 : 0,
            scaleY: isHovered ? 1.01 : 1,
            rotate: isHovered ? -1 : 0,
            skewX: isHovered ? 4 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="relative flex top-0 w-full h-1/2">
            <div
              className="w-1/3 h-full rounded-tl-xl rounded-tr-lg"
              style={{ backgroundColor: colors.dark }}
            />
            <div
              className="absolute left-11 sm:left-16 w-10 h-[90%] clip-triangle-right"
              style={{ backgroundColor: colors.dark }}
            />
          </div>
          <div
            className="absolute bottom-0 h-6/7 w-[90%] rounded-b-3xl rounded-r-3xl"
            style={{ backgroundColor: colors.dark }}
          />
        </motion.div>
        {/* Front Layer */}
        <motion.div
          className="absolute bottom-0 h-5/7 w-full z-10 rounded-3xl origin-bottom-right"
          initial={{ y: 0, skewX: 0 }}
          animate={{
            y: isHovered ? 8 : 0,
            scaleY: isHovered ? 0.9 : 1,
            skewX: isHovered ? -10 : 0,
            rotate: isHovered ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ backgroundColor: colors.light }}
        >
          <div
            className="absolute bottom-4 right-4 z-20 h-4 w-14"
            style={{ backgroundColor: colors.base }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex justify-between items-center py-2 gap-2">
        <p className="text-sm sm:text-base truncate">{folder.name}</p>
        <KebabMenu
          type="H"
          options={[
            {
              label: "Edit",
              onClick: () => openModal("folder", folder),
            },
            {
              label: "Delete",
              onClick: () => openModal("delete", folder.folderId),
            },
          ]}
        />
      </div>
    </div>
  );
}
