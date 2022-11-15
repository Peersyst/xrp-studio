import { DropDto, FaqsDto } from "module/api/service";
import { PreviewDrop } from "module/drop/types";

/**
 * Drop utility class that can be constructed from a PreviewDrop or DropDto
 */
export class Drop {
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

    constructor(drop: PreviewDrop | DropDto) {
        if ("id" in drop) {
            // drop is a DropDto
            const {
                collection: { header, image, name, description, taxon, items },
                price,
                backgroundColor,
                fontColor,
                videoUrl,
                instagram,
                twitter,
                discord,
                faqs,
            } = drop;

            this.cover = header;
            this.image = image;
            this.name = name ?? taxon.toString();
            this.description = description;
            this.items = items;
            // TODO: Get sold from DropDto
            this.sold = 0;
            this.price = price;
            this.backgroundColor = backgroundColor;
            this.fontColor = fontColor;
            this.videoUrl = videoUrl;
            this.instagram = instagram;
            this.twitter = twitter;
            this.discord = discord;
            this.faqs = faqs;
        } else {
            // drop is a PreviewDrop
            const {
                cover,
                image,
                name,
                description,
                items,
                sold,
                price,
                backgroundColor,
                fontColor,
                videoUrl,
                instagram,
                twitter,
                discord,
                faqs,
            } = drop;

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
}
