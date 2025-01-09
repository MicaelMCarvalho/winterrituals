// Map.tsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon, DivIcon } from 'leaflet';
import MapPopup from './MapPopup';
import { Festival } from '@/types/festival';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  festivals: Festival[];
  selectedFestival: Festival | null;
  onFestivalSelect: (festival: Festival) => void;
}

const MapController: React.FC<{ selectedFestival: Festival | null }> = ({ selectedFestival }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedFestival) {
      map.flyTo(
        [selectedFestival.coordinates.lat, selectedFestival.coordinates.lng],
        map.getZoom(),
        { duration: 0.5 }
      );
    }
  }, [selectedFestival, map]);

  return null;
};

const Map: React.FC<MapProps> = ({ festivals, selectedFestival, onFestivalSelect }) => {
  const markerRefs = useRef<{ [key: string]: L.Marker }>({});
  const previousSelectedId = useRef<string | null>(null);

  const dotIcon: DivIcon = divIcon({
    className: 'custom-dot',
    html: '',
    iconSize: [10, 10],
  });

  const selectedDotIcon: DivIcon = divIcon({
    className: 'custom-dot-selected',
    html: '',
    iconSize: [14, 14],
  });

  useEffect(() => {
    // Close previous popup if exists
    if (previousSelectedId.current && markerRefs.current[previousSelectedId.current]) {
      markerRefs.current[previousSelectedId.current].closePopup();
    }

    // Open new popup if a festival is selected
    if (selectedFestival && markerRefs.current[selectedFestival.id]) {
      markerRefs.current[selectedFestival.id].openPopup();
    }

    // Update previous selected id
    previousSelectedId.current = selectedFestival?.id || null;
  }, [selectedFestival]);

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
        <MapController selectedFestival={selectedFestival} />
        {festivals.map((festival) => (
          <Marker
            key={festival.id}
            position={[festival.coordinates.lat, festival.coordinates.lng]}
            icon={festival.id === selectedFestival?.id ? selectedDotIcon : dotIcon}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[festival.id] = ref;
              }
            }}
            eventHandlers={{
              click: () => onFestivalSelect(festival),
            }}
          >
            <Popup>
              <MapPopup festival={festival} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style>{`
        .custom-dot {
          background-color: #3b82f6;
          border-radius: 50%;
          border: 2px solid white;
        }
        .custom-dot-selected {
          background-color: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default Map;
