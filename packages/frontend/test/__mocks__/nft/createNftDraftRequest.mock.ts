import { CreateNftDraftRequest, CreateMetadataRequest, NftFlagsRequest } from "module/api/service";

export class CreateNftDraftRequestMock implements CreateNftDraftRequest {
    issuer?: string;
    transferFee?: number;
    flags?: NftFlagsRequest;
    taxon?: number;
    metadata?: CreateMetadataRequest;

    constructor({ issuer, transferFee, flags, taxon, metadata }: Partial<CreateNftDraftRequest> = {}) {
        this.issuer = issuer;
        this.transferFee = transferFee;
        this.flags = flags;
        this.taxon = taxon;
        this.metadata = metadata;
    }
}
