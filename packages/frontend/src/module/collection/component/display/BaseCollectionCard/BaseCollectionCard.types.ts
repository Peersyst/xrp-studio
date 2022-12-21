import { ConditionalLinkProps } from "module/common/component/navigation/ConditionalLink/ConditionalLink.types";

export interface BaseCollectionCardSizeProps {
    size?: "md" | "lg";
}

export interface BaseCollectionCardProps extends BaseCollectionCardSizeProps {
    to: ConditionalLinkProps["to"];
    header: string;
    alt: string;
    image: string;
    name: string;
    description: string;
}
