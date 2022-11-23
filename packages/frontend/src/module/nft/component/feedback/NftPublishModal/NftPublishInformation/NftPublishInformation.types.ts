import { CreateNftDraftRequest } from "module/api/service";

export interface NftPublishInformationProps {
    request: CreateNftDraftRequest;
    collection?: string;
}

export interface NftPublishInformationFieldProps {
    title: string;
    content: string | undefined | number;
}
