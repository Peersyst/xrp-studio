import { CollectionDto, CreateNftDraftRequest } from "module/api/service";

export interface NftInformationProps {
    data: CreateNftDraftRequest;
    collection?: CollectionDto;
}
