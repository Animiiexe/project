import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Film } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Film size={24} />
            <span>MovieDB</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300">Popular</Link>
            <Link to="/top-rated" className="hover:text-gray-300">Top Rated</Link>
            <Link to="/upcoming" className="hover:text-gray-300">Upcoming</Link>
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-400" />
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;