import { FaqsDto } from "module/api/service";

export interface PreviewDrop {
    cover?: string;
    image?: string;
    name: string;
    description?: string;
    items: number;
    sold: number;
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<FaqsDto>;
}
