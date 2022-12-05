import { CollectionDto } from "module/api/service";
import { CSSProperties } from "react";

export interface ExploreTrendingCollectionsProps {
    collections: CollectionDto[];
    className?: string;
    style?: CSSProperties;
    loading: boolean;
}

export interface ExploreTrendingBannerProps {
    src: string;
    to: string;
}
