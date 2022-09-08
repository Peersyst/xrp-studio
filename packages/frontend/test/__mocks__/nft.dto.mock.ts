import { CollectionDto, MetadataDto, NftDto, UserDto } from "module/api/service";
import UserDtoMock from "./user.dto.mock";
import MetadataDtoMock from "./metadata.dto.mock";

class NftDtoMock implements NftDto {
    status: "draft" | "pending" | "confirmed" | "failed";
    tokenId: string;
    mintTransactionHash: string;
    uri?: string;
    id: number;
    issuer?: string;
    transferFee?: number;
    flags: number;
    metadata?: MetadataDto;
    user: UserDto;
    collection?: CollectionDto;

    constructor({
        id = 1,
        metadata = new MetadataDtoMock(),
        status = "confirmed",
        uri,
        tokenId = "000B00006D44E4968F59DF27357EE8DF939DFC4B8610DB7E0000099B00000000",
        mintTransactionHash = "4EC8C9575A0C1F431DEB24A4D991F0E42A8A4884A933518AE2FAD5836B3BC189",
        issuer,
        transferFee,
        flags = 8,
        user = new UserDtoMock(),
        collection,
    }: Partial<NftDto> = {}) {
        this.status = status;
        this.tokenId = tokenId;
        this.mintTransactionHash = mintTransactionHash;
        this.uri = uri;
        this.id = id;
        this.issuer = issuer;
        this.transferFee = transferFee;
        this.flags = flags;
        this.metadata = metadata;
        this.user = user;
        this.collection = collection;
    }
}

export default NftDtoMock;
