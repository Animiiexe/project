import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Film, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  // Perform the actual search navigation
  const performSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search/${encodeURIComponent(query)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
      // Return focus to document body after navigation
      setTimeout(() => document.body.focus(), 0);
    }
  };

  // Add keyboard shortcut (Ctrl+K or Cmd+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Film size={24} />
            <span>MY MOVIE LIST</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300">Popular</Link>
            <Link to="/top-rated" className="hover:text-gray-300">Top Rated</Link>
            <Link to="/upcoming" className="hover:text-gray-300">Upcoming</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <form 
            onSubmit={handleSearch}
            className={`hidden md:block relative transition-all duration-200 ${isSearchFocused ? 'w-72' : 'w-56'}`}
          >
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search movies..."
                className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search size={20} className="text-gray-400 hover:text-white" />
              </button>
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden sm:block">
                <kbd className="bg-gray-700 text-xs px-2 py-1 rounded-md text-gray-300">
                  {navigator.userAgent.includes('Mac') ? '⌘K' : 'Ctrl+K'}
                </kbd>
              </div>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 mt-4 py-4 px-6 rounded-lg">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Popular
            </Link>
            <Link 
              to="/top-rated" 
              className="hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Top Rated
            </Link>
            <Link 
              to="/upcoming" 
              className="hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upcoming
            </Link>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-gray-700 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      performSearch();
                    }
                  }}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label="Search"
                >
                  <Search size={20} className="text-gray-400 hover:text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;