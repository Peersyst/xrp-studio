import "@peersyst/react-components";
import { TFunction } from "react-i18next";

declare module "@peersyst/react-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"translation">;
    }
}
