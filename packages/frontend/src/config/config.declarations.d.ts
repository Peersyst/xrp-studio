import "@peersyst/react-components";
import { TFunction } from "react-i18next";
import { Validator } from "react";

export type NetworkType = "mainnet" | "testnet" | "devnet";

declare module "@peersyst/react-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"error">;
    }

    export interface AuctionDto {
        id: number;
        startDate: number;
        endDate: number;
        googleSheetId: string;
        googleForm: string;
    }

    export interface NftsInSell {
        [key: string]: {
            price: number;
            googleSheetId: string;
            googleForm: string;
        };
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
        blockchainLinks: Omit<BlockchainLinks, "token">;
        nftDefaultImageUrl: string;
        collectionDefaultImageUrl: string;
        collectionDefaultHeaderUrl: string;
        network: NetworkType;
        xrpNodeUrl: string;
        dropMinterAddress: string;
        maxBioChars: number;
        maxUsernameChars: number;
        maxTwitterUsernameChars: number;
        maxDiscordUsernameChars: number;
        minDiscordUsernameChars: number;
        maxInstagramUsernameChars: number;
        maxNftNameChars: number;
        maxNftDescChars: number;
        maxNftAttributeTypeChars: number;
        maxNftAttributeValueChars: number;
        maxCollectionNameChars: number;
        maxCollectionDescriptionChars: number;
        maxFaqQuestionChars: number;
        maxFaqAnswerChars: number;
        maxNumberDecimals: number;
        tokenName: string;
        feeInDrops: number;
        minAmountToCreateNftOffer: string;
        peersystEmail: string;
        peersyst: string;
        altNetwork: {
            network: NetworkType;
            url: string;
        };
        dropNftMintCost: string; // Drops
        footerLinks: {
            about: string;
            blog: string;
            github: string;
            twitter: string;
            support: string;
            privacyPolicy: string;
        };
        xrpStudioApStoreLink: string;
        xrpStudioGooglePlayLink: string;
        maxXrpAmountDecimals: number;
        auction: {
            nftsInAuction: AuctionDto[];
        };
        nftsInSell: NftsInSell;
        artistVerificationFormLink: string;
        auctionRefechInterval: number;
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
        nftDefaultImageUrl: string;
        collectionDefaultImageUrl: string;
        collectionDefaultHeaderUrl: string;
        network: string;
        xrpNodeUrl: string;
        dropMinterAddress: string;
        maxBioChars: number;
        maxUsernameChars: number;
        maxTwitterUsernameChars: number;
        maxDiscordUsernameChars: number;
        minDiscordUsernameChars: number;
        maxInstagramUsernameChars: number;
        maxNftNameChars: number;
        maxNftDescChars: number;
        maxNftAttributeTypeChars: number;
        maxNftAttributeValueChars: number;
        maxCollectionNameChars: number;
        maxCollectionDescriptionChars: number;
        maxFaqQuestionChars: number;
        maxFaqAnswerChars: number;
        maxNumberDecimals: number;
        tokenName: string;
        feeInDrops: number;
        minAmountToCreateNftOffer: string;
        peersystEmail: string;
        peersyst: string;
        altNetwork: {
            network: string;
            url: string;
        };
        dropNftMintCost: string; // Drops
        footerLinks: {
            about: string;
            blog: string;
            github: string;
            twitter: string;
            support: string;
            privacyPolicy: string;
        };
        xrpStudioApStoreLink: string;
        xrpStudioGooglePlayLink: string;
        maxXrpAmountDecimals: number;
        artistVerificationFormLink: string;
    }

    export interface ExtraValidators {
        address: Validator;
        phygitalPublicKey: Validator;
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
