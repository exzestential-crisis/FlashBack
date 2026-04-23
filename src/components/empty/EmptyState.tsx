import { ReactNode } from "react";
import { TbGhost2Filled } from "react-icons/tb";

type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({
  message = "It's pretty empty in here.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400">
      <TbGhost2Filled className="h-20 w-20 m-4" />
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
