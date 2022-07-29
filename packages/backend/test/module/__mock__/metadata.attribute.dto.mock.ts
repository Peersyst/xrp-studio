import { MetadataAttributeDto } from "../../../src/modules/nft/dto/metadata-attribute.dto";

class MetadataAttributeDtoMock {
    traitType: string;
    value: string;
    displayType?: string;

    constructor({ traitType, value, displayType }: Partial<MetadataAttributeDto> = {}) {
        this.traitType = traitType;
        this.value = value;
        this.displayType = displayType;
    }
}

export default MetadataAttributeDtoMock;
