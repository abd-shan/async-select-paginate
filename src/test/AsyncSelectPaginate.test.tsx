import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AsyncSelectPaginate from '../components/AsyncSelectPaginate';

// Mock the useAsyncPaginateLoader hook
jest.mock('../hooks/useAsyncPaginateLoader', () => ({
  useAsyncPaginateLoader: jest.fn(),
}));

import { useAsyncPaginateLoader } from '../hooks/useAsyncPaginateLoader';

describe('AsyncSelectPaginate', () => {
  const mockLoadOptions = jest.fn();
  const mockUseAsyncPaginateLoader = useAsyncPaginateLoader as jest.MockedFunction<
      typeof useAsyncPaginateLoader
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation
    mockUseAsyncPaginateLoader.mockReturnValue({
      isLoading: false,
      error: null,
      loadPaginatedOptions: jest.fn(),
    });
  });

  it('renders with placeholder text', async () => {
    render(
        <AsyncSelectPaginate
            value={null}
            onChange={() => {}}
            loadOptions={mockLoadOptions}
            getOptionLabel={(item: any) => item.name}
        />
    );

    expect(await screen.findByText('Search...')).toBeInTheDocument();
  });

  it('calls loadOptions when user types input', async () => {
    mockLoadOptions.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Test Item' }],
      hasMore: false,
    });

    render(
        <AsyncSelectPaginate
            value={null}
            onChange={() => {}}
            loadOptions={mockLoadOptions}
            getOptionLabel={(item: any) => item.name}
        />
    );

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(mockLoadOptions).toHaveBeenCalledTimes(1);
    });
  });

  it('displays options returned by loadOptions', async () => {
    mockLoadOptions.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Test Item' }],
      hasMore: false,
    });

    render(
        <AsyncSelectPaginate
            value={null}
            onChange={() => {}}
            loadOptions={mockLoadOptions}
            getOptionLabel={(item: any) => item.name}
        />
    );

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(await screen.findByText('Test Item')).toBeInTheDocument();
  });

  it('shows error message when error is provided via prop', async () => {
    mockUseAsyncPaginateLoader.mockReturnValue({
      isLoading: false,
      error: null,
      loadPaginatedOptions: jest.fn(),
    });

    render(
        <AsyncSelectPaginate
            value={null}
            onChange={() => {}}
            loadOptions={mockLoadOptions}
            getOptionLabel={(item: any) => item.name}
            error="Custom error message"
        />
    );

    expect(await screen.findByText('Custom error message')).toBeInTheDocument();
  });

  it('shows error message when useAsyncPaginateLoader returns error', async () => {
    mockUseAsyncPaginateLoader.mockReturnValue({
      isLoading: false,
      error: 'Hook error message',
      loadPaginatedOptions: jest.fn(),
    });

    render(
        <AsyncSelectPaginate
            value={null}
            onChange={() => {}}
            loadOptions={mockLoadOptions}
            getOptionLabel={(item: any) => item.name}
        />
    );

    expect(await screen.findByText('Hook error message')).toBeInTheDocument();
  });

  it('applies custom label when provided', async () => {
    render(
        <AsyncSelectPaginate
            value={null}
            onChange={() => {}}
            loadOptions={mockLoadOptions}
            getOptionLabel={(item: any) => item.name}
            label="Custom Label"
        />
    );

    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });
});
