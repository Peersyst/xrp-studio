import { Nft, NftStatus } from "../../../src/database/entities/Nft";
import { User } from "../../../src/database/entities/User";

class NftMock extends Nft {
    constructor({
        id,
        tokenId,
        mintTransactionHash,
        issuer,
        transferFee,
        flags,
        uri,
        status,
        user,
        collection,
        metadata,
    }: Partial<Nft> = {}) {
        super();
        this.id = id || 1;
        this.tokenId = tokenId || "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65";
        this.mintTransactionHash = mintTransactionHash || "t82F9E67FE6911B79F6D52CFF810D04F1E102ADFC36A581C02CC4AC20AD651C6B";
        this.issuer = issuer;
        this.transferFee = transferFee;
        this.flags = flags || 0;
        this.uri = uri;
        this.status = status || NftStatus.CONFIRMED;
        const defaultUser = new User();
        defaultUser.address = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2";
        this.user = user || defaultUser;
        this.collection = collection;
        this.metadata = metadata;
    }
}

export default NftMock;
