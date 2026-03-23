import { act, renderHook } from '@testing-library/react';
import { useAsyncPaginateLoader } from '../hooks/useAsyncPaginateLoader';

type Item = { id: number; name: string };

describe('useAsyncPaginateLoader cache behavior', () => {
  it('reuses cached result for the same query+page key', async () => {
    const loadOptions = jest.fn().mockResolvedValue({
      data: [{ id: 1, name: 'Alpha' }],
      hasMore: false,
    });

    const { result } = renderHook(() =>
      useAsyncPaginateLoader<Item>(loadOptions, 0, {
        enableCache: true,
        cacheTTL: 60_000,
        cacheUniq: 'v1',
      })
    );

    let firstCall: any;
    let secondCall: any;

    await act(async () => {
      firstCall = await result.current.loadPaginatedOptions('alpha', [], { page: 1 });
    });

    await act(async () => {
      secondCall = await result.current.loadPaginatedOptions('alpha', [], { page: 1 });
    });

    expect(loadOptions).toHaveBeenCalledTimes(1);
    expect(secondCall).toEqual(firstCall);
  });

  it('resets cache when cacheUniq changes', async () => {
    const loadOptions = jest
      .fn()
      .mockResolvedValueOnce({
        data: [{ id: 1, name: 'Alpha' }],
        hasMore: false,
      })
      .mockResolvedValueOnce({
        data: [{ id: 2, name: 'Beta' }],
        hasMore: false,
      });

    const { result, rerender } = renderHook(
      ({ cacheUniq }) =>
        useAsyncPaginateLoader<Item>(loadOptions, 0, {
          enableCache: true,
          cacheTTL: 60_000,
          cacheUniq,
        }),
      { initialProps: { cacheUniq: 'v1' } }
    );

    let firstResult: any;
    let secondResult: any;

    await act(async () => {
      firstResult = await result.current.loadPaginatedOptions('alpha', [], { page: 1 });
    });

    rerender({ cacheUniq: 'v2' });

    await act(async () => {
      secondResult = await result.current.loadPaginatedOptions('alpha', [], { page: 1 });
    });

    expect(loadOptions).toHaveBeenCalledTimes(2);
    expect(firstResult.options).toEqual([{ id: 1, name: 'Alpha' }]);
    expect(secondResult.options).toEqual([{ id: 2, name: 'Beta' }]);
  });
});
