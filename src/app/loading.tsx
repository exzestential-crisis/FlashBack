export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
      <div className="flex gap-2">
        <div className="h-6 w-6 animate-bounce rounded-sm bg-zinc-800 dark:bg-zinc-200 [animation-delay:-0.3s]" />
        <div className="h-6 w-6 animate-bounce rounded-sm bg-zinc-800 dark:bg-zinc-200 [animation-delay:-0.15s]" />
        <div className="h-6 w-6 animate-bounce rounded-sm bg-zinc-800 dark:bg-zinc-200" />
      </div>
    </div>
  );
}
