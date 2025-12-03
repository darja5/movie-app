"use client";

interface SearchProps {
    onSearch: (query: string) => void,
    searchQuery: string,
    handleSearch: () => void
}

export default function SearchBar({ onSearch, searchQuery, handleSearch }: SearchProps) {
    return (
        <div className="mb-4 flex gap-2">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => {
                    onSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
                className="flex-1 p-2 rounded bg-[#333333] text-white focus:outline-none focus:ring-0"
            />
            <button onClick={handleSearch} className="bg-[#E50000] px-4 py-2 rounded text-white transition duration-200 hover:bg-red-700 active:scale-95">
                Search
            </button>
        </div>
    )
}