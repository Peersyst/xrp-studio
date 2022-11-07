import "@peersyst/react-components";
import { TFunction } from "react-i18next";
import { Validator } from "react";

export type NetworkType = "mainnet" | "testnet" | "devnet";

declare module "@peersyst/react-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"error">;
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
        network: NetworkType;
        xrpNodeUrl: string;
        maxBioChars: number;
        maxUsernameChars: number;
        maxNftDescChars: number;
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
        blockchainLinks: Omit<BlockchainLinks, "token">;
        nftDefaultCoverUrl: string;
        maxBioChars: number;
        maxUsernameChars: number;
        maxNftDescChars: number;
    }

    export interface ExtraValidators {
        address: Validator;
    }

    export interface BlockchainLinks {
        address: string;
        tx: string;
        nft: string;
    }

    export interface BlockchainLinksTypesOverrides {
        address: true;
        tx: true;
        nft: true;
        token: false;
    }
}
