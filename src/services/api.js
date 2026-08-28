


const api_key = "8b199042aa185de7113d9f12d90d04f0";
const base_Url = 'https://api.themoviedb.org/3' 

const getMovies = async (path, page) => {
  const pageQuery = page ? `&page=${page}` : "";
  const response = await fetch(`${base_Url}${path}?api_key=${api_key}${pageQuery}`);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results ?? [];
};

export const getPopularMovies = ({ page }) => getMovies("/movie/popular", page);
export const getTopRatedMovies = ({ page }) => getMovies("/movie/top_rated", page);
export const getTrendingMovies = () => getMovies("/trending/movie/day");
export const getNowPlayingMovies = ({ page }) => getMovies("/movie/now_playing", page);
export const getPopularTV = ({ page }) => getMovies("/tv/popular", page);



 
export const searchmovies = async ({searchQuery,pages}) =>{
 
  const response = await fetch(`${base_Url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(searchQuery)}&page=${pages}`);
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  const data = await response.json();
  return data.results ?? [];

 };
