import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, DivIcon } from 'leaflet';
import MapPopup from './MapPopup';
import { Festival } from '@/types/festival';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  festivals: Festival[];
}

const Map: React.FC<MapProps> = ({ festivals }) => {
  const dotIcon: DivIcon = divIcon({
    className: 'custom-dot',
    html: '',
    iconSize: [10, 10],
  });

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={[40.4168, -3.7038]}
        zoom={6} 
        scrollWheelZoom={true}
        className="h-full w-full absolute"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {festivals.map((festival) => (
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
  );
};

export default Map;
