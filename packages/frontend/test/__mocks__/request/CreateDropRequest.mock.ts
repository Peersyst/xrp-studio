import { CreateDropRequest } from "module/drop/util/createDropRequestFromForm";
import { Faq } from "module/drop/types";

export class CreateDropRequestMock implements CreateDropRequest {
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<Faq>;

    constructor({
        price = "100",
        backgroundColor = "#000000",
        fontColor = "#FFFFFF",
        videoUrl,
        instagram,
        twitter,
        discord,
        faqs = [],
    }: Partial<CreateDropRequest> = {}) {
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
