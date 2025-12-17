export interface SearchState {
  query: string;
  isSearching: boolean;
  results: string[];
}

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  onLocationClick?: () => void;
  placeholder?: string;
}
