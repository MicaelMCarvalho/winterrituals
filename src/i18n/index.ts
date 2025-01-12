import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { es } from './locales/es';
import { pt } from './locales/pt';

export type TranslationKeys = typeof en;

const getBrowserLanguage = () => {
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage) return storedLanguage;

  const browserLang = navigator.language.split('-')[0];

  const supportedLanguages = ['en', 'es', 'pt'];
  return supportedLanguages.includes(browserLang) ? browserLang : 'pt';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt }
    },
    lng: getBrowserLanguage(),
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

