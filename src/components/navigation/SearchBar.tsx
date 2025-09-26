export default function SearchBar() {
  return (
    <div>
      <form className="w-full">
        <input
          type="search"
          id="search"
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
        />
      </form>
    </div>
  );
}
