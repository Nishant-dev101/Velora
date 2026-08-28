import React, { useState } from "react";

const SearchBar = () => {

        const [ searchQuery, setSerachQuery ] = useState("")

        const handleSearch = (event) => {
          event.preventDefault()
         
    }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex h-9 w-[min(42vw,280px)] gap-2">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search movies"
          className="min-w-0 flex-1 border border-white/30 bg-black px-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-white"
          value={searchQuery}
          onChange={(e) => setSerachQuery(e.target.value)}
        />

        <button aria-label="Submit movie search" type="submit" className="flex w-10 shrink-0 items-center justify-center bg-[#e50914] text-lg text-white transition hover:bg-[#f6121d] focus:outline-none focus:ring-2 focus:ring-[#e50914]/50">
          ⌕
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
