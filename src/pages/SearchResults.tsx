import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams<{ query: string }>(); // Get search query from URL
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=YOUR_API_KEY`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setLoading(false);
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]); // Re-fetch when query changes

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-white mb-4">Search Results for "{query}"</h2>
      
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-lg font-semibold text-white mt-2">{movie.title}</h3>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
