import { CollectionDto } from "module/api/service";

export interface CollectionCardProps {
    size?: "md" | "lg";
    collection: CollectionDto;
}

export type CollectionCardSizeProps = Pick<CollectionCardProps, "size">;
