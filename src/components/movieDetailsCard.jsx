import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieRow from "./moviesRow";
import { toggleFavorite } from "../store/features/favoritesSlice";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

const formatRuntime = (minutes) => {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return hours ? `${hours}h ${mins}m` : `${mins}m`;
};

const formatCurrency = (value) => {
  if (typeof value !== "number") return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const getPlatformList = (providers = {}) => {
  const available = Object.values(providers).flatMap((region) => [
    ...(region.flatrate || []),
    ...(region.rent || []),
    ...(region.buy || []),
  ]);

  return available.filter(
    (provider, index, list) =>
      list.findIndex((item) => item.provider_id === provider.provider_id) ===
      index,
  );
};

const MovieDetailsCard = ({
  movie,
  similarMovies = [],
  recommendations = [],
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  const trailer =
    movie.videos.results.find(
      (video) =>
        video.site === "YouTube" && ["Trailer", "Teaser"].includes(video.type),
    ) ||
    movie.videos.results.find((video) => video.site === "YouTube") ||
    null;

  const cast = movie.credits.cast.slice(0, 8);
  const crew = movie.credits.crew
    .filter((person) => ["Director", "Writer", "Producer"].includes(person.job))
    .slice(0, 6);
  const reviews = movie.reviews.slice(0, 3);
  const images = movie.images.backdrops.slice(0, 6);
  const providerList = useMemo(
    () => getPlatformList(movie.providers),
    [movie.providers],
  );

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
      ? new Date(movie.first_air_date).getFullYear()
      : "N/A";

  const movieTitle = movie.title || movie.name;
  const rating = movie.vote_average.toFixed(1);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(movie));
    alert(`${movieTitle} ${isFavorite ? "removed from" : "added to"} favorites`);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          {movie.backdrop_path && (
            <img
              src={`${BASE_IMAGE_URL}${movie.backdrop_path}`}
              alt={movieTitle}
              className="h-full w-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,15,0.96),rgba(11,11,15,0.8),rgba(11,11,15,0.7))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/500x750/1f1f1f/ffffff?text=No+Image"
              }
              alt={movieTitle}
              className="h-[480px] w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/40"
            />

            <div className="space-y-6 self-center">
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
                  {releaseYear}
                </span>
                <span>{movie.status}</span>
                <span>•</span>
                <span>{formatRuntime(movie.runtime)}</span>
                <span>•</span>
                <span>{rating} / 10</span>
                <span>•</span>
                <span>{movie.vote_count} votes</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {movieTitle}
                  </h1>
                  {movie.tagline && (
                    <p className="mt-3 text-lg italic text-[#f4d35e]">
                      “{movie.tagline}”
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-2xl text-white transition hover:bg-black/50"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-rose-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="max-w-3xl text-base leading-7 text-slate-200">
                {movie.overview}
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Rating
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">{rating}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Runtime
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {formatRuntime(movie.runtime)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Release
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {movie.release_date || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-8">
            {trailer && (
              <div className="rounded-3xl border border-white/10 bg-[#121318] p-4 sm:p-5">
                <h2 className="mb-4 text-2xl font-bold text-white">Trailer</h2>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    className="aspect-video w-full"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name || movieTitle || "Movie trailer"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {cast.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#121318] p-4 sm:p-5">
                <h2 className="mb-5 text-2xl font-bold text-white">Cast</h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {cast.map((person) => (
                    <div
                      key={`${person.id}-${person.credit_id}`}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <img
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : "https://placehold.co/185x278/242424/ffffff?text=No+Photo"
                        }
                        alt={person.name}
                        className="mb-3 h-44 w-full rounded-xl object-cover"
                      />
                      <h3 className="font-semibold text-white">
                        {person.name}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {person.character || "Unknown role"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {crew.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#121318] p-4 sm:p-5">
                <h2 className="mb-5 text-2xl font-bold text-white">Crew</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {crew.map((person) => (
                    <div
                      key={`${person.id}-${person.credit_id}`}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <p className="font-semibold text-white">{person.name}</p>
                      <p className="text-sm text-slate-300">{person.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reviews.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#121318] p-4 sm:p-5">
                <h2 className="mb-5 text-2xl font-bold text-white">Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-white">
                          {review.author}
                        </h3>
                        <span className="rounded-full bg-amber-500/15 px-2 py-1 text-xs font-medium text-amber-200">
                          {review.author_details?.rating ?? "User review"}
                        </span>
                      </div>
                      <p className="line-clamp-[12] text-sm leading-7 text-slate-300">
                        {review.content}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-[#121318] p-4 sm:p-5">
              <h2 className="mb-4 text-2xl font-bold text-white">Movie info</h2>
              <dl className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/70">Original title</dt>
                  <dd>{movie.original_title || movie.original_name}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/70">Language</dt>
                  <dd>{movie.original_language.toUpperCase()}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/70">Budget</dt>
                  <dd>{formatCurrency(movie.budget)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/70">Revenue</dt>
                  <dd>{formatCurrency(movie.revenue)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/70">Popularity</dt>
                  <dd>{movie.popularity.toFixed(1)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-white/70">Status</dt>
                  <dd>{movie.status}</dd>
                </div>
              </dl>
            </div>

            {providerList.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#121318] p-4 sm:p-5">
                <h2 className="mb-4 text-2xl font-bold text-white">
                  Where to watch
                </h2>
                <div className="flex flex-wrap gap-3">
                  {providerList.map((provider) => (
                    <div
                      key={provider.provider_id}
                      className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5"
                      title={provider.provider_name}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#121318] p-4 sm:p-5">
                <h2 className="mb-4 text-2xl font-bold text-white">Images</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {images.map((image, index) => (
                    <img
                      key={`${image.file_path}-${index}`}
                      src={`${BASE_IMAGE_URL}${image.file_path}`}
                      alt="Movie still"
                      className="h-28 w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {similarMovies.length > 0 && (
          <div className="mt-10">
            <MovieRow movies={similarMovies} title="Similar movies" />
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-10">
            <MovieRow movies={recommendations} title="Recommended for you" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsCard;
