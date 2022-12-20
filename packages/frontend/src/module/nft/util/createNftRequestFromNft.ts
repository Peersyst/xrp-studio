import { CreateNftDraftRequest, NftDraftDto, NftDto } from "module/api/service";
import parseFlags from "module/nft/util/parseFlags";

export default function ({
    collection,
    issuer,
    transferFee,
    flags: nFlags,
    metadata: { name, description, image, backgroundColor, externalUrl, attributes } = {},
}: NftDraftDto | NftDto): CreateNftDraftRequest {
    const flags = parseFlags(nFlags);

    return {
        issuer,
        transferFee: transferFee ?? undefined,
        flags,
        taxon: collection ? collection.taxon : undefined,
        metadata: {
            name: name || undefined,
            description: description || undefined,
            image: image || undefined,
            backgroundColor: backgroundColor || undefined,
            externalUrl: externalUrl || undefined,
            attributes: attributes || undefined,
        },
    };
}
