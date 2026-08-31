

import { useEffect, useRef, useState } from "react";
import MoviesGrid from "../components/moviesGrid";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/movies.api";

const categories = [
  { key: "popular", label: "Popular", fetcher: getPopularMovies },
  { key: "top-rated", label: "Top Rated", fetcher: getTopRatedMovies },
  { key: "now-playing", label: "Now Playing", fetcher: getNowPlayingMovies },
  { key: "upcoming", label: "Upcoming", fetcher: getUpcomingMovies },
];

const MoviesPage = () => {
  const [selected, setSelected] = useState("popular");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const isFetchingRef = useRef(false);

  const selectedCategory = categories.find((category) => category.key === selected) ?? categories[0];

  const fetchMovies = async (nextPage = 1, reset = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await selectedCategory.fetcher({ page: nextPage });

      if (!response || response.length === 0) {
        setHasMore(false);
        if (reset) setMovies([]);
        return;
      }

      if (reset) {
        setMovies(response);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response]);
      }

      setHasMore(response.length >= 20);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setMovies([]);
    fetchMovies(1, true);
  }, [selectedCategory.key]);

  useEffect(() => {
    const onScroll = () => {
      if (loading || !hasMore) return;

      const reachedBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 220;

      if (reachedBottom) {
        fetchMovies(page + 1, false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, hasMore, page, selectedCategory.key]);

  return (
    <section className="min-h-[calc(100vh-76px)] bg-[radial-gradient(circle_at_top_right,_rgba(229,9,20,0.18),_transparent_30rem)] py-8 sm:py-10">
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {categories.map((category) => {
            const active = category.key === selected;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setSelected(category.key)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5",
                  active
                    ? "border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-900/30"
                    : "border-white/10 bg-[#1d1d1d] text-gray-300 hover:border-white/20 hover:text-white",
                ].join(" ")}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-3 text-sm text-gray-300">
        <div>
          <span className="text-white">{selectedCategory.label}</span>
          <span className="ml-2 text-gray-400">movies</span>
        </div>
        <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-400">
          {loading ? "Loading..." : hasMore ? "More available" : "End of list"}
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-800/80 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="pb-10">
        <MoviesGrid movies={movies} />
      </div>

      {loading && (
        <div className="flex justify-center pb-8 text-sm text-gray-400">
          Loading more movies...
        </div>
      )}
    </section>
  );
};

export default MoviesPage;