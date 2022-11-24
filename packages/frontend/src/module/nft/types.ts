import {
    CollectionDto,
    CreateMetadataRequest,
    MetadataAttributeDto,
    MetadataDto,
    NftDraftDto,
    NftDto,
    NftFlagsRequest,
} from "module/api/service";
import Color from "color";
import { Common, Loosen } from "@peersyst/react-types";
import { CollectionCreationNft } from "module/collection/state/CollectionCreationState";

export interface NftCreationForm {
    image?: string;
    name?: string;
    description?: string;
    collection?: string;
    issuer?: string;
    transferFee?: string;
    externalUrl?: string;
    backgroundColor?: Color;
    burnable: boolean;
    onlyXRP: boolean;
    trustLine: boolean;
    transferable: boolean;
    attributes?: MetadataAttributeDto[];
}

// Any object that extends Common<NftDto, NftDraftDto>
export type Nft = Common<Common<NftDto, NftDraftDto>, CollectionCreationNft> & Record<string, any>;
export type PreviewNft = Loosen<Nft, "id">;

export interface CreationNft {
    issuer?: string;
    transferFee?: number;
    flags?: number | NftFlagsRequest;
    metadata?: MetadataDto | CreateMetadataRequest;
    collection?: CollectionDto;
}
