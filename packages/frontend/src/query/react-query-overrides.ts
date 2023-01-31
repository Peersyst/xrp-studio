import {
    useInfiniteQuery,
    InfiniteQueryObserverResult,
    UseQueryResult,
    QueryFunction,
    QueryKey,
    UseQueryOptions,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
    UseQueryOptions,
} from "react-query";

export type QueryOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
>;

export type InfiniteQueryOptions<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
> = Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>, "queryKey" | "queryFn">;

export interface PaginatedData<TData extends unknown[] = unknown[]> {
    currentPage: number;
    pages: number;
    items: TData;
}

type UseCustomInfiniteQuery = <
    TQueryFnData extends PaginatedData = PaginatedData,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?: Omit<
        UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
        "queryKey" | "queryFn" | "getNextPageParam"
    >,
) => UseInfiniteQueryResult<TData, TError>;

const useCustomInfiniteQuery: UseCustomInfiniteQuery = (queryKey, queryFn, options) =>
    useInfiniteQuery(queryKey, queryFn, {
        getNextPageParam: ({ currentPage, pages }) => (currentPage < pages ? currentPage + 1 : undefined),
        ...options,
    });

export type InfiniteQueryResult<TData = unknown, TError = unknown> = InfiniteQueryObserverResult<TData, TError>;
export type QueryResult<TData = unknown, TError = unknown> = UseQueryResult<TData, TError>;

export * from "react-query";
export { useCustomInfiniteQuery as useInfiniteQuery };
