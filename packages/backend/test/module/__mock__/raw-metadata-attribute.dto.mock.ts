import { RawMetadataAttributeDto } from "../../../src/modules/metadata/dto/raw-metadata-attribute.dto";

class RawMetadataAttributeDtoMock {
    trait_type: string;
    value: string;
    display_type?: string | null;

    constructor({ trait_type, value, display_type }: Partial<RawMetadataAttributeDto> = {}) {
        this.trait_type = trait_type;
        this.value = value;
        this.display_type = display_type;
    }
}

export default RawMetadataAttributeDtoMock;
