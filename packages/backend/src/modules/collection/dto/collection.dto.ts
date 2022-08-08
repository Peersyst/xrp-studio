import { UserDto } from "../../user/dto/user.dto";
import { CollectionWithItems } from "../types";
import { Paginated } from "../../common/paginated.dto";
import { Collection } from "../../../database/entities/Collection";

export class CollectionDto {
    id: number;
    taxon: number;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    items: number;
    user: UserDto;

    static fromEntity({ id, taxon, name, description, image, header, user, ...rest }: Collection | CollectionWithItems): CollectionDto {
        const { items = 0 } = rest as CollectionWithItems;
        return {
            id,
            taxon: Number(taxon),
            name,
            description,
            image,
            header,
            items,
            user: UserDto.fromEntity(user),
        };
    }
}

export class PaginatedCollectionDto extends Paginated<CollectionDto> {
    items: CollectionDto[];
}
