import { createTheme } from "@peersyst/react-components";
import { TFunction } from "react-i18next";

export const createDefaultTheme = (translate: TFunction<"translation", undefined>) => {
    return createTheme({ translate });
};
