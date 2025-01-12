import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, MapPin, Bold, Italic, List, Heading, Link as LinkIcon, Image, ListOrdered, UnderlineIcon } from 'lucide-react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Festival } from '../../types/festival';
import LocationSearch from '../../components/Location/LocationSearch';
import ApiService from '../../services/api';

interface FestivalModalProps {
  festival?: Festival | null;
  onClose: (shouldRefresh?: boolean) => void;
}

interface StyleButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  tooltip: string;
}

const StyleButton: React.FC<StyleButtonProps> = ({ icon, onClick, active, tooltip }) => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`p-2 hover:bg-gray-100 rounded \${active ? 'bg-gray-200' : ''}`}
    title={tooltip}
  >
    {icon}
  </button>
);

const FestivalEdit: React.FC<FestivalModalProps> = ({ festival, onClose }) => {
  const { t } = useTranslation();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  
  const [formData, setFormData] = useState<Omit<Festival, 'description'>>({
    id: festival?.id || '',
    name: festival?.name || '',
    location: festival?.location || '',
    coordinates: festival?.coordinates || { lat: 0, lng: 0 },
    url: festival?.url || '',
    from_date: festival?.from_date || new Date(),
    to_date: festival?.to_date || new Date(),
    holiday: festival?.holiday || '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle keyboard commands
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Style controls
  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Handle other input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Get plain text content for now
      const contentState = editorState.getCurrentContent();
      const description = contentState.getPlainText();

      const submitData = {
        ...formData,
        description
      };

      if (formData.id) {
        await ApiService.updateFestival(formData.id, submitData);
      } else {
        await ApiService.createFestival(submitData);
      }
      onClose(true);
    } catch (error) {
      console.error('Submission error:', error);
      setError(t('admin.submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentInlineStyle = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

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
              placeholder={t('admin.form.namePlaceholder')}
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


          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="from_date" className="block text-sm font-medium text-gray-700">
                {t('admin.form.fromDate')}
              </label>
              <input
                type="date"
                id="from_date"
                name="from_date"
                value={formData.from_date.toString().split('T')[0]}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="to_date" className="block text-sm font-medium text-gray-700">
                {t('admin.form.toDate')}
              </label>
              <input
                type="date"
                id="to_date"
                name="to_date"
                value={formData.to_date.toString().split('T')[0]}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Holiday */}
          {/* 
          <div>
            <label htmlFor="holiday" className="block text-sm font-medium text-gray-700">
              {t('admin.form.holiday')}
            </label>
            <input
              type="text"
              id="holiday"
              name="holiday"
              value={formData.holiday}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder={t('admin.form.holidayPlaceholder')}
            />
          </div>
          */}

          {/* Description with Draft.js Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('admin.form.description')}
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-1 border rounded-md bg-gray-50 p-1">
                <StyleButton
                  icon={<Bold className="h-4 w-4" />}
                  onClick={() => toggleInlineStyle('BOLD')}
                  active={currentInlineStyle.has('BOLD')}
                  tooltip={t('editor.bold')}
                />
                <StyleButton
                  icon={<Italic className="h-4 w-4" />}
                  onClick={() => toggleInlineStyle('ITALIC')}
                  active={currentInlineStyle.has('ITALIC')}
                  tooltip={t('editor.italic')}
                />
                <StyleButton
                  icon={<UnderlineIcon className="h-4 w-4" />}
                  onClick={() => toggleInlineStyle('UNDERLINE')}
                  active={currentInlineStyle.has('UNDERLINE')}
                  tooltip={t('editor.underline')}
                />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <StyleButton
                  icon={<Heading className="h-4 w-4" />}
                  onClick={() => toggleBlockType('header-one')}
                  active={blockType === 'header-one'}
                  tooltip={t('editor.heading')}
                />
                <StyleButton
                  icon={<List className="h-4 w-4" />}
                  onClick={() => toggleBlockType('unordered-list-item')}
                  active={blockType === 'unordered-list-item'}
                  tooltip={t('editor.bulletList')}
                />
                <StyleButton
                  icon={<ListOrdered className="h-4 w-4" />}
                  onClick={() => toggleBlockType('ordered-list-item')}
                  active={blockType === 'ordered-list-item'}
                  tooltip={t('editor.numberedList')}
                />
              </div>
              <div className="border rounded-md p-2 min-h-[200px] bg-white">
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  handleKeyCommand={handleKeyCommand}
                  placeholder={t('admin.form.descriptionPlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              {t('admin.form.url')}
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder={t('admin.form.urlPlaceholder')}
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
