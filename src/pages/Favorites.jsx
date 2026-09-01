import React from "react";
import { useSelector } from "react-redux";
import MoviesGrid from "../components/moviesGrid";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.movies) || [];

  return favorites.length > 0 ? (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e50914]">
          Your collection
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Favorite movies</h1>
      </div>

      <MoviesGrid movies={favorites} />
    </section>
  ) : (
    <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 py-20 text-center">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e50914]">
          Your collection
        </p>
        <h2 className="mb-3 text-2xl font-bold text-white">No favorite movies yet</h2>
        <p className="text-base leading-relaxed text-white/50">
          Start adding movies to your favorites.
        </p>
      </div>
    </div>
  );
};

export default Favorites;
