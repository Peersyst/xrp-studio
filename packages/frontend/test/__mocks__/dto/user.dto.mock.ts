import { UserDto } from "module/api/service";

export class UserDtoMock {
    address: string;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    twitter?: string;
    discord?: string;

    constructor({
        address = "rwxmBgnEtpqAMerLSLkCCLfuSisi7GAvU6",
        name = "user_name",
        description = "user_description",
        image = "user_image_url",
        header = "user_header_url",
        twitter = "twitter",
        discord = "discord",
    }: Partial<UserDto> = {}) {
        this.address = address;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.twitter = twitter;
        this.discord = discord;
    }
}
