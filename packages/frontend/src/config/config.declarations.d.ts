import "@peersyst/react-components";
import { TFunction } from "react-i18next";

declare module "@peersyst/react-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"translation">;
    }

    export interface Config {
        publicUrl: string;
        backendUrl: string;
        appStoreLink: string;
        playStoreLink: string;
    }

    export interface CreateConfig {
        publicUrl: string;
        backendUrl: string;
        appStoreLink: string;
        playStoreLink: string;
    }
}
