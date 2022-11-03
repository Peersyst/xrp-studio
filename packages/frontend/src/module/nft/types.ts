import { MetadataAttributeDto, NftDraftDto, NftDto } from "module/api/service";
import Color from "color";
import { Common } from "@peersyst/react-types";

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
export type Nft = Common<NftDto, NftDraftDto> & Record<string, any>;
