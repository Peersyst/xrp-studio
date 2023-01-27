import Color from "color";
import { MetadataAttributeDto } from "module/api/service";
import { atom } from "recoil";
import { CollectionCreationNft } from "module/collection/types";

export interface CreateCollectionState {
    header: string;
    image: string;
    name: string;
    description: string;
    transferFee: string;
    externalUrl: string;
    backgroundColor: Color;
    burnable: boolean;
    onlyXRP: boolean;
    transferable: boolean;
    attributes: MetadataAttributeDto[];
    nfts: CollectionCreationNft[];
}

const createCollectionState = atom<CreateCollectionState>({
    key: "create-collections",
    default: {
        header: "",
        image: "",
        name: "",
        description: "",
        transferFee: "",
        externalUrl: "",
        backgroundColor: new Color("#000000"),
        burnable: false,
        onlyXRP: false,
        transferable: true,
        attributes: [],
        nfts: [],
    },
});

export default createCollectionState;
