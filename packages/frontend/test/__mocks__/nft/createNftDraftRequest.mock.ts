import { CreateNftDraftRequest, CreateNftMetadataRequest, NftFlagsRequest } from "module/api/service";
import { CreateNftMetadataRequestMock } from "./createNftMetadataRequest.mock";

export class CreateNftDraftRequestMock implements CreateNftDraftRequest {
    issuer?: string;
    transferFee?: number;
    flags?: NftFlagsRequest;
    taxon?: number;
    metadata?: CreateNftMetadataRequest;

    constructor({ issuer, transferFee, flags, taxon, metadata = new CreateNftMetadataRequestMock() }: Partial<CreateNftDraftRequest> = {}) {
        this.issuer = issuer;
        this.transferFee = transferFee;
        this.flags = flags;
        this.taxon = taxon;
        this.metadata = metadata;
    }
}
