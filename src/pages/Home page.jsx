import { useState, useEffect } from "react";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../services/movies.api";
import { getPopularTV } from "../services/tvshows.api";
import MovieRow from "../components/moviesRow.jsx";
import Banner from "../components/Banner.jsx";

function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const [
        popularMovies,
        topRatedMovies,
        trendingMovies,
        nowPlayingMovies,
        popularTVShows,
      ] = await Promise.all([
        getPopularMovies({ page: 1 }),
        getTopRatedMovies({ page: 1 }),
        getTrendingMovies(),
        getNowPlayingMovies({ page: 1 }),
        getPopularTV({ page: 1 }),
      ]);

      setPopular(popularMovies);
      setTopRated(topRatedMovies);
      setTrending(trendingMovies);
      setNowPlaying(nowPlayingMovies);
      setPopularTV(popularTVShows);
    } catch (err) {
      console.error(err);
      setError("failed to load movies..");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const res = await getPopularMovies({ page: nextPage });
    setPopular((prev) => [...prev, ...res]);
    setPage(nextPage);
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[radial-gradient(circle_at_top_right,_rgba(229,9,20,0.12),_transparent_32rem)] py-8 sm:py-10">
      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-slate-400">Loading...</div>
      ) : (
        <div className="space-y-10">
          <Banner movies={trending} />
          <MovieRow movies={popular} title="Popular Movies" />
          <MovieRow movies={topRated} title="Top Rated Movies" />
          <MovieRow movies={popularTV} title="Popular TV Shows" />
          <MovieRow movies={trending} title="Trending Movies" />
          <MovieRow movies={nowPlaying} title="In Theatres right now" />
        </div>
      )}

      <div className="flex justify-center pt-6">
        
      </div>
    </div>
  );
}

export default Home;
