import { MetadataAttributeDto } from "module/api/service";

class MetadataAttributeDtoMock {
    traitType: string;
    value: string;
    displayType?: string;

    constructor({ traitType, value, displayType }: MetadataAttributeDto) {
        this.traitType = traitType;
        this.value = value;
        this.displayType = displayType;
    }
}

export default MetadataAttributeDtoMock;
