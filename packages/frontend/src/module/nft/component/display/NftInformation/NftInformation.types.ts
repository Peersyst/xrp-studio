import { CollectionDto, CreateNftDraftRequest } from "module/api/service";

export interface NftInformationProps {
    data: CreateNftDraftRequest;
    collections: CollectionDto[];
}
