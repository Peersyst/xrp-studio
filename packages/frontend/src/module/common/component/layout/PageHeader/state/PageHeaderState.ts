import { atom } from "recoil";

export const headerStickyState = atom<boolean>({
    key: "header-sticky-state",
    default: false,
});
