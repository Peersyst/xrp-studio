import { atom } from "recoil";
import { CreateCollectionNftRequest, MetadataAttributeDto } from "module/api/service";
import Color from "color";

export type CollectionCreationNft = CreateCollectionNftRequest & {
    id: number;
};

export interface CollectionCreationState {
    id?: number;
    header?: string;
    image?: string;
    name?: string;
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
    nfts: CollectionCreationNft[];
}

const collectionCreationState = atom<CollectionCreationState>({
    key: "collection-creation",
    default: { burnable: false, onlyXRP: false, trustLine: false, transferable: true, nfts: [] },
});

export default collectionCreationState;
