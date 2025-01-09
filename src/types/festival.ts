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
  url: string;
  from_date: Date;
  to_date: Date;
}

export interface FestivalResponse {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  latitude: number;
  longitude: number;
  url: string;
  from_date: Date;
  to_date: Date;
}
