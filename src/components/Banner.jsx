import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../store/features/favoritesSlice";

const Banner = ({ movies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);
  const slides = movies.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  if (!slides.length) return null;

  const currentMovie = slides[activeIndex];
  const movieTitle = currentMovie.title || currentMovie.name;
  const rating = currentMovie.vote_average.toFixed(1);
  const releaseYear = currentMovie.release_date.split("-")[0];
  const overview =
    currentMovie.overview.length > 180
      ? `${currentMovie.overview.slice(0, 180)}...`
      : currentMovie.overview;
  const isFavorite = favorites.some((movie) => movie.id === currentMovie.id);

  const goToSlide = (direction) => {
    setActiveIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % slides.length;
      }

      return (prev - 1 + slides.length) % slides.length;
    });
  };

  const goToMovieDetails = () => {
    navigate(`/movie/${currentMovie.id}`);
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(currentMovie));
    alert(`${movieTitle} ${isFavorite ? "removed from" : "added to"} favorites`);
  };

  return (
    <section className="relative mb-10 overflow-hidden rounded-b-[2rem] border-b border-sky-400/80 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
      <div className="relative h-[430px] overflow-hidden sm:h-[500px] lg:h-[650px]">
        {slides.map((movie, index) => {
          const slideTitle = movie.title || movie.name || "Untitled";

          return (
            <div
              key={movie.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                pointerEvents: index === activeIndex ? "auto" : "none",
              }}
            >
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : "https://placehold.co/1600x900/111827/ffffff?text=Movie+Banner"
                }
                alt={slideTitle}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_25%),linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_28%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.7)_100%)]" />
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goToSlide("prev")}
          className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-xl text-white shadow-lg shadow-black/30 backdrop-blur-sm transition hover:scale-105 hover:bg-black/60"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goToSlide("next")}
          className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-xl text-white shadow-lg shadow-black/30 backdrop-blur-sm transition hover:scale-105 hover:bg-black/60"
        >
          ›
        </button>

        <div className="relative z-10 flex h-full items-end px-4 pb-8 pt-16 sm:px-8 lg:px-12">
          <div className="w-full max-w-xl">
            <div className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-white/80">
              <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-2 py-1">
                Featured
              </span>
              <span className="text-sky-300">{releaseYear}</span>
            </div>

            <h1 className="text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl lg:text-8xl lg:leading-[0.9]">
              <span className="block bg-gradient-to-r from-[#f5f5f5] via-[#f4c2c2] to-[#ffb347] bg-clip-text text-transparent">
                {movieTitle}
              </span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-medium">
                ⭐ {rating}
              </span>
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-medium">
                {releaseYear}
              </span>
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-medium">
                Trending
              </span>
            </div>

            <p className="mt-5 max-w-lg text-sm leading-6 text-white/80 sm:text-base">{overview}</p>

            <div className="mt-7 flex items-center gap-4">
              <button
                type="button"
                onClick={goToMovieDetails}
                className="flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-slate-200"
              >
                ▶ Watch Now
              </button>
              <button
                type="button"
                onClick={handleFavoriteClick}
                className="rounded-xl border border-white/25 bg-black/25 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/40"
                aria-label="Add to favorites"
              >
                {isFavorite ? "♥ In favorites" : "♡ Add to favorites"}
              </button>
            </div>
          </div>

          <div className="ml-auto hidden items-end lg:flex">
            <div className="rounded-full border border-yellow-400/60 bg-yellow-400/10 px-6 py-5 text-center shadow-[0_0_30px_rgba(234,179,8,0.15)] backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-yellow-200/80">
                Rating
              </div>
              <div className="mt-2 text-4xl font-black text-yellow-300">{rating}</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((movie, index) => (
            <button
              key={movie.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-10 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
