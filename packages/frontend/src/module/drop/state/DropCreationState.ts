import { atom } from "recoil";
import Color from "color";
import { Faq } from "module/drop/types";

export interface DropCreationState {
    price: string;
    backgroundColor: Color;
    fontColor: Color;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<Faq>;
}

const dropCreationState = atom<DropCreationState>({
    key: "drop-creation",
    default: { price: "1", backgroundColor: new Color("#000000"), fontColor: new Color("#FFFFFF"), faqs: [] },
});

export default dropCreationState;
