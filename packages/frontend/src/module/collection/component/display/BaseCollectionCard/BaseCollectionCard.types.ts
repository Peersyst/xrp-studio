import { ConditionalLinkProps } from "module/common/component/navigation/ConditionalLink/ConditionalLink.types";

export interface CollectionCardProps {
    size?: "md" | "lg";
}

export interface BaseCollectionCardProps {
    size?: "md" | "lg";
    to: ConditionalLinkProps["to"];
    header: string;
    alt: string;
    image: string;
    name: string;
    items: number;
}
