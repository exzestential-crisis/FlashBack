import { ImSearch } from "react-icons/im";
import { KebabMenu } from "../ui";

export default function MobileTopBar() {
  const MobileOptions = [
    { label: "Test1", onClick: () => {} },
    { label: "Select All", onClick: () => {} },
  ];

  return (
    <div className="flex sm:hidden bg-zinc-800 h-14">
      <div className="flex justify-end w-full p-4 gap-4">
        <ImSearch className="text-zinc-400 h-7 w-7" />

        <KebabMenu
          options={MobileOptions}
          size={30}
          className="text-zinc-400"
        />
      </div>
    </div>
  );
}
