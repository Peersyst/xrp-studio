import { NftCreationForm } from "module/nft/types";
import { CreateNftDraftRequest } from "module/api/service";

export default function ({
    name,
    description,
    image,
    backgroundColor,
    externalUrl,
    attributes,
    collection,
    issuer,
    transferFee,
    burnable,
    onlyXRP,
    trustLine,
    transferable,
}: NftCreationForm): CreateNftDraftRequest {
    return {
        issuer: issuer || undefined,
        transferFee: transferFee ? Number(transferFee) : undefined,
        flags: {
            burnable,
            onlyXRP,
            trustLine,
            transferable,
        },
        taxon: collection ? Number(collection) : undefined,
        metadata: {
            name: name || undefined,
            description: description || undefined,
            image: image || undefined,
            backgroundColor: backgroundColor?.hex(),
            externalUrl: externalUrl || undefined,
            attributes,
        },
    };
}
