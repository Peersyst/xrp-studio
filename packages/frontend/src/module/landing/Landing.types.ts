import { UserDto } from "module/api/service";
import { CSSProperties } from "react";
import { PartnerItem } from "./page/LandingPage/LandingPagePartnersSection/LandingPagePartnersSection.types";

export interface LandingPageProps {
    className?: string;
    style?: CSSProperties;
}
export type ItemHowWork = {
    image: string;
    title: string;
    description: string;
};

export type Partners = "ripple" | "encryptoart" | "peersyst";

export interface LandingPageArtistProps {
    artist: UserDto | undefined;
    className?: string;
    style?: CSSProperties;
}

export interface LandingPageItemProps {
    item: ItemHowWork | undefined;
    className?: string;
    style?: CSSProperties;
}

export interface LandingPagePartnersProps {
    partner: PartnerItem;
    className?: string;
    style?: CSSProperties;
}
