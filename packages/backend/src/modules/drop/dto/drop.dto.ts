import { Paginated } from "../../common/paginated.dto";
import { CollectionDto } from "../../collection/dto/collection.dto";
import { FaqDto } from "./faq.dto";
import { Drop } from "../../../database/entities/Drop";

export class DropDto {
    id: number;
    items: number;
    soldItems: number;
    price: string;
    backgroundColor: string;
    fontColor: string;
    videoUrl?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    faqs?: FaqDto[];
    collection?: CollectionDto;

    static fromEntity(drop: Drop): DropDto {
        return {
            id: drop.id,
            items: drop.items,
            soldItems: drop.soldItems,
            price: drop.price,
            backgroundColor: drop.backgroundColor,
            fontColor: drop.fontColor,
            videoUrl: drop.videoUrl,
            instagram: drop.instagram,
            twitter: drop.twitter,
            discord: drop.discord,
            faqs: drop.faqs !== undefined && (drop.faqs || []).map((faq) => FaqDto.fromEntity(faq)),
            collection: drop.collection && CollectionDto.fromEntity(drop.collection),
        };
    }
}

export class PaginatedDropDto extends Paginated<DropDto> {
    items: DropDto[];
}
