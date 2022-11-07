import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUrl } from "class-validator";
import { CreateCollectionNftRequest } from "./create-collection-nft-request";

export class CreateCollectionRequest {
    @ApiProperty({
        name: "taxon",
        description: "NFTokenTaxon of the collection. If not provided one will be assigned",
        type: "number",
        required: false,
        default: 0,
        minimum: 0,
        maximum: 4294967295,
        example: 123,
    })
    taxon?: number;

    @ApiProperty({
        name: "name",
        type: "string",
        required: true,
        maxLength: 255,
        example: "Bored Ape Yacht Club",
    })
    name: string;

    @ApiProperty({
        name: "description",
        type: "string",
        required: false,
        example:
            "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.",
    })
    description?: string;

    @ApiProperty({
        name: "image",
        type: "string",
        required: false,
        example:
            "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s168",
    })
    @IsOptional()
    @IsUrl()
    image?: string;

    @ApiProperty({
        name: "header",
        type: "string",
        required: false,
        example:
            "https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600",
    })
    @IsOptional()
    @IsUrl()
    header?: string;

    @ApiProperty({
        name: "nfts",
        type: CreateCollectionNftRequest,
        isArray: true,
        required: false,
    })
    nfts?: CreateCollectionNftRequest[];
}
