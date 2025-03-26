import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Calendar, Film } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=credits`
        );
        
        if (!res.ok) {
          throw new Error('Movie not found');
        }

        const data = await res.json();
        setMovie(data);
        setCast(data.credits?.cast.slice(0, 8) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-white text-center">Loading movie details...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-white text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 px-4 py-2 rounded-md"
        >
          Go Home
        </button>
      </div>
    </div>
  );

  if (!movie) return null;

  const releaseYear = new Date(movie.release_date).getFullYear();
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/placeholder-backdrop.jpg';

  return (
    <div className="text-white p-4 md:p-6 bg-gray-800 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mb-4 transition-colors"
      >
        ← Back
      </button>

      {/* Movie Banner */}
      <div
        className="relative w-full h-[30vh] md:h-[50vh] bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end">
          <div className="container mx-auto px-6 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title} <span className="text-gray-400">({releaseYear})</span></h1>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={18} />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              
              {movie.runtime && (
                <div className="flex items-center space-x-1">
                  <Clock size={18} />
                  <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Calendar size={18} />
                <span>{movie.release_date}</span>
              </div>
              
              {movie.genres?.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Film size={18} />
                  <span>{movie.genres.map(g => g.name).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Poster and Info */}
        <div className="lg:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-poster.jpg';
            }}
          />
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          {/* Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview || 'No overview available.'}</p>
          </div>

          {/* Cast Members */}
          {cast.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {cast.map((actor) => (
                  <a href={`https://www.themoviedb.org/person/${actor.id}`} target="_blank" rel="noreferrer"> 
                  <div key={actor.id} className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-40 object-cover rounded-md mb-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-actor.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-600 rounded-md mb-2 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <p className="font-medium">{actor.name}</p>
                    <p className="text-sm text-gray-400">{actor.character}</p>
                  </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;