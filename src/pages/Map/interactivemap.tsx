import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from 'leaflet';
import MapPopup from '@/components/Map/MapPopup';

import 'leaflet/dist/leaflet.css';

interface Festival {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

function InteractiveMap() {
  const { t } = useTranslation();
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample festivals data across Iberian Peninsula
  const festivals: Festival[] = [
    {
      id: '1',
      name: 'Mascaradas de Bragança',
      location: 'Bragança, Portugal',
      date: 'December 25 - January 6',
      description: 'Ancient winter masquerade traditions with elaborate masks and costumes.',
      coordinates: { lat: 41.8061, lng: -6.7567 }
    },
    {
      id: '2',
      name: 'Festa dos Rapazes',
      location: 'Vinhais, Portugal',
      date: 'December 25-26',
      description: 'Traditional winter festival with masked characters and ritual dances.',
      coordinates: { lat: 41.8349, lng: -7.0026 }
    },
    {
      id: '3',
      name: 'Entrudo de Lazarim',
      location: 'Lamego, Portugal',
      date: 'Carnival period',
      description: 'Famous carnival celebration with wooden masks and satirical performances.',
      coordinates: { lat: 41.0970, lng: -7.8554 }
    },
    {
      id: '4',
      name: 'Zangarrón de Montamarta',
      location: 'Zamora, Spain',
      date: 'January 1 and 6',
      description: 'Traditional winter masquerade with demon-like character.',
      coordinates: { lat: 41.5827, lng: -5.9034 }
    },
    {
      id: '5',
      name: 'La Vijanera',
      location: 'Silió, Cantabria, Spain',
      date: 'First Sunday of January',
      description: 'Ancient winter festival with over 60 different character masks.',
      coordinates: { lat: 43.2167, lng: -4.0333 }
    }
  ];

  const filteredFestivals = festivals.filter(festival =>
    festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    festival.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFestivalClick = (festival: Festival) => {
    setSelectedFestival(festival);
  };

  const dotIcon = divIcon({
    className: 'custom-dot',
    html: '',
    iconSize: [10, 10],
  });

  return (
    <div style={{ height: '600px' }}>
      <MapContainer 
        center={[40.4168, -3.7038]} // Center of Iberian Peninsula
        zoom={6} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {festivals.map(festival => (
          <Marker 
            key={festival.id} 
            position={[festival.coordinates.lat, festival.coordinates.lng]}
            icon={dotIcon}
            eventHandlers={{
              click: () => handleFestivalClick(festival),
            }}
          >
            <Popup>
              <MapPopup festival={festival} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default InteractiveMap;
