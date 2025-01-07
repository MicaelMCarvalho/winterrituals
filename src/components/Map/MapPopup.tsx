import React from 'react';
import { Festival } from '@/types/festival';

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
