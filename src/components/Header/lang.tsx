import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const getCurrentLanguage = () => {
    return i18n.language?.split('-')[0] || 'pt';
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['pt', 'es', 'en'].includes(savedLanguage)) {
      changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="language-switcher flex space-x-2">
      <button
        onClick={() => changeLanguage('pt')}
        className={`
          px-3 py-1 rounded
          ${getCurrentLanguage() === 'pt' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
        `}
      >
        Português
      </button>

      <button
        onClick={() => changeLanguage('es')}
        className={`
          px-3 py-1 rounded
          ${getCurrentLanguage() === 'es' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
        `}
      >
        Español
      </button>

      <button
        onClick={() => changeLanguage('en')}
        className={`
          px-3 py-1 rounded
          ${getCurrentLanguage() === 'en' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
        `}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
