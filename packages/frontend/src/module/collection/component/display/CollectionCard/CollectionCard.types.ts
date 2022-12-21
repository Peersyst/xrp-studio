import { CollectionDto } from "module/api/service";
import { BaseCollectionCardProps } from "../BaseCollectionCard/BaseCollectionCard.types";

export interface CollectionCardProps extends Pick<BaseCollectionCardProps, "size" | "gridWidth"> {
    collection: CollectionDto;
}
