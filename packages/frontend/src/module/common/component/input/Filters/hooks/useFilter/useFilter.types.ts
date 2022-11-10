export type MultipleSelector<T, M extends boolean> = M extends true ? T[] : T;

export interface UseFilterParams<M extends boolean> {
    name: string;
    multiple?: M;
}

export type UseFiltersReturn<T extends string, M extends boolean = false> = [
    MultipleSelector<T, M>,
    (newFilters: MultipleSelector<T, M> | undefined) => void,
];
