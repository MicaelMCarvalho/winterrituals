import React from 'react';
import { Festival } from '@/types/festival';

interface ListProps {
  festivals: Festival[];
  selectedFestival: Festival | null;
  onFestivalSelect: (festival: Festival) => void;
}

const List: React.FC<ListProps> = ({ festivals, selectedFestival, onFestivalSelect }) => {
  return (
    <div className="h-full w-full overflow-y-auto border rounded-md shadow bg-white">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Festival List</h2>
        <div className="space-y-4">
          {festivals.map((festival) => (
            <div 
              key={festival.id} 
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                selectedFestival?.id === festival.id 
                  ? 'bg-blue-50 border-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onFestivalSelect(festival)}
            >
              <h3 className="font-semibold">{festival.name}</h3>
              <p className="text-sm text-gray-600">{festival.location}</p>
              <p className="text-sm text-gray-500">{festival.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
