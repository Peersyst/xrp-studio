import { CollectionCreationForm } from "module/collection/types";
import Color from "color";
import { CreateCollectionNftRequest, MetadataAttributeDto } from "module/api/service";

export class CollectionCreationFormMock implements CollectionCreationForm {
    header?: string;
    image?: string;
    name: string;
    description?: string;
    issuer?: string;
    transferFee?: string;
    externalUrl?: string;
    backgroundColor?: Color;
    burnable: boolean;
    onlyXRP: boolean;
    trustLine: boolean;
    transferable: boolean;
    attributes?: MetadataAttributeDto[];
    nfts?: CreateCollectionNftRequest[];

    constructor({
        header = "header",
        image = "image",
        name = "name",
        description = "description",
        issuer,
        transferFee,
        externalUrl,
        backgroundColor,
        burnable = false,
        onlyXRP = false,
        trustLine = false,
        transferable = false,
        attributes,
        nfts = [{ metadata: { name: "NFT #1" } }, { metadata: { name: "NFT #2" } }, { metadata: { name: "NFT #3" } }],
    }: Partial<CollectionCreationForm> = {}) {
        this.header = header;
        this.image = image;
        this.name = name;
        this.description = description;
        this.issuer = issuer;
        this.transferFee = transferFee;
        this.externalUrl = externalUrl;
        this.backgroundColor = backgroundColor;
        this.burnable = burnable;
        this.onlyXRP = onlyXRP;
        this.trustLine = trustLine;
        this.transferable = transferable;
        this.attributes = attributes;
        this.nfts = nfts;
    }
}
