
import React from 'react';
import MovieCard from './movie_card';

const MoviesGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <div key={movie.id} className="flex justify-center">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MoviesGrid;