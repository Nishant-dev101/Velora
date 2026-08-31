
import { base_Url, tmdbApiKey } from "./api";

const getTVShows = async (path, page) => {
  const pageQuery = page ? `&page=${page}` : "";
  const response = await fetch(`${base_Url}${path}?api_key=${tmdbApiKey}${pageQuery}`);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results ?? [];
};

export const getPopularTV = ({ page } = {}) => getTVShows("/tv/popular", page);
export const getTopRatedTV = ({ page } = {}) => getTVShows("/tv/top_rated", page);
export const getAiringTodayTV = ({ page } = {}) => getTVShows("/tv/airing_today", page);
export const getOnTheAirTV = ({ page } = {}) => getTVShows("/tv/on_the_air", page);
export const getTrendingTV = ({ page } = {}) => getTVShows("/trending/tv/week", page);