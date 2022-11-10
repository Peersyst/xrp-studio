import Color from "color";
import { CreateCollectionNftRequest, MetadataAttributeDto } from "module/api/service";

export enum CollectionCreationFormFields {
    HEADER = "header",
    IMAGE = "image",
    NAME = "name",
    DESCRIPTION = "description",
    ISSUER = "issuer",
    TRANSFER_FEE = "transferFee",
    EXTERNAL_URL = "externalUrl",
    BACKGROUND_COLOR = "backgroundColor",
    BURNABLE = "burnable",
    ONLY_XRP = "onlyXRP",
    TRUST_LINE = "trustLine",
    TRANSFERABLE = "transferable",
    ATTRIBUTES = "attributes",
    NFTS = "nfts",
}

export interface CollectionCreationForm {
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
}
