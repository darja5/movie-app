"use client";
import { useState } from 'react';

interface SearchProps {
    onSearch: (query: string) => void,
    searchQuery: string,
    handleSearch: () => void
}

export default function SearchBar({ onSearch, searchQuery, handleSearch }: SearchProps) {
    const [value, setValue] = useState(searchQuery);

    return (
        <div className="mb-4 flex gap-2">
            <input
                type="text"
                placeholder="Search movies..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onSearch(e.target.value);
                }}
                className="flex-1 p-2 rounded bg-[#333333] text-white"
            />
            <button onClick={handleSearch} className="bg-[#E50000] px-4 py-2 rounded text-white">
                Search
            </button>

        </div>
    )
}