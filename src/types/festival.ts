export interface Festival {
  id: string;
  name: string;
  location: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  url: string;
  from_date: Date;
  to_date: Date;
  holiday: string;
}

export interface FestivalResponse {
  id: string;
  name: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  url: string;
  from_date: Date;
  to_date: Date;
  holiday: string;
}
