import { PreviewDrop } from "module/drop/types";
import { FaqsDto } from "module/api/service";
import { FaqsDtoMock } from "../dto/faqs.dto.mock";

export class PreviewDropMock implements PreviewDrop {
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

    constructor({
        cover,
        image = "drop-image",
        name = "drop-name",
        description = "drop-description",
        items = 100,
        sold = 10,
        price = "100",
        backgroundColor = "#000000",
        fontColor = "#FFFFFF",
        videoUrl = "video-url",
        instagram = "instagram",
        twitter = "twitter",
        discord = "discord",
        faqs = [
            new FaqsDtoMock({ id: 1, question: "Question A", answer: "Answer A" }),
            new FaqsDtoMock({ id: 1, question: "Question B", answer: "Answer B" }),
        ],
    }: Partial<PreviewDrop> = {}) {
        this.cover = cover;
        this.image = image;
        this.name = name;
        this.description = description;
        this.items = items;
        this.sold = sold;
        this.price = price;
        this.backgroundColor = backgroundColor;
        this.fontColor = fontColor;
        this.videoUrl = videoUrl;
        this.instagram = instagram;
        this.twitter = twitter;
        this.discord = discord;
        this.faqs = faqs;
    }
}
