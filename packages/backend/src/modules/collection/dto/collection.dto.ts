import { UserDto } from "../../user/dto/user.dto";
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
    account: string;
    user?: UserDto;

    static fromEntity({ id, taxon, name, description, image, header, user, items, account }: Collection): CollectionDto {
        return {
            id,
            taxon: Number(taxon),
            name,
            description,
            image,
            header,
            items,
            account,
            user: user && UserDto.fromEntity(user),
        };
    }
}

export class PaginatedCollectionDto extends Paginated<CollectionDto> {
    items: CollectionDto[];
}
