import { ResourceType } from "locale/i18n.types";

export interface FooterItem {
    label: keyof ResourceType["translation"];
    link: string;
}

export type FooterItems = FooterItem[];

export const FOOTER_LINK: FooterItems[] = [
    [
        {
            label: "about",
            link: "",
        },
        {
            label: "download",
            link: "",
        },
        {
            label: "documentation",
            link: "",
        },
        {
            label: "blog",
            link: "",
        },
    ],
    [
        {
            label: "github",
            link: "",
        },
        {
            label: "twitter",
            link: "",
        },
        {
            label: "contribute",
            link: "",
        },
        {
            label: "ourSDK",
            link: "",
        },
    ],
    [
        {
            label: "support",
            link: "",
        },
        {
            label: "privacyPolicy",
            link: "",
        },
        {
            label: "madeWith",
            link: "",
        },
    ],
];

export interface FooterProps {
    className?: string;
}
