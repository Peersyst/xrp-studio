import { UserDto } from "../../user/dto/user.dto";
import { CollectionWithItems } from "../types";
import { Paginated } from "../../common/paginated.dto";

export class CollectionDto {
    id: number;
    taxon: string;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    items: number;
    user: UserDto;

    static fromEntity({ id, taxon, name, description, image, header, items, user }: CollectionWithItems): CollectionDto {
        return {
            id,
            taxon,
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
