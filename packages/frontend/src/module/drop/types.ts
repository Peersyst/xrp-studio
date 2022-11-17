import Color from "color";
import { CollectionDto, FaqsDto } from "module/api/service";

export interface DropCreationForm {
    price: string;
    backgroundColor: Color;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<FaqsDto>;
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
    FAQS = "FAQs",
}
