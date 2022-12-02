import { encryptoart_logo, peersyst_logo, xrpl_logo } from "images";
import { CSSProperties } from "react";

export interface LandingPagePartnersSectionProps {
    className?: string;
    style?: CSSProperties;
}

export interface PartnerItem {
    alt: string;
    image: string;
    link: string;
}

export const PARTNERS: PartnerItem[] = [
    {
        alt: "XRPL logo",
        image: xrpl_logo,
        link: "https://xrpl.org",
    },
    {
        alt: "encrypto art logo",
        image: encryptoart_logo,
        link: "https://encrypto.art",
    },
    {
        alt: "peersyst logo",
        image: peersyst_logo,
        link: "https://peersyst.com",
    },
];
