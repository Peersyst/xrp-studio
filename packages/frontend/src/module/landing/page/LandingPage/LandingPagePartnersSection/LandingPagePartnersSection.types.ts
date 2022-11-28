import { encryptoart_logo, peersyst_logo, ripple_logo } from "images";
import { CSSProperties } from "react";

export interface LandingPagePartnersSectionProps {
    className?: string;
    style?: CSSProperties;
}

export interface PartnerItem {
    alt: string;
    image: string;
}

export const PARTNERS: PartnerItem[] = [
    {
        alt: "rippler logo",
        image: ripple_logo,
    },
    {
        alt: "encrypto art logo",
        image: encryptoart_logo,
    },
    {
        alt: "peersyst logo",
        image: peersyst_logo,
    },
];
