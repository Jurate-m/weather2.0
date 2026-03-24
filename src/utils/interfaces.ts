export interface ClientCoordsType {
  lat: number | null;
  lon: number | null;
}

export interface SearchContextType {
  display: boolean;
  activeSearch: boolean;
  setActiveSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchResultsType {
  name: string;
  place_id: string;
}

export interface PermissionDeniedType {
  status: boolean | number;
  message: string;
}

export interface HourlyEntry {
  date: string;
  weather: string;
  icon: number;
  summary: string;
  temperature: number;
  feels_like: number;
  wind_chill: number;
  dew_point: number;
  wind: { speed: number; gusts: number; dir: string; angle: number };
  cloud_cover: number;
  pressure: number;
  precipitation: { total: number; type: string };
  probability: { precipitation: number; storm: number; freeze: number };
  ozone: number;
  uv_index: number | null;
  humidity: number;
  visibility: number;
}

export interface HourlyData {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  hourly: {
    data: HourlyEntry[];
  };
}
