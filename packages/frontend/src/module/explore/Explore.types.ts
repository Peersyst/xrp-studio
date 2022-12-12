import { CollectionDto, NftDto, UserDto } from "module/api/service";
import { CSSProperties } from "react";

export interface ExploreTrendingCollectionsProps {
    collections: CollectionDto[];
    className?: string;
    style?: CSSProperties;
    loading?: boolean;
}

export interface ExploreTrendingArtistsProps {
    artists: UserDto[];
    className?: string;
    style?: CSSProperties;
    loading?: boolean;
}

export interface ExploreTrendingNftsProps {
    nfts: NftDto[];
    className?: string;
    style?: CSSProperties;
    loading?: boolean;
}

export interface ExploreTrendingBannerProps {
    src: string;
    to: string;
}
