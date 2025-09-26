export default function EmptyDeck() {
  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-full">
      <img src="/states/error.png" alt="" className="h-40 mb-4" />
      <p className="text-zinc-500 font-bold text-lg">
        It&apos;s pretty Empty in here.
        <br />
        Create a deck to get started!
      </p>
    </div>
  );
}
