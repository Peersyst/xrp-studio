import { DropCreationForm } from "module/drop/types";
import { CreateDropRequest } from "module/api/service";
import { xrpToDrops } from "xrpl";

export type CreateDropFormRequest = Omit<CreateDropRequest, "paymentHash">;

export default function (
    collectionId: number,
    { price, backgroundColor, fontColor, videoUrl, instagram, twitter, discord, faqs }: DropCreationForm,
): CreateDropFormRequest {
    return {
        collectionId,
        price: xrpToDrops(price),
        backgroundColor: backgroundColor.hex(),
        fontColor: fontColor.hex(),
        videoUrl: videoUrl || undefined,
        instagram: instagram || undefined,
        twitter: twitter || undefined,
        discord: discord || undefined,
        faqs: faqs,
    };
}
