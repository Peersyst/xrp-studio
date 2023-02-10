import { ResourceType } from "locale/i18n.types";

export interface FooterItem {
    label: keyof ResourceType["translation"];
    link: string;
}

export type FooterItems = FooterItem[];

export interface FooterSection {
    title: keyof ResourceType["translation"];
    items: FooterItems;
}

export interface FooterProps {
    className?: string;
}
