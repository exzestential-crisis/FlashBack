export default function EmptyFolder() {
  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-full">
      <img src="/states/empty-folder.png" alt="" className="h-40 mb-4" />
      <p className="text-zinc-500 font-bold text-lg">
        It&apos;s pretty Empty in here.
        <br />
        Create a folder to get started!
      </p>
    </div>
  );
}
