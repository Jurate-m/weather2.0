export interface ClientCoordsType {
  lat: number | null;
  lon: number | null;
}

export interface SearchContextType {
  userQuery: string;
  setUserQuery: React.Dispatch<React.SetStateAction<string>>;
  setLocationQuery: React.Dispatch<React.SetStateAction<string>>;
  display: boolean;
}

export interface SearchResultsType {
  name: string;
  place_id: string;
}

export interface PermissionDeniedType {
  status: boolean | number;
  message: string;
}
