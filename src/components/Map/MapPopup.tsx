import React from 'react';

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

interface MapPopupProps {
  festival: Festival;
}

const MapPopup: React.FC<MapPopupProps> = ({ festival }) => {
  return (
    <div className="p-2 max-w-xs">
      <h3 className="font-bold text-lg mb-1">{festival.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{festival.location}</p>
      <p className="text-sm text-gray-600 mb-2">{festival.date}</p>
      <p className="text-sm">{festival.description}</p>
    </div>
  );
};

export default MapPopup;
