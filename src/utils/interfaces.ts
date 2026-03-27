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

export interface ForeacstData {
  lat: string;
  lon: string;
  elevation: number;
  units: string;
}

interface ForecastEntry {
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
  humidity: number;
  visibility: number;
}

export interface HourlyEntry extends ForecastEntry {
  date: string;
  uv_index: number | null;
}

export interface DailyEntry extends ForecastEntry {
  day: string;
  predictability: number;
  temperature_min: number;
  temperature_max: number;
  feels_like_min: number;
  feels_like_max: number;
  wind_chill_min: number;
  wind_chill_max: number;
  dew_point_min: number;
  dew_point_max: number;
}

export interface HourlyData extends ForeacstData {
  timezone: string;
  hourly: {
    data: HourlyEntry[];
  };
}

export interface DailyData extends ForeacstData {
  daily: {
    data: DailyEntry[];
  };
}

export type ForecastValue =
  | string
  | number
  | null
  | Record<string, string | number>;
