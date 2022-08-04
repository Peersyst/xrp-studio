import { User } from "../../../database/entities/User";

export class UserDto {
    address: string;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    twitter?: string;
    discord?: string;

    static fromEntity({ address, name, description, image, header, twitter, discord }: User): UserDto {
        return {
            address,
            name,
            description,
            image,
            header,
            twitter,
            discord,
        };
    }
}
