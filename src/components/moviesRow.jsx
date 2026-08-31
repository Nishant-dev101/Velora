import React from "react";
import MovieCard from "./movie_card";
import { useRef } from "react";

const MovieRow = ({ movies, title }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction === "left" ? -800 : 800,
      behavior: "smooth",
    });
  };

  const ArrowIcon = ({ direction }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M15 18L9 12l6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );

  return (
    <div>
      <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#e50914]">
            Popular right now
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
        </div>
        <span className="text-xs text-white/40">Updated daily</span>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
            className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg shadow-black/40 backdrop-blur-sm transition hover:scale-105 hover:border-white/40 hover:bg-black/75"
        >
          <ArrowIcon direction="left" />
        </button>

        <div
          className="flex gap-4 overflow-x-auto pb-2 pl-14 pr-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg shadow-black/40 backdrop-blur-sm transition hover:scale-105 hover:border-white/40 hover:bg-black/75"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
