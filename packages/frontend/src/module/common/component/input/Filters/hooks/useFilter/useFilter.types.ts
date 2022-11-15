export type MultipleSelector<T, M extends boolean> = M extends true ? T[] : T;

export interface UseFilterParams<M extends boolean> {
    multiple?: M;
}

export type UseFilterReturn<T extends string, M extends boolean = false> = [
    MultipleSelector<T, M>,
    (newFilter: MultipleSelector<T, M> | undefined) => void,
];
