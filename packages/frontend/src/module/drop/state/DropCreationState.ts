import { atom } from "recoil";
import { CollectionDto } from "module/api/service";
import Color from "color";
import { Faq } from "module/drop/types";

export interface DropCreationState {
    price: string;
    backgroundColor?: Color;
    fontColor?: Color;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<Faq>;
    collection: CollectionDto | undefined;
}

const dropCreationState = atom<DropCreationState>({
    key: "drop-creation",
    default: { price: "", collection: undefined, faqs: [] },
});

export default dropCreationState;
