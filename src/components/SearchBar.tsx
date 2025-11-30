"use client";
import { useState } from 'react';

interface SearchProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchProps){
    const [value, setValue] = useState("");

    return(
        <div className="mb-6 max-w-md mx-auto">
            <input
                type="text"
                placeholder="Search movies..."
                value={value}
                onChange={(e) =>{
                    setValue(e.target.value);
                    onSearch(e.target.value);
                }}
                className="w-full p-2 rounded bg-[#333] border border-grey-600"
                />
        </div>
    )
}