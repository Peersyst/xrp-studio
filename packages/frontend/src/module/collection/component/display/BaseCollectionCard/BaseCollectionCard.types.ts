import { ConditionalLinkProps } from "module/common/component/navigation/ConditionalLink/ConditionalLink.types";

export interface BaseCollectionCardSizeProps {
    size?: "md" | "lg";
    gridWidth?: boolean;
}

export interface BaseCollectionCardProps extends BaseCollectionCardSizeProps {
    to: ConditionalLinkProps["to"];
    header: string;
    alt: string;
    image: string;
    name: string | undefined;
    namePlaceholder?: string;
    description: string;
}
