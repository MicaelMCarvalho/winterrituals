import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, DivIcon } from 'leaflet';
import MapPopup from '@/components/Map/MapPopup';
import { getFestivals } from '@/services/festivalService';
import { Festival } from '@/types/festival';
import 'leaflet/dist/leaflet.css';

const InteractiveMap: React.FC = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadFestivals = async (): Promise<void> => {
      try {
        const data = await getFestivals();
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

  const dotIcon: DivIcon = divIcon({
    className: 'custom-dot',
    html: '',
    iconSize: [10, 10],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search festivals by name or location..."
        className="p-2 border rounded-md w-full max-w-md"
      />
      <div className="h-[600px]">
        <MapContainer 
          center={[40.4168, -3.7038]}
          zoom={6} 
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredFestivals.map((festival) => (
            <Marker 
              key={festival.id} 
              position={[festival.coordinates.lat, festival.coordinates.lng]}
              icon={dotIcon}
            >
              <Popup>
                <MapPopup festival={festival} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
