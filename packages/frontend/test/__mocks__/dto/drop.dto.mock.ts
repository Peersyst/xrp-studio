import { CollectionDto, DropDto, FaqsDto } from "module/api/service";
import { FaqsDtoMock } from "./faqs.dto.mock";
import { CollectionDtoMock } from "test-mocks";

export class DropDtoMock implements DropDto {
    id: number;
    price: string;
    sold: number;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<FaqsDto>;
    collection: CollectionDto;

    constructor({
        id = 1,
        price = "100",
        sold = 50,
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
        collection = new CollectionDtoMock(),
    }: // TODO: ADD sold to DropDto
    Partial<DropDto & { sold: number }> = {}) {
        this.id = id;
        this.price = price;
        this.sold = sold;
        this.backgroundColor = backgroundColor;
        this.fontColor = fontColor;
        this.videoUrl = videoUrl;
        this.instagram = instagram;
        this.twitter = twitter;
        this.discord = discord;
        this.faqs = faqs;
        this.collection = collection;
    }
}