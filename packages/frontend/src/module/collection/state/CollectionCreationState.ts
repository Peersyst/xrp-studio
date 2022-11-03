import { atom } from "recoil";
import { CreateNftDraftRequest, MetadataAttributeDto } from "module/api/service";
import Color from "color";

export interface CollectionCreationState {
    header?: string;
    image?: string;
    name?: string;
    description?: string;
    issuer?: string;
    transferFee?: number;
    externalUrl?: string;
    backgroundColor?: Color;
    burnable: boolean;
    onlyXPR: boolean;
    trustLine: boolean;
    transferable: boolean;
    attributes?: MetadataAttributeDto[];
    nfts: Record<number, CreateNftDraftRequest>;
}

const collectionCreationState = atom<CollectionCreationState>({
    key: "collection-creation",
    default: { burnable: false, onlyXPR: false, trustLine: false, transferable: false, nfts: [] },
});

export default collectionCreationState;
