import { useState, useCallback } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

export function useAsyncPaginateLoader<T>(
    loadOptions: (search: string, page: number) => Promise<{ data: T[]; hasMore: boolean; totalCount?: number }>,
    minSearchLength: number
) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadPaginatedOptions = useCallback(
        async (
            search: string,
            prevOptions: OptionsOrGroups<T, GroupBase<T>>,
            additional: { page: number } | undefined
        ) => {
            const page = additional?.page ?? 1;

            if (minSearchLength > 0 && search.length < minSearchLength) {
                return { options: [], hasMore: false, additional: { page: 1 } };
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await loadOptions(search, page);
                setIsLoading(false);

                return {
                    options: response.data,
                    hasMore: response.hasMore,
                    additional: { page: page + 1 },
                };
            } catch (err) {
                console.error('AsyncSelectPaginate error:', err);
                setIsLoading(false);
                setError('Failed to load data. Please try again.');

                return {
                    options: [],
                    hasMore: false,
                    additional: { page: page + 1 },
                };
            }
        },
        [loadOptions, minSearchLength]
    );

    return { isLoading, error, loadPaginatedOptions };
}
