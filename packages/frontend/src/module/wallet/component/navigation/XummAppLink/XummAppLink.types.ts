import { ComponentType } from "react";

export type XummAppLinkType = ComponentType<XummAppLinkProps> & {
    PlayStore: ComponentType;
    AppStore: ComponentType;
};

export interface XummAppLinkProps {
    img: string;
    alt: string;
    link: string;
}
