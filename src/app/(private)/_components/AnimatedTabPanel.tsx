"use client";

type Panel = {
  key: string | number;
  content: React.ReactNode; // content can be string, JSX, etc.
};

type AnimatedTabPanelProps = {
  panels: Panel[];
  activeIndex: number;
};

// In your original AnimatedTabPanel component:
export default function AnimatedTabPanel({
  panels,
  activeIndex,
}: AnimatedTabPanelProps) {
  return (
    <div className="relative overflow-hidden h-full">
      {" "}
      {/* Add min-h-[400px] */}
      {panels.map((panel, i) => {
        const x = i === activeIndex ? 0 : i < activeIndex ? -100 : 100;
        return (
          <div
            key={panel.key}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              i === activeIndex ? "overflow-auto" : "overflow-hidden"
            }`}
            style={{
              transform: `translateX(${x}%)`,
              opacity: i === activeIndex ? 1 : 0,
            }}
          >
            <div className="h-full">
              {" "}
              {/* Add padding wrapper */}
              {panel.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
