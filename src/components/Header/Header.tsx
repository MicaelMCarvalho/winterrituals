import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Search, Heart, User, ShoppingCart } from 'lucide-react';
import { Language } from '../../types';

interface HeaderProps {
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { name: t('header.nav.interactiveMap'), href: '/map' },
    { name: t('header.nav.list'), href: '#' },
    { name: t('header.nav.localTraditions'), href: '#' },
    { name: t('header.nav.about'), href: '#' },
  ];

  const languages: Language[] = ['en', 'es', 'pt'];

  return (
    <>
      {/* Main header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper header section */}
          <div className="flex items-center justify-between py-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">
                {t('header.title')}
              </h1>
            </div>

            {/* Search bar */}
            {/* 
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('header.search.placeholder')}
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-gray-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            */}

            {/* Right side icons */}
            {/*<div className="flex items-center gap-4">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label={t('header.search.label')}
              >
                <Search className="h-6 w-6 md:hidden" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label={t('header.favorites.label')}
              >
                <Heart className="h-6 w-6" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label={t('header.account.label')}
              >
                <User className="h-6 w-6" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 relative"
                aria-label={t('header.cart.label')}
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                  0
                </span>
              </button>
            </div>*/}
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
                aria-label={t('header.language.select', { language: lang.toUpperCase() })}
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
              aria-expanded={isMenuOpen}
              aria-label={t('header.menu.toggle')}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="ml-2">{t('header.menu.label')}</span>
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
                    aria-label={t('header.language.select', { language: lang.toUpperCase() })}
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
