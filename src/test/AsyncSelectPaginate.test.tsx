import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AsyncSelectPaginate from '../components/AsyncSelectPaginate';
import type { AsyncSelectPaginateRef } from '../types';

describe('AsyncSelectPaginate', () => {
  const mockLoadOptions = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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
        debounceTimeout={0}
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
        debounceTimeout={0}
      />
    );

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(await screen.findByText('Test Item')).toBeInTheDocument();
  });

  it('exposes resetCache() and refetches for the same query after reset', async () => {
    mockLoadOptions.mockResolvedValue({
      data: [{ id: 1, name: 'Test Item' }],
      hasMore: false,
    });

    const ref = React.createRef<AsyncSelectPaginateRef>();

    render(
      <AsyncSelectPaginate
        ref={ref}
        value={null}
        onChange={() => {}}
        loadOptions={mockLoadOptions}
        getOptionLabel={(item: any) => item.name}
        debounceTimeout={0}
      />
    );

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(mockLoadOptions).toHaveBeenCalledTimes(1);
    });

    const callsBeforeReset = mockLoadOptions.mock.calls.length;

    act(() => {
      ref.current?.resetCache();
    });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(mockLoadOptions.mock.calls.length).toBeGreaterThan(callsBeforeReset);
    });
  });
});
