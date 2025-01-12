import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  // Helper function to render text with line breaks
  const renderWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('about.title')}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.why.title')}</h2>
        <p className="text-gray-700 mb-4">
          {renderWithLineBreaks(t('about.why.description'))}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
        <p className="text-gray-700 mb-4">
          {renderWithLineBreaks(t('about.mission.description'))}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.contribute.title')}</h2>
        <p className="text-gray-700 mb-4">
          {renderWithLineBreaks(t('about.contribute.description'))}
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {(t('about.contribute.methods', { returnObjects: true }) as any[]).map((method, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
              <p className="text-gray-700">{renderWithLineBreaks(method.description)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.feedback.title')}</h2>
        <p className="text-gray-700 mb-4">
          {renderWithLineBreaks(t('about.feedback.description'))}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.support.title')}</h2>
        <p className="text-gray-700 mb-4">
          {renderWithLineBreaks(t('about.support.description'))}
        </p>
      </section>
    </div>
  );
};

export default About;
