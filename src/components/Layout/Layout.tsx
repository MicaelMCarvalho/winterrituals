import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutProps, Language } from '../../types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onLanguageChange={handleLanguageChange} />
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
