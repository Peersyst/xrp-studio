import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUrl } from "class-validator";

export class UpdateCollectionRequest {
    @ApiProperty({
        name: "name",
        type: "string",
        required: false,
        maxLength: 256,
        example: "adidas Originals Into the Metaverse",
    })
    name?: string;

    @ApiProperty({
        name: "description",
        type: "string",
        required: false,
        example:
            "Bored Ape Yacht Club, PUNKS Comic, and gmoney welcome adidas Originals into the Metaverse. Phase 1 NFT physical product claims have now closed.",
    })
    description?: string;

    @ApiProperty({
        name: "image",
        type: "string",
        required: false,
        example:
            "https://lh3.googleusercontent.com/_wXtGDZ07ZelRfyfqDQkhoTX_feD_w3wdFuJ25z2ZLA1R6GFzuQ2jOGURRS8d7UEJGJd1svd61tZnGRS4zN-VXTUUVmg8Wymt-Uk=s168",
    })
    @IsOptional()
    @IsUrl()
    image?: string;

    @ApiProperty({
        name: "header",
        type: "string",
        required: false,
        example:
            "https://lh3.googleusercontent.com/iUwczcA9bw-JwPIm9jTiOG3b_qK9nqxs_Fn3GXs74pvkBY7toLN2JhgoPgriFS6ivSmcErC7USjZJqLTiQpYuU40kzJLfkfJpPnY=h600",
    })
    @IsOptional()
    @IsUrl()
    header?: string;
}
