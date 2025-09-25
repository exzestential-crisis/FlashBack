import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar fixed top-0 z-10 bg-white dark:bg-zinc-900 shadow-lg shadow-gray-100 dark:shadow-black/30 w-full lg:px-40">
      <div className="grid grid-cols-2 py-3 px-6">
        <Link href="/" className="flex items-center">
          <div className="flex items-center cursor-pointer">
            <img src="/logo.svg" alt="FlashBack" className="pe-5 w-20" />
            <h1 className="lg:text-2xl font-semibold text-zinc-700 dark:text-zinc-200">
              FlashBack
            </h1>
          </div>
        </Link>
        <div className="flex items-center justify-end p-5">
          <a href="" className="text-md text-zinc-600 dark:text-zinc-400">
            About
          </a>
        </div>
      </div>
    </div>
  );
}
