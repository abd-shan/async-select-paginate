import { useState, useCallback, useEffect, useRef } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

type LoadResponse<T> = { data: T[]; hasMore: boolean; totalCount?: number };

interface CacheOptions {
    cacheUniq?: unknown;
    enableCache?: boolean;
    cacheTTL?: number;
}

interface PaginatedResult<T> {
    options: T[];
    hasMore: boolean;
    additional: { page: number };
}

export function useAsyncPaginateLoader<T>(
    loadOptions: (search: string, page: number) => Promise<LoadResponse<T>>,
    minSearchLength: number,
    {
        cacheUniq,
        enableCache = true,
        cacheTTL = 5 * 60 * 1000,
    }: CacheOptions = {}
) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const requestIdRef = useRef(0);
    const activeRequestsRef = useRef(0);
    const resetTokenRef = useRef(0);
    const cacheRef = useRef<Map<string, { timestamp: number; result: PaginatedResult<T> }>>(new Map());
    const inflightRef = useRef<Map<string, Promise<PaginatedResult<T>>>>(new Map());

    const resetCache = useCallback(() => {
        resetTokenRef.current += 1;
        cacheRef.current.clear();
        inflightRef.current.clear();
        requestIdRef.current += 1;
        activeRequestsRef.current = 0;
        setIsLoading(false);
        setError(null);
    }, []);

    useEffect(() => {
        resetCache();
    }, [cacheUniq, minSearchLength, enableCache, cacheTTL, resetCache]);

    const loadPaginatedOptions = useCallback(
        async (
            search: string,
            _prevOptions: OptionsOrGroups<T, GroupBase<T>>,
            additional: { page: number } | undefined
        ) => {
            const page = additional?.page ?? 1;

            if (minSearchLength > 0 && search.length < minSearchLength) {
                setError(null);
                return { options: [], hasMore: false, additional: { page: 1 } };
            }

            const cacheKey = `${search}::${page}`;
            const now = Date.now();

            if (enableCache) {
                const cached = cacheRef.current.get(cacheKey);
                if (cached) {
                    const isExpired = cacheTTL > 0 && now - cached.timestamp > cacheTTL;
                    if (!isExpired) {
                        return cached.result;
                    }
                    cacheRef.current.delete(cacheKey);
                }

                const inflight = inflightRef.current.get(cacheKey);
                if (inflight) {
                    return inflight;
                }
            }

            const requestId = ++requestIdRef.current;
            const tokenAtRequestStart = resetTokenRef.current;
            activeRequestsRef.current += 1;
            setIsLoading(true);
            setError(null);

            const requestPromise = (async () => {
                try {
                    const response = await loadOptions(search, page);

                    if (!response || !Array.isArray(response.data) || typeof response.hasMore !== 'boolean') {
                        throw new Error('loadOptions must return { data: T[]; hasMore: boolean; totalCount?: number }');
                    }

                    if (tokenAtRequestStart !== resetTokenRef.current) {
                        return { options: [], hasMore: false, additional: { page: 1 } };
                    }

                    const result = {
                        options: response.data,
                        hasMore: response.hasMore,
                        additional: { page: page + 1 },
                    };

                    if (enableCache) {
                        cacheRef.current.set(cacheKey, { timestamp: Date.now(), result });
                    }

                    return result;
                } catch (err) {
                    console.error('AsyncSelectPaginate error:', err);
                    if (requestId === requestIdRef.current) {
                        setError('Failed to load data. Please try again.');
                    }

                    return {
                        options: [],
                        hasMore: false,
                        additional: { page },
                    };
                } finally {
                    inflightRef.current.delete(cacheKey);
                    activeRequestsRef.current -= 1;
                    if (activeRequestsRef.current <= 0) {
                        activeRequestsRef.current = 0;
                        setIsLoading(false);
                    } else if (requestId === requestIdRef.current) {
                        setIsLoading(true);
                    }
                }
            })();

            if (enableCache) {
                inflightRef.current.set(cacheKey, requestPromise);
            }

            return requestPromise;
        },
        [cacheTTL, enableCache, loadOptions, minSearchLength]
    );

    return { isLoading, error, loadPaginatedOptions, resetCache };
}
