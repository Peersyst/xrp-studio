import { atom } from "recoil";

export const filtersVisibilityState = atom<boolean>({
    key: "filters-visibility-state",
    default: false,
});
