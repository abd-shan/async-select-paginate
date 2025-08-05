import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AsyncSelectPaginate from '../components/AsyncSelectPaginate';

const mockLoadOptions = jest.fn(() => 
  Promise.resolve({
    data: [{ id: 1, name: 'Test Item' }],
    hasMore: false
  })
);

describe('AsyncSelectPaginate', () => {
  it('renders without crashing', async () => {
    render(
      <AsyncSelectPaginate
        value={null}
        onChange={() => {}}
        loadOptions={mockLoadOptions}
        getOptionLabel={(item:any) => item.name}
      />
    );
    expect(await screen.findByText('Start typing to search')).toBeInTheDocument();
  });

  it('calls loadOptions on input change', async () => {
    render(
      <AsyncSelectPaginate
        value={null}
        onChange={() => {}}
        loadOptions={mockLoadOptions}
        getOptionLabel={(item) => item.name}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    await new Promise(r => setTimeout(r, 600)); 
    expect(mockLoadOptions).toHaveBeenCalled();
  });
});