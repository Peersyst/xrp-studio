import BaseMock from "../base.mock";
import { NftDraftDto } from "module/api/service";
import * as useNftStatePolling from "module/nft/hook/useNftStatePolling";
import { UseNftStatePollingResult } from "module/nft/hook/useNftStatePolling";

export class UseNftStatePollingMock extends BaseMock {
    fetch: jest.Mock;
    nftStatus: NftDraftDto["status"];

    constructor({ fetch = jest.fn() }: Partial<UseNftStatePollingResult> = {}) {
        super();
        this.fetch = fetch as any;
        this.nftStatus = "confirmed";
        this.mock = jest.spyOn(useNftStatePolling, "default").mockReturnValue(this);
    }
}
