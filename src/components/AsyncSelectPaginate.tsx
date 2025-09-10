import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GroupBase, StylesConfig, ThemeConfig, LoadingIndicatorProps } from 'react-select';
import { useDebounce } from '../hooks/useDebounce';
import { useAsyncPaginateLoader } from '../hooks/useAsyncPaginateLoader';
import ErrorIcon from './ErrorIcon';
import LoadingSpinner from './LoadingSpinner';
import './../style/base.css';

export interface AsyncSelectPaginateProps<T> {
  value: T | null;
  onChange: (item: T | null) => void;
  loadOptions: (search: string, page: number) => Promise<{
    data: T[];
    hasMore: boolean;
    totalCount?: number;
  }>;
  getOptionLabel: (item: T) => string;
  getOptionValue?: (item: T) => string;
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

const AsyncSelectPaginate = <T extends unknown>({
                                                  value,
                                                  onChange,
                                                  loadOptions,
                                                  getOptionLabel,
                                                  getOptionValue = (item) => String((item as any).id), // ✅ تحويل id ل string
                                                  renderOption,
                                                  label = 'Select',
                                                  placeholder = 'Search...',
                                                  className = '',
                                                  classNamePrefix = 'async-select',
                                                  styles = {},
                                                  theme = 'light',
                                                  isDisabled = false,
                                                  isLoading = false,
                                                  loadingMessage = 'Loading...',
                                                  noOptionsMessage = ({ inputValue }) => inputValue ? 'No options found' : 'Start typing to search',
                                                  error = null,
                                                  debounceTimeout = 500,
                                                  minSearchLength = 0,
                                                  components = {},
                                                  closeMenuOnSelect = true,
                                                  isClearable = true,
                                                  isSearchable = true,
                                                  menuPlacement = 'auto',
                                                  pageSize = 10,
                                                  cacheUniq,
                                                }: AsyncSelectPaginateProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useDebounce(inputValue, debounceTimeout);

  const { isLoading: isLoadingInternal, error: errorState, loadPaginatedOptions } =
      useAsyncPaginateLoader(loadOptions, minSearchLength);

  const currentError = error || errorState;

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleChange = (selected: T | null) => {
    onChange(selected);
  };

  const formatOptionLabel = (item: T) =>
      renderOption ? renderOption(item) : <div>{getOptionLabel(item)}</div>;

  const customComponents = {
    LoadingIndicator: (props: LoadingIndicatorProps) => <LoadingSpinner {...props} />,
    ...components,
  };

  if (currentError) {
    customComponents.DropdownIndicator = () => <ErrorIcon />;
  }

  return (
      <div className={`async-select-container ${className} theme-${theme}`}>
        {label && <label className="async-select-label">{label}</label>}

        <AsyncPaginate
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            loadOptions={loadPaginatedOptions}
            debounceTimeout={0}
            additional={{ page: 1 }}
            placeholder={placeholder}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            formatOptionLabel={formatOptionLabel}
            classNamePrefix={classNamePrefix}
            styles={styles}
            isLoading={isLoading || isLoadingInternal}
            loadingMessage={() =>
                typeof loadingMessage === 'string' ? loadingMessage : loadingMessage()
            }
            noOptionsMessage={({ inputValue }) =>
                typeof noOptionsMessage === 'string'
                    ? noOptionsMessage
                    : noOptionsMessage({ inputValue })
            }
            isDisabled={isDisabled || isLoading}
            components={customComponents}
            closeMenuOnSelect={closeMenuOnSelect}
            isClearable={isClearable}
            isSearchable={isSearchable}
            menuPlacement={menuPlacement}
            cacheUniqs={cacheUniq ? [cacheUniq] : undefined}
        />

        {currentError && <div className="async-select-error">{currentError}</div>}
      </div>
  );
};

export default AsyncSelectPaginate;
