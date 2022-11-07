import { MetadataAttributeDto } from "module/api/service";

export class MetadataAttributeDtoMock {
    traitType: string;
    value: string;
    displayType?: string | null;

    constructor({ traitType, value, displayType }: MetadataAttributeDto) {
        this.traitType = traitType;
        this.value = value;
        this.displayType = displayType;
    }
}
