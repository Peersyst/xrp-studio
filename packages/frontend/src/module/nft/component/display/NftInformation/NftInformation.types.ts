import { CreateNftDraftRequest } from "module/api/service";

export interface NftInformationProps {
    request: CreateNftDraftRequest;
    collection?: string;
}

export interface NftInformationFieldProps {
    title: string;
    content: string | undefined | number;
}
