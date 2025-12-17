export interface SearchState {
  query: string;
  isSearching: boolean;
  results: string[];
}

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onSubmit?: (query: string) => void;
  onLocationClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}
