import { CreateNftMetadataAttributeRequest, CreateNftMetadataRequest } from "module/api/service";

export class CreateNftMetadataRequestMock implements CreateNftMetadataRequest {
    name?: string;
    description?: string;
    image?: string;
    backgroundColor?: string;
    externalUrl?: string;
    attributes?: Array<CreateNftMetadataAttributeRequest>;

    constructor({ name, description, image, backgroundColor, externalUrl, attributes }: Partial<CreateNftMetadataRequest> = {}) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.backgroundColor = backgroundColor;
        this.externalUrl = externalUrl;
        this.attributes = attributes;
    }
}
