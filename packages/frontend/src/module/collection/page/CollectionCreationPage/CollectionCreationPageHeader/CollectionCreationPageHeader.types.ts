import { CollectionDto } from "module/api/service";

export interface CollectionCreationPageHeaderProps {
    collection?: CollectionDto;
    loading?: boolean;
    saving?: boolean;
    publishing?: boolean;
    creating?: boolean;
}
