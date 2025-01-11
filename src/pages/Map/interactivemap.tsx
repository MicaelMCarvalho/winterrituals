import React, { useState, useEffect } from 'react';
import Map from '../../components/Map/Map';
import List from '../../components/Map/List';
import ApiService from '../../services/api';
import { Festival } from '../../types/festival';

const InteractiveMap: React.FC = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  useEffect(() => {
    const loadFestivals = async (): Promise<void> => {
      try {
        const data = await ApiService.fetchFestivals();
        setFestivals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    loadFestivals();
  }, []);

  const filteredFestivals = festivals.filter((festival) =>
    festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    festival.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFestivalSelect = (festival: Festival) => {
    setSelectedFestival(prev => prev?.id === festival.id ? null : festival);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search festivals by name or location..."
        className="p-2 border rounded-md w-full mb-4"
      />
      <div className="flex flex-col flex-grow lg:flex-row gap-4">
        <div className="h-[50vh] lg:h-[70vh] w-full lg:flex-1">
          <Map
            festivals={filteredFestivals}
            selectedFestival={selectedFestival}
            onFestivalSelect={handleFestivalSelect}
          />
        </div>
        <div className="h-[40vh] lg:h-[70vh] lg:w-80 flex-shrink-0">
          <List
            festivals={filteredFestivals}
            selectedFestival={selectedFestival}
            onFestivalSelect={handleFestivalSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;

