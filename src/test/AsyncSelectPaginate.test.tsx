import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AsyncSelectPaginate from '../components/AsyncSelectPaginate';

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
});
