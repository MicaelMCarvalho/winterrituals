import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Globe, Zap } from 'lucide-react';
import { Festival } from '../../types/festival';
import { useTranslation } from 'react-i18next';
import ApiService from '../../services/api';

const UpcomingFestivals = () => {
  const { t } = useTranslation();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
  try {
    const data = await ApiService.fetchFestivals();
    const sortedFestivals = data.sort((a: Festival, b: Festival) => {
      const dateA = new Date(a.from_date);
      const dateB = new Date(b.from_date);
      return dateA.getTime() - dateB.getTime();
    });

    const currentDate = new Date();
    const upcomingFestivals = sortedFestivals.filter((festival: Festival) => {
      if (festival.from_date && festival.to_date) {
        const endDate = new Date(festival.to_date);
        return endDate >= currentDate;
      }
    });

    setFestivals(upcomingFestivals);
    setError(null);
  } catch (error) {
    setError(t('festivals.errors.loadError'));
    console.error('Error fetching festivals:', error);
  } finally {
    setIsLoading(false);
  }
};


  const formatDateRange = (festival: Festival) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    if (festival.from_date && festival.to_date) {
      const fromDate = new Date(festival.from_date);
      const toDate = new Date(festival.to_date);
      return t('festivals.dateRange', {
        fromDate: fromDate.toLocaleDateString(undefined, dateOptions),
        toDate: toDate.toLocaleDateString(undefined, dateOptions)
      });
    }
  };

  const isHappeningNow = (festival: Festival) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (festival.from_date && festival.to_date) {
      const startDate = new Date(festival.from_date);
      const endDate = new Date(festival.to_date);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      return currentDate >= startDate && currentDate <= endDate;
    }
  };

  const getRelativeDateString = (festival: Festival) => {
    if (isHappeningNow(festival)) {
      return null;
    }

    const startDate = new Date(festival.from_date);
    const now = new Date();
    const diffTime = startDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t('festivals.relative.today');
    if (diffDays === 1) return t('festivals.relative.tomorrow');
    if (diffDays < 7) return t('festivals.relative.days', { count: diffDays });
    if (diffDays < 30) return t('festivals.relative.weeks', { count: Math.floor(diffDays / 7) });
    if (diffDays < 365) return t('festivals.relative.months', { count: Math.floor(diffDays / 30) });
    return t('festivals.relative.years', { count: Math.floor(diffDays / 365) });
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('festivals.title')}</h1>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">{t('festivals.loading')}</p>
        </div>
      ) : festivals.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">{t('festivals.noUpcoming')}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {festivals.map((festival) => {
            const happening = isHappeningNow(festival);
            const relativeDate = getRelativeDateString(festival);
            
            return (
              <div 
                key={festival.id}
                className={`bg-white rounded-lg shadow-sm border ${happening ? 'border-green-500' : 'border-gray-200'} p-6 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{festival.name}</h2>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{festival.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDateRange(festival)}</span>
                      </div>
                      {festival.url && festival.url !== "" && (
                        <div className="flex items-center text-blue-600 hover:text-blue-800">
                          <Globe className="h-4 w-4 mr-2" />
                          <a 
                            href={festival.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {t('festivals.visitWebsite')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {happening ? (
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        <Zap className="h-3 w-3 mr-1" />
                        {t('festivals.happeningNow')}
                      </span>
                    ) : relativeDate && (
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {relativeDate}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  {festival.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingFestivals;
