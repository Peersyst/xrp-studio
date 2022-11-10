import BaseMock from "../base.mock";
import * as useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import Color from "color";
import { MetadataAttributeDto } from "module/api/service";
import { CollectionCreationNft, CollectionCreationState } from "module/collection/state/CollectionCreationState";

export class UseCollectionCreationStateMock extends BaseMock {
    header?: string;
    image?: string;
    name?: string;
    description?: string;
    issuer?: string;
    transferFee?: string;
    backgroundColor?: Color;
    burnable: boolean;
    onlyXRP: boolean;
    trustLine: boolean;
    transferable: boolean;
    attributes?: MetadataAttributeDto[];
    nfts: CollectionCreationNft[];

    setCollectionCreationState = jest.fn();

    constructor({
        header = "",
        image = "",
        name = "name",
        description = "description",
        issuer = "",
        transferFee = "0",
        backgroundColor = Color.rgb(),
        burnable = false,
        onlyXRP = false,
        trustLine = false,
        transferable = false,
        attributes = [],
        nfts = [],
    }: Partial<CollectionCreationState> = {}) {
        super();
        this.header = header;
        this.image = image;
        this.name = name;
        this.description = description;
        this.issuer = issuer;
        this.transferFee = transferFee;
        this.backgroundColor = backgroundColor;
        this.burnable = burnable;
        this.onlyXRP = onlyXRP;
        this.trustLine = trustLine;
        this.transferable = transferable;
        this.attributes = attributes;
        this.nfts = nfts;
        this.mock = jest.spyOn(useCollectionCreationState, "default").mockReturnValue([
            {
                header: this.header,
                image: this.image,
                name: this.name,
                description: this.description,
                issuer: this.issuer,
                transferFee: this.transferFee,
                backgroundColor: this.backgroundColor,
                burnable: this.burnable,
                onlyXRP: this.onlyXRP,
                trustLine: this.trustLine,
                transferable: this.transferable,
                attributes: this.attributes,
                nfts: this.nfts,
            },
            this.setCollectionCreationState,
        ]);
    }
}
