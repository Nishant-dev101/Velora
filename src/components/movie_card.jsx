import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/features/favoritesSlice";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const title = movie?.title ?? "Untitled";
  const releaseDate = movie?.release_date ?? "Release date unavailable";

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);

  const isFavorites = favorites.some((fav) => fav.id === movie.id);

  const handleOpenDetails = () => {
    if (movie?.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  const onFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
    alert(`${title} ${isFavorites ? "removed from" : "added to"} favorites`);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpenDetails}
      className="group flex h-full w-full max-w-[220px] cursor-pointer flex-col overflow-hidden rounded-xl border border-white/5 bg-[#1f1f1f] shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-1 hover:border-white/10 hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-rose-500"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#242424]">
        <img
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750/1f1f1f/ffffff?text=No+Image"
          }
          alt={title}
        />

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            aria-label={`Add ${title} to favorites`}
            className= {`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-rose-500`}
            onClick={onFavoriteClick}
          >
            {isFavorites ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-white">
          {title}
        </h3>
        <p className="text-xs text-white/50">{releaseDate}</p>
      </div>
    </article>
  );
};

export default MovieCard;
