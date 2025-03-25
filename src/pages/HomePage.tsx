import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';
import { Loader } from 'lucide-react';

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getPopularMovies(page);
        setMovies(prev => [...prev, ...response.data.results]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-800 pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Popular Movies</h1>
        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-white" size={48} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Load More
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;