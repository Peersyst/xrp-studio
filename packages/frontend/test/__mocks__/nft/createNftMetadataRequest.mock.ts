import { CreateMetadataAttributeRequest, CreateMetadataRequest } from "module/api/service";

export class CreateNftMetadataRequestMock implements CreateMetadataRequest {
    name?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: Array<CreateMetadataAttributeRequest>;

    constructor({ name, description, image, backgroundColor, externalUrl, attributes }: Partial<CreateMetadataRequest> = {}) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.backgroundColor = backgroundColor;
        this.externalUrl = externalUrl;
        this.attributes = attributes;
    }
}
