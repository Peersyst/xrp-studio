import { atom } from "recoil";
import { CollectionDto, CreateCollectionNftRequest, FaqsDto } from "module/api/service";
import Color from "color";

export type DropCreationNft = CreateCollectionNftRequest & {
    id: number;
};

export interface DropCreationState {
    price: string;
    backgroundColor?: Color;
    fontColor?: Color;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<FaqsDto>;
    collection: CollectionDto | undefined;
}

const dropCreationState = atom<DropCreationState>({
    key: "drop-creation",
    default: { price: "", collection: undefined, faqs: [] },
});

export default dropCreationState;
