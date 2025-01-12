import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import companyLogo from '../../assets/images/logos/logo_mirazal.png';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white">
              {t('footer.about.title')}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.about.description')}
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              {t('footer.quickLinks.title')}
            </h2>
            <ul className="space-y-3">
              <li>
                <a href="/map" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  {t('footer.quickLinks.map')}
                </a>
              </li>
              <li>
                <a href="/upcomingevents" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  {t('footer.quickLinks.events')}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  {t('footer.quickLinks.about')}
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              {t('footer.contact.title')}
            </h2>
            <div className="space-y-3">
              <a 
                href="mailto:contacto@iberianrituals.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                {t('footer.contact.email')}
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-gray-400">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <span>{t('footer.developedBy')}</span>
              <a
                href="mailto:mirazallda@gmail.com"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={companyLogo}
                  alt="Company Logo"
                  className="h-14 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
