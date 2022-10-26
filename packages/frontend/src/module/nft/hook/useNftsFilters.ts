import { Dispatch, useReducer } from "react";
import { UseGetNftsOptions } from "../query/useGetNfts";

export default function useNftsFilters(
    initialState: Partial<UseGetNftsOptions> = {},
): [UseGetNftsOptions, Dispatch<Partial<UseGetNftsOptions>>] {
    return useReducer(
        (state: UseGetNftsOptions, newState: Partial<UseGetNftsOptions>) => ({
            ...state,
            ...newState,
        }),
        //default state
        initialState,
    );
}
