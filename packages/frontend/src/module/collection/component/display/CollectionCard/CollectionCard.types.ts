import { CollectionDto } from "module/api/service";
import { GroupCardProps } from "module/common/component/display/GroupCard/GroupCard.types";

export interface CollectionCardProps extends GroupCardProps {
    collection: CollectionDto;
}
