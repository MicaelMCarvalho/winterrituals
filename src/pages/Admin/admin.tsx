import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import FestivalEdit from '../../components/Festival/FestivalEdit';
import { Festival } from '../../types/festival';
import ApiService from '../../services/api';
import withAuth from '../../components/Auth/withAuth';
import { useTranslation } from 'react-i18next';

const AdminPage = () => {
  const { t, i18n } = useTranslation();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      const data = await ApiService.fetchFestivals();
      setFestivals(data);
      setFilteredFestivals(data);
      setError(null);
    } catch (error) {
      setError(t('admin.festivals.loadError'));
      console.error('Error fetching festivals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = festivals.filter(festival => {
      const searchString = searchTerm.toLowerCase();
      const searchableFields = {
        name: festival.name,
        location: festival.location,
        description: festival.description,
        fromDate: festival.from_date,
        toDate: festival.to_date
      };

      return Object.values(searchableFields).some(value => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchString);
      });
    });

    setFilteredFestivals(filtered);
  }, [searchTerm, festivals]);

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.festivals.deleteConfirm'))) {
      return;
    }

    try {
      await ApiService.deleteFestival(id);
      await fetchFestivals();
    } catch (error) {
      console.error('Error deleting festival:', error);
      alert(t('admin.festivals.deleteError'));
    }
  };

  const handleEdit = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsModalOpen(true);
  };

  const handleCloseModal = (shouldRefresh?: boolean) => {
    setIsModalOpen(false);
    setSelectedFestival(null);
    if (shouldRefresh) {
      fetchFestivals();
    }
  };

  const handleAddNew = () => {
    setSelectedFestival(null);
    setIsModalOpen(true);
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('admin.festivals.title')}</h2>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {t('admin.festivals.addButton')}
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('admin.festivals.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-4 text-gray-500">
              {t('admin.festivals.loading')}
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                    {t('admin.festivals.table.headers.name')}
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                    {t('admin.festivals.table.headers.location')}
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                    {t('admin.festivals.table.headers.date')}
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                    {t('admin.festivals.table.headers.description')}
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 border-b">
                    {t('admin.festivals.table.headers.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredFestivals.map((festival) => (
                  <tr
                    key={festival.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-sm">{festival.name}</td>
                    <td className="p-3 text-sm">{festival.location}</td>
                    <td className="p-3 text-sm">
                      {new Date(festival.from_date).toLocaleDateString(i18n.language)} - {new Date(festival.to_date).toLocaleDateString(i18n.language)}
                    </td>
                    <td className="p-3 text-sm">
                      <div className="max-w-xs truncate" title={festival.description}>
                        {festival.description}
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(festival)}
                          className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-colors"
                          title={t('admin.festivals.table.actions.editTooltip')}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(festival.id)}
                          className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-colors"
                          title={t('admin.festivals.table.actions.deleteTooltip')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isLoading && filteredFestivals.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              {t('admin.festivals.noResults')}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <FestivalEdit
          festival={selectedFestival}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default withAuth(AdminPage);
