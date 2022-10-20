import "@peersyst/react-components";
import { TFunction } from "react-i18next";
import { BlockchainLinks } from "@peersyst/react-components";

declare module "@peersyst/react-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"translation">;
    }

    export interface Config {
        publicUrl: string;
        backendUrl: string;
        appStoreXummLink: string;
        playStoreXummLink: string;
        socialLinks: {
            twitterLink: string;
            discordLink: string;
        };
        blockchainLinks: BlockchainLinks;
        nftDefaultCoverUrl: string;
        maxBioChars: number;
        maxUsernameChars: number;
    }

    export interface CreateConfig {
        publicUrl: string;
        backendUrl: string;
        appStoreXummLink: string;
        playStoreXummLink: string;
        socialLinks: {
            twitterLink: string;
            discordLink: string;
        };
        blockchainLinks: BlockchainLinks;
        nftDefaultCoverUrl: string;
        maxBioChars: number;
        maxUsernameChars: number;
    }
}
