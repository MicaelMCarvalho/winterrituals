export interface Festival {
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

export interface FestivalResponse {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  latitude: number;
  longitude: number;
}
