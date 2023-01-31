import { NftDraftDto } from "module/api/service";
import { CollectionCreationNft } from "module/collection/types";
import parseFlags from "module/nft/util/parseFlags";

export default function ({ id, issuer, transferFee, flags, metadata }: NftDraftDto): CollectionCreationNft {
    return {
        id,
        issuer,
        transferFee,
        flags: parseFlags(flags),
        metadata,
    };
}
