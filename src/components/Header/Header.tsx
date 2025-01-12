import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, UserCircle } from 'lucide-react';
import { Language } from '../../types';

interface HeaderProps {
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { name: t('header.nav.interactiveMap'), href: '/map' },
    { name: t('header.nav.nextEvents'), href: '/upcomingevents' },
    { name: t('header.nav.about'), href: '/about' },
  ];

  // Define languages with their display names in the desired order
  const LANGUAGES = [
    { code: 'pt', display: 'PT' },
    { code: 'es', display: 'ES' },
    { code: 'en', display: 'EN' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <>
      {/* Main header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper header section */}
          <div className="flex items-center justify-between py-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">
                <a href="/" className="text-gray-900">
                  {t('header.title')}
                </a>
              </h1>
            </div>
            <div className="flex items-center">
              <a
                href="/admin"
                className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                title={t('header.admin')}
              >
                <UserCircle className="h-6 w-6" />
              </a>
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

            {/* Language Switcher */}
            <div className="ml-4 flex items-center">
              {LANGUAGES.map(({ code, display }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`px-3 py-1 text-sm font-medium ml-2 rounded transition-colors
                    ${i18n.language === code 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900'}`}
                  aria-label={t('header.language.select', { language: display })}
                >
                  {display}
                </button>
              ))}
            </div>
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
              <div className="px-3 py-2 flex items-center">
                {LANGUAGES.map(({ code, display }) => (
                  <button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={`mr-4 text-sm font-medium rounded px-3 py-1
                      ${i18n.language === code 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-gray-900'}`}
                    aria-label={t('header.language.select', { language: display })}
                  >
                    {display}
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
