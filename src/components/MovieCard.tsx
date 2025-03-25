import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 group-hover:scale-105">
        <div className="relative aspect-[2/3]">
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400" size={16} />
              <span className="text-white">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm">{new Date(movie.release_date).getFullYear()}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;