import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, MapPin } from 'lucide-react';
import { Festival } from '@/types/festival';

interface FestivalModalProps {
  festival?: Festival | null;
  onClose: (shouldRefresh?: boolean) => void;
}

const FestivalModal: React.FC<FestivalModalProps> = ({ festival, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Festival>({
    id: festival?.id || '',
    name: festival?.name || '',
    location: festival?.location || '',
    date: festival?.date || '',
    description: festival?.description || '',
    coordinates: festival?.coordinates || { lat: 0, lng: 0 },
    url: festival?.url || '',
    from_date: festival?.from_date || new Date(),
    to_date: festival?.to_date || new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for coordinates
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

  // Submit form (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = formData.id 
        ? `http://localhost:3001/api/festivals/${formData.id}` 
        : 'http://localhost:3001/api/festivals';
      
      const method = formData.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          date: formData.date,
          description: formData.description,
          coordinates: formData.coordinates,
          url: formData.url,
          from_date: formData.from_date,
          to_date: formData.to_date,
        }),
      });

      if (response.ok) {
        onClose(true); // Close modal and refresh list
      } else {
        const errorData = await response.json();
        setError(errorData.message || t('admin.submitFailed'));
      }
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
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
              />
              <MapPin className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              {t('admin.form.date')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
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

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="coordinates.lat" className="block text-sm font-medium text-gray-700">
                {t('admin.form.latitude')}
              </label>
              <input
                type="number"
                id="coordinates.lat"
                name="coordinates.lat"
                step="0.000001"
                value={formData.coordinates.lat}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="coordinates.lng" className="block text-sm font-medium text-gray-700">
                {t('admin.form.longitude')}
              </label>
              <input
                type="number"
                id="coordinates.lng"
                name="coordinates.lng"
                step="0.000001"
                value={formData.coordinates.lng}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
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

export default FestivalModal;
