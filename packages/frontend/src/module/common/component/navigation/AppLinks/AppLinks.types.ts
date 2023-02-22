export interface AppLinkProps {
    img: string;
    alt: string;
    link: string;
}

export interface AppLinkLogosProps {
    appStoreLink: string;
    googlePlayLink: string;
}

export interface AppLinksProps extends AppLinkLogosProps {
    label?: string;
}
