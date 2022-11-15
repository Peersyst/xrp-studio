import { CollectionDto, CreateNftDraftRequest } from "module/api/service";

export interface NftInformationPorps {
    data: Pick<CreateNftDraftRequest, "issuer" | "transferFee" | "flags" | "metadata" | "taxon">;
    collections: CollectionDto[];
}
