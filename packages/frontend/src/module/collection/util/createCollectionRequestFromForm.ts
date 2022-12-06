import { CreateCollectionRequest, UpdateCollectionRequest } from "module/api/service";
import { CollectionCreationForm } from "module/collection/types";
import { Common } from "@peersyst/react-types";

export default function <A extends "create" | "update">(
    action: A,
    { header, image, name, description, nfts }: CollectionCreationForm,
): A extends "create" ? CreateCollectionRequest : UpdateCollectionRequest {
    const commonRequest: Common<CreateCollectionRequest, UpdateCollectionRequest> = {
        header: header || undefined,
        image: image || undefined,
        name: name,
        description: description || undefined,
    };
    //@ts-ignore Can be ignored as UpdateCollectionRequest is guaranteed by action !== "create"
    return { ...commonRequest, nfts: nfts?.length ? nfts : undefined };
}
