import React from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { LoadingIndicatorProps } from 'react-select';
import { useAsyncPaginateLoader } from '../hooks/useAsyncPaginateLoader';
import type { AsyncSelectPaginateProps } from '../types/index';
import ErrorIcon from './ErrorIcon';
import LoadingSpinner from './LoadingSpinner';
import './../style/base.css';

const AsyncSelectPaginate = <T extends unknown>({
                                                  value,
                                                  onChange,
                                                  loadOptions,
                                                  getOptionLabel,
                                                  getOptionValue = (item) => String((item as any).id),
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
                                                  cacheUniq,
                                                  enableCache = true,
                                                  cacheTTL = 5 * 60 * 1000,
                                                }: AsyncSelectPaginateProps<T>) => {
  const { isLoading: isLoadingInternal, error: errorState, loadPaginatedOptions } =
      useAsyncPaginateLoader(loadOptions, minSearchLength, {
        cacheUniq,
        enableCache,
        cacheTTL,
      });

  const currentError = error || errorState;

  const handleChange = (selected: T | null) => {
    onChange(selected);
  };

  const formatOptionLabel = (item: T) =>
      renderOption ? renderOption(item) : <div>{getOptionLabel(item)}</div>;
  const normalizedGetOptionValue = (item: T) => String(getOptionValue(item));

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
            loadOptions={loadPaginatedOptions}
            debounceTimeout={debounceTimeout}
            additional={{ page: 1 }}
            placeholder={placeholder}
            getOptionLabel={getOptionLabel}
            getOptionValue={normalizedGetOptionValue}
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
