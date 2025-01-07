import React from 'react';
import { useTranslation } from 'react-i18next';

// Define the supported languages
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' }
];

// Language Switcher Component
export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="language-switcher flex space-x-2">
      {LANGUAGES.map((language) => (
        <button
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          className={`
            px-3 py-1 rounded 
            ${i18n.language === language.code 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
          `}
        >
          {language.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
