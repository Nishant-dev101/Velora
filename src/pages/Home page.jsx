import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Movie_card from "../components/movie_card.jsx";
import "../css/Home.css";

import { getpopularmovies, searchmovies } from "../services/api.js";
import { setMovies, setEmptyArray } from "../store/features/moviesSlice.js";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  const [searchQuery, setSerachQuery] = useState("");
  // const [Movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const location = useLocation();


   
      
    
    const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await getpopularmovies({ pages });
      dispatch(setMovies(popularMovies));
    } catch (err) {
      console.log(err);
      setError("failed to load movies..");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only reload popular movies if on Home route
    if (location.pathname === "/") {
      dispatch(setEmptyArray());
      loadPopularMovies();
    }
    // eslint-disable-next-line
  }, [location]);

  function handleLoadMore(e) {
    const nextPage = pages + 1;
    setPages(nextPage);
    if (searchQuery) {
      handleSearch(e);
    } else loadPopularMovies();
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    try {
      setLoading(true);
      dispatch(setEmptyArray());
      const searchResults = await searchmovies({ searchQuery, pages });
      dispatch(setMovies(searchResults));
      setError(null);
    } catch (err) {
      console.log(err);
      setError("failed to search movies..");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSerachQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          {" "}
          Search
        </button>
      </form>

      {error && <div className="error-message">{error} </div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <Movie_card movie={movie} key={movie.id} />
          ))}
        </div>
      )}

      <div className="loadMoreContainer">
        <button className="loadMorebtn" onClick={handleLoadMore}>
          Load More..
        </button>
      </div>
    </div>
  );
}

export default Home;
