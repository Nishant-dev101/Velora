
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

export const getMovieDetails = async (movieId) => {
  const movieUrl = `${base_Url}/movie/${movieId}?api_key=${tmdbApiKey}&append_to_response=videos,credits,images,recommendations,similar,release_dates`;
  const providersUrl = `${base_Url}/movie/${movieId}/watch/providers?api_key=${tmdbApiKey}`;
  const reviewsUrl = `${base_Url}/movie/${movieId}/reviews?api_key=${tmdbApiKey}&page=1`;

  const [movieResponse, providersResponse, reviewsResponse] = await Promise.all([
    fetch(movieUrl),
    fetch(providersUrl),
    fetch(reviewsUrl),
  ]);

  if (!movieResponse.ok || !providersResponse.ok || !reviewsResponse.ok) {
    throw new Error("TMDB movie details request failed");
  }

  const [movieData, providersData, reviewsData] = await Promise.all([
    movieResponse.json(),
    providersResponse.json(),
    reviewsResponse.json(),
  ]);

  return {
    ...movieData,
    providers: providersData?.results ?? {},
    reviews: reviewsData?.results ?? [],
    similar: movieData?.similar?.results ?? [],
    recommendations: movieData?.recommendations?.results ?? [],
  };
};

export const searchMovies = async ({ searchQuery, page = 1 }) => {
  console.log(searchQuery, page);
  
  const response = await fetch(
    `${base_Url}/search/multi?api_key=${tmdbApiKey}&query=${encodeURIComponent(searchQuery)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  const data = await response.json();
  console.log(data)
  return data.results ?? [];
};

export const searchmovies = searchMovies;
 