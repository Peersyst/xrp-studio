import { CollectionDto } from "module/api/service";

export interface CollectionCardRootProps {
    size?: string;
}

export interface CollectionCardProps extends CollectionCardRootProps {
    collection: CollectionDto;
}
