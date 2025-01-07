import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('about.title')}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
        <p className="text-gray-700 mb-4">
          {t('about.mission.description')}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.masquerades.title')}</h2>
        <p className="text-gray-700 mb-4">
          {t('about.masquerades.description')}
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              {t('about.masquerades.elements.title')}
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('about.masquerades.elements.list.masks')}</li>
              <li>• {t('about.masquerades.elements.list.costumes')}</li>
              <li>• {t('about.masquerades.elements.list.dances')}</li>
              <li>• {t('about.masquerades.elements.list.community')}</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              {t('about.masquerades.regions.title')}
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('about.masquerades.regions.list.trasosmontes')}</li>
              <li>• {t('about.masquerades.regions.list.zamora')}</li>
              <li>• {t('about.masquerades.regions.list.cantabria')}</li>
              <li>• {t('about.masquerades.regions.list.others')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
