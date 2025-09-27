"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Panel = {
  key: string | number;
  content: React.ReactNode;
};

type AnimatedTabPanelProps = {
  panels: Panel[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export default function AnimatedTabPanel({
  panels,
  activeIndex,
  setActiveIndex,
}: AnimatedTabPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden h-full w-full">
      <motion.div
        className="flex h-full"
        drag="x"
        dragConstraints={{ left: -(panels.length - 1) * width, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          const threshold = width / 4; // need to drag at least 1/4 of width
          if (info.offset.x > threshold && activeIndex > 0) {
            setActiveIndex(activeIndex - 1); // swipe right
          } else if (
            info.offset.x < -threshold &&
            activeIndex < panels.length - 1
          ) {
            setActiveIndex(activeIndex + 1); // swipe left
          }
        }}
        animate={{ x: -activeIndex * width }}
        transition={{ type: "tween", duration: 0.4 }}
      >
        {panels.map((panel) => (
          <div key={panel.key} className="flex-none w-full h-full">
            {panel.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
