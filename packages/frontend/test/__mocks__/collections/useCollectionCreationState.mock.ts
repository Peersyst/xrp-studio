import BaseMock from "../base.mock";
import * as useCollectionCreationState from "module/collection/hook/useCollectionCreationState";
import Color from "color";
import { CreateNftDraftRequest, MetadataAttributeDto } from "module/api/service";
import { CollectionCreationState } from "module/collection/state/CollectionCreationState";

export class useCollectionCreationStateMock extends BaseMock {
    cover?: string;
    image?: string;
    name?: string;
    description?: string;
    issuer?: string;
    transferFee?: number;
    backgroundColor?: Color;
    burnable: boolean;
    onlyXRP: boolean;
    trustLine: boolean;
    transferable: boolean;
    attributes?: MetadataAttributeDto[];
    nfts: Record<number, CreateNftDraftRequest>;
    useCollectionCreationState = jest.fn();

    constructor({
        cover = "",
        image = "",
        name = "name",
        description = "description",
        issuer = "",
        transferFee = 0,
        backgroundColor = Color.rgb(),
        burnable = false,
        onlyXRP = false,
        trustLine = false,
        transferable = false,
        nfts = {},
    }: CollectionCreationState) {
        super();
        this.cover = cover;
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
        this.nfts = nfts;
        this.mock = jest.spyOn(useCollectionCreationState, "default").mockReturnValue([
            {
                cover: this.cover,
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
                nfts: this.nfts,
            },
            this.useCollectionCreationState(),
        ]);
    }
}
