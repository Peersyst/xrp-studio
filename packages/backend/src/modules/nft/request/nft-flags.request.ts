import { ApiProperty } from "@nestjs/swagger";

export class NftFlagsRequest {
    @ApiProperty({
        name: "burnable",
        description:
            "If set, indicates that the issuer (or an entity authorized by the issuer) can destroy the object. The object's owner can always do so.",
        type: "boolean",
        required: false,
        default: "false",
    })
    burnable?: boolean;

    @ApiProperty({
        name: "onlyXRP",
        description: "If set, indicates that the tokens can only be offered or sold for XRP.",
        type: "boolean",
        required: false,
        default: "false",
    })
    onlyXRP?: boolean;

    @ApiProperty({
        name: "trustLine",
        description:
            "If set, indicates that the issuer wants a trustline to be automatically created. The lsfTrustLine field is useful when the token can be offered for sale for assets other than XRP and the issuer charges a TransferFee. If this flag is set, a trust line is automatically created as needed to allow the issuer to receive the appropriate transfer fee. If this flag is not set, an attempt to transfer the NFToken for an asset for which the issuer does not have a trustline fails.",
        type: "boolean",
        required: false,
        default: "false",
    })
    trustLine?: boolean;

    @ApiProperty({
        name: "transferable",
        description:
            "If set, indicates that this NFT can be transferred. This flag has no effect if the token is being transferred from the issuer or to the issuer.",
        type: "boolean",
        required: false,
        default: "false",
    })
    transferable?: boolean;
}
