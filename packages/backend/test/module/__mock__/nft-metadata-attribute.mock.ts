import { NftMetadataAttribute } from "../../../src/database/entities/NftMetadataAttribute";
import { EntityParams } from "../../../src/modules/common/types";

class NftMetadataAttributeMock extends NftMetadataAttribute {
    constructor(
        nftMetadataAttribute: EntityParams<Partial<Omit<NftMetadataAttribute, "traitType" | "value">>> &
            Required<Pick<NftMetadataAttribute, "traitType" | "value">>,
    ) {
        super(nftMetadataAttribute);
    }
}

export default NftMetadataAttributeMock;
