import { MetadataAttributeDto } from "./metadata-attribute.dto";

export interface MetadataDto {
    name?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: MetadataAttributeDto[];
}
