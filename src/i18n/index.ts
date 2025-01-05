import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
// import { es } from './locales/es';
// import { pt } from './locales/pt';

export type TranslationKeys = typeof en;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      // es: { translation: es },
      // pt: { translation: pt }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
