

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../components/movieDetailsCard";
import { getMovieDetails } from "../services/movies.api";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this movie right now.");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-lg text-slate-300">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 text-center text-lg text-red-300">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-lg text-slate-300">
        Movie not found.
      </div>
    );
  }

  return (
    <MovieDetailsCard
      movie={movie}
      similarMovies={movie.similar || []}
      recommendations={movie.recommendations || []}
    />
  );
};

export default MovieDetails;