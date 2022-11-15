export interface DropLandingDescriptionSectionProps {
    cover?: string;
    image?: string;
    name: string;
    description?: string;
    items: number;
    sold: number;
    sales: string;
    fontLuminance: number;
    loading?: boolean;
}

export interface DropLandingDescriptionSectionRootProps {
    cover: string | undefined;
    fontLuminance: number | undefined;
}
