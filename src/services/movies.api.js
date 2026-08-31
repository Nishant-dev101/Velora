
import { base_Url, tmdbApiKey } from "./api";

const getMovies = async (path, page) => {
  const pageQuery = page ? `&page=${page}` : "";
  const response = await fetch(`${base_Url}${path}?api_key=${tmdbApiKey}${pageQuery}`);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results ?? [];
};



export const getPopularMovies = ({ page } = {}) => getMovies("/movie/popular", page);
export const getTopRatedMovies = ({ page } = {}) => getMovies("/movie/top_rated", page);
export const getTrendingMovies = ({ page } = {}) => getMovies("/trending/movie/day", page);
export const getNowPlayingMovies = ({ page } = {}) => getMovies("/movie/now_playing", page);
export const getUpcomingMovies = ({ page } = {}) => getMovies("/movie/upcoming", page);

export const searchMovies = async ({ searchQuery, pages = 1 }) => {
  const response = await fetch(
    `${base_Url}/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(searchQuery)}&page=${pages}`
  );
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  const data = await response.json();
  return data.results ?? [];
};

export const searchmovies = searchMovies;
