import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, MapPin } from 'lucide-react';
import { Festival } from '../../types/festival';
import LocationSearch from '../../components/Location/LocationSearch';
import ApiService from '../../services/api';

interface FestivalModalProps {
  festival?: Festival | null;
  onClose: (shouldRefresh?: boolean) => void;
}

const FestivalEdit: React.FC<FestivalModalProps> = ({ festival, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Festival>({
    id: festival?.id || '',
    name: festival?.name || '',
    location: festival?.location || '',
    description: festival?.description || '',
    coordinates: festival?.coordinates || { lat: 0, lng: 0 },
    url: festival?.url || '',
    from_date: festival?.from_date || new Date(),
    to_date: festival?.to_date || new Date(),
    holiday: festival?.holiday || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('coordinates.')) {
      const coordinateKey = name.split('.')[1] as 'lat' | 'lng';
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [coordinateKey]: Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    if (formData.id) {
      await ApiService.updateFestival(formData.id, formData);
    } else {
      await ApiService.createFestival(formData);
    }
    onClose(true);
  } catch (error) {
    console.error('Submission error:', error);
    setError(t('admin.submitFailed'));
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {festival ? t('admin.editFestival') : t('admin.addFestival')}
          </h2>
          <button
            onClick={() => onClose()}
            className="text-gray-600 hover:text-gray-900"
            aria-label={t('admin.close')}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}

          {/* Festival Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t('admin.form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              {t('admin.form.location')}
            </label>
            <div className="relative">
              <LocationSearch
                onLocationSelect={(location, coordinates) => {
                  setFormData(prev => ({
                    ...prev,
                    location,
                    coordinates
                  }));
                }}
              />
              <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              {t('admin.form.fromDate')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.from_date.toString().split('T')[0]}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              {t('admin.form.toDate')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.to_date.toString().split('T')[0]}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              {t('admin.form.description')}
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              {t('admin.form.url')}
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              {t('admin.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting
                ? t('admin.submitting')
                : (festival ? t('admin.update') : t('admin.create'))
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FestivalEdit;
