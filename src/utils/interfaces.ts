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
