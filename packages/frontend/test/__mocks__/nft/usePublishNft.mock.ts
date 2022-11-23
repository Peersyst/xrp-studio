import BaseMock from "../base.mock";
import { UsePublishNftReturn } from "module/nft/hook/usePublishNft";
import * as UsePublishNft from "../../../src/module/nft/hook/usePublishNft";

export class UsePublishNftMock extends BaseMock implements UsePublishNftReturn {
    publish;
    isPublishing;

    constructor({ publish = jest.fn(), isPublishing = false }: Partial<UsePublishNftReturn> = {}) {
        super();
        this.publish = publish;
        this.isPublishing = isPublishing;
        this.mock = jest.spyOn(UsePublishNft, "usePublishNft").mockReturnValue({ publish, isPublishing });
    }
}
