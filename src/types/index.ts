import { GroupBase, StylesConfig, ThemeConfig } from 'react-select';

export interface LoadOptionsResponse<T> {
  data: T[];
  hasMore: boolean;
  totalCount?: number;
}

export type LoadOptionsFn<T> = (
  search: string,
  page: number
) => Promise<LoadOptionsResponse<T>>;

export interface AsyncSelectPaginateProps<T> {
  value: T | null;
  onChange: (item: T | null) => void;
  loadOptions: LoadOptionsFn<T>;
  getOptionLabel: (item: T) => string;
  getOptionValue?: (item: T) => string | number;
  renderOption?: (item: T) => React.ReactNode;
  label?: string;
  placeholder?: string;
  className?: string;
  classNamePrefix?: string;
  styles?: StylesConfig<T, false, GroupBase<T>>;
  theme?: 'light' | 'dark';
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingMessage?: string | (() => string);
  noOptionsMessage?: string | (({ inputValue }: { inputValue: string }) => string);
  error?: string | null;
  debounceTimeout?: number;
  minSearchLength?: number;
  components?: any;
  closeMenuOnSelect?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  pageSize?: number;
  cacheUniq?: any;
}