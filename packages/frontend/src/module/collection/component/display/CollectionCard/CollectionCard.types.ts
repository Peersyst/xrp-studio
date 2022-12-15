import { CollectionDto } from "module/api/service";

export interface CollectionCardProps {
    size?: "md" | "lg";
    gridWidth?: boolean;
    collection: CollectionDto;
}

export type CollectionCardSizeProps = Omit<CollectionCardProps, "collection">;
