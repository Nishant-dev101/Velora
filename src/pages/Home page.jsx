import { useState, useEffect } from "react";
import Movie_card from "../components/movie_card.jsx";

import { getpopularmovies } from "../services/api.js";

function Home() {
  // const dispatch = useDispatch();
  // const movies = useSelector((state) => state.movies.movies);

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
   
      
    
    const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await getpopularmovies({ page });
      setMovies(prev => [...prev, ...popularMovies])
    } catch (err) {
      console.log(err); 
      setError("failed to load movies..");
    } finally {
      setLoading(false);
    } }
  

  useEffect(() => {
    // Only reload popular movies if on Home route
       
      loadPopularMovies();
   
    // eslint-disable-next-line
  }, []);

  const handleLoadMore = async () => {
    const nextPage = page + 1
    const res = await getpopularmovies({page: nextPage})
    console.log(res)
    setMovies(prev => [...prev, ...res])
    setPage(nextPage);
    
  }

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[radial-gradient(circle_at_top_right,_rgba(229,9,20,0.12),_transparent_32rem)] py-8 sm:py-10">
      <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#e50914]">Popular right now</p>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Trending movies</h1>
        </div>
        <span className="text-xs text-white/40">Updated daily</span>
      </div>
     

      {error && <div className="rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-center text-sm text-red-300">{error}</div>}

      {loading ? (
        <div className="py-16 text-center text-slate-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 py-4 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5">
          { movies && movies.map((movie) => (
            <Movie_card movie={movie} key={movie.id} />
          ))}
        </div>
      )}

      <div className="flex justify-center pt-6">
        <button className="border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-[#e50914]" onClick={handleLoadMore}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default Home;
