import { Faq } from "module/drop/types";
import { CreateDropRequest } from "module/api/service";
import { CreateDropFormRequest } from "module/drop/util/createDropRequestFromForm";

export class CreateDropFormRequestMock implements CreateDropFormRequest {
    collectionId: number;
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs: Array<Faq>;

    constructor({
        collectionId = 1,
        price = "10000",
        backgroundColor = "#000000",
        fontColor = "#FFFFFF",
        videoUrl,
        instagram,
        twitter,
        discord,
        faqs = [],
    }: Partial<CreateDropRequest> = {}) {
        this.collectionId = collectionId;
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
