import { CollectionDto, CreateNftDraftRequest } from "module/api/service";

export interface NftInformationProps {
    data: CreateNftDraftRequest;
    collection?: CollectionDto;
}

export interface NftInformationFieldProps {
    title: string;
    content: string | undefined | number;
}
