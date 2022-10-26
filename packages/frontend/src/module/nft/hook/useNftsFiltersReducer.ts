import { BaseFiltersNames } from "module/common/component/input/Filters/FiltersContext";
import { Dispatch, useReducer } from "react";
import { UseGetNftsOptions } from "../query/useGetNfts";

export default function useNftsFiltersReducer(
    initialState: Partial<UseGetNftsOptions> = { [BaseFiltersNames.ORDER]: "DESC" },
): [UseGetNftsOptions, Dispatch<Partial<UseGetNftsOptions>>] {
    return useReducer(
        (state: UseGetNftsOptions, newState: Partial<UseGetNftsOptions>) => ({
            ...state,
            ...newState,
        }),
        initialState, //default state
    );
}
