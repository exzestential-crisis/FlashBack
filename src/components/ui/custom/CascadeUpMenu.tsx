type FloatingMenuProps = {
  isOpen: boolean;
  menuItems: { label: string; icon: React.ElementType; onClick: () => void }[];
};

export default function CascadeUpMenu({
  isOpen,
  menuItems,
}: FloatingMenuProps) {
  return (
    <div
      className={`absolute bottom-18 sm:bottom-24 right-0 w-48 flex flex-col items-end space-y-3 transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {menuItems.map((item, index) => (
        <div
          key={item.label}
          className="w-full transition-all duration-300"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(16px)",
            transitionDelay: isOpen
              ? `${(menuItems.length - 1 - index) * 50}ms`
              : "0ms",
          }}
        >
          <button
            className="
            dark:bg-brand text-white w-full flex py-3 px-4 items-center justify-between rounded-md shadow
            transition-colors duration-200 hover:bg-brand-light
          "
            onClick={item.onClick}
          >
            {item.label}
            <item.icon className="text-white text-2xl ml-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
