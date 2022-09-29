import { atom } from "recoil";

export const stickyHeaderState = atom<boolean>({
    key: "header-sticky-state",
    default: false,
});
