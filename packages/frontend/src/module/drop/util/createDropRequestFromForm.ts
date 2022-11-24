import { DropCreationForm } from "module/drop/types";

// TODO: Add backend type
export type CreateDropRequest = any;

export default function ({
    price,
    backgroundColor,
    fontColor,
    videoUrl,
    instagram,
    twitter,
    discord,
    faqs,
}: DropCreationForm): CreateDropRequest {
    return {
        price,
        backgroundColor: backgroundColor.hex(),
        fontColor: fontColor.hex(),
        videoUrl: videoUrl || undefined,
        instagram: instagram || undefined,
        twitter: twitter || undefined,
        discord: discord || undefined,
        faqs: faqs,
    };
}
