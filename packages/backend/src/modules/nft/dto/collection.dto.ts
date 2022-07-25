import { UserDto } from "./user.dto";
import { Collection } from "../../../database/entities/Collection";

export class CollectionDto {
    id: number;
    taxon: string;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    user: UserDto;

    static fromEntity({ id, taxon, name, description, image, header, user }: Collection): CollectionDto {
        return {
            id,
            taxon,
            name,
            description,
            image,
            header,
            user: UserDto.fromEntity(user),
        };
    }
}
