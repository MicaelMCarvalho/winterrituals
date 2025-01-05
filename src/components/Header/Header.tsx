import React, { useState } from 'react';
import { Menu, X, Search, Heart, User, ShoppingCart } from 'lucide-react';
import { Language } from '../../types';

interface HeaderProps {
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const mainNavLinks = [
    { name: 'Interactive Map', href: '#' },
    { name: 'Cultural Stories', href: '#' },
    { name: 'Local Traditions', href: '#' },
    { name: 'About', href: '#' },
  ];
  
  const languages: Language[] = ['en'];

  return (
    <>
      {/* Top bar */}
      <div className="w-full bg-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">TikTok</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">YouTube</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Instagram</a>
          </div>
          <p className="text-sm text-gray-600">20+ Years of Cultural Heritage</p>
        </div>
      </div>

      {/* Main header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper header section */}
          <div className="flex items-center justify-between py-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">
                Iberian Winter Rituals
              </h1>
            </div>

            {/* Search bar */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search traditions..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-gray-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Search className="h-6 w-6 md:hidden" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">0</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center justify-center py-4 border-t">
            {mainNavLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 font-medium ml-4"
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden py-4 border-t">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="ml-2">Menu</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {mainNavLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  {link.name}
                </a>
              ))}
              <div className="px-3 py-2">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className="mr-4 text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
