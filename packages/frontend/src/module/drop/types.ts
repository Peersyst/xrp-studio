import Color from "color";
import { CollectionDto, FaqDto } from "module/api/service";
import { Loosen } from "@peersyst/react-types";

export type Faq = Loosen<FaqDto, any>;

export interface DropCreationForm {
    price: string;
    backgroundColor: Color;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<FaqDto>;
    collection: CollectionDto;
}

export enum DropCreationFormFields {
    PRICE = "price",
    BACKGROUND_COLOR = "background_color",
    FONT_COLOR = "font_color",
    VIDEO_URL = "external_url",
    INSTAGRAM = "instagram",
    TWITTER = "twitter",
    DISCORD = "discord",
    FAQS = "faqs",
}
