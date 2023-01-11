import { User } from "../../../database/entities/User";

export class UserDto {
    address: string;
    name: string;
    description?: string;
    image?: string;
    header?: string;
    twitter?: string;
    discord?: string;
    verifiedArtist?: boolean;
    nftsCount?: number;

    static fromEntity({
        address,
        verifiedArtist,
        name,
        description,
        image,
        header,
        twitter,
        discord,
        nftsCount,
    }: User & { nftsCount?: number }): UserDto {
        return {
            address,
            name,
            description,
            image,
            header,
            twitter,
            discord,
            verifiedArtist,
            nftsCount,
        };
    }
}
