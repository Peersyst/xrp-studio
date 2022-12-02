export interface DropLandingDescriptionSectionProps {
    cover?: string;
    image?: string;
    name: string;
    description?: string;
    items: number;
    price: string;
    sold: number;
    dropId: number;
    preview?: boolean;
    loading?: boolean;
}

export interface DropLandingDescriptionSectionRootProps {
    cover: string | undefined;
}
