import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
  address?: {
    village?: string;
    town?: string;
    city?: string;
    municipality?: string;
    county?: string;
    state?: string;
    country?: string;
  };
}

interface LocationSearchProps {
  onLocationSelect: (location: string, coordinates: { lat: number; lng: number }) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchLocation = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'LocationSearchApp'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to search locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatLocation = (address: LocationResult['address']) => {
    if (!address) return '';

    const specificLocation = address.village || address.town;
    const city = address.city || address.municipality;
    const country = address.country;

    const parts = [];
    if (specificLocation) parts.push(specificLocation);
    if (city && city !== specificLocation) parts.push(city);
    if (country) parts.push(country);

    return parts.join(', ');
  };

  const handleResultSelect = (result: LocationResult) => {
    if (!result.address) return;

    const locationString = formatLocation(result.address);

    onLocationSelect(
      locationString,
      {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon)
      }
    );

    setResults([]);
    setQuery(locationString);
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            placeholder="Search for a town or address..."
            className="w-full p-2 pr-8 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loading && (
            <div className="absolute right-2 top-2">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          )}
        </div>
        <button
          onClick={searchLocation}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultSelect(result)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{result.display_name}</p>
                  <p className="text-sm text-gray-600">
                    Coordinates: {result.lat}, {result.lon}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
