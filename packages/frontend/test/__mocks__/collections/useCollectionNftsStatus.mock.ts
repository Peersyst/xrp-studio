import BaseMock from "../base.mock";
import { UseCollectionNftsStatusResult } from "module/collection/hook/useCollectionNftsStatus";
import * as UseCollectionNftsStatus from "module/collection/hook/useCollectionNftsStatus";

export class UseCollectionNftsStatusMock extends BaseMock implements UseCollectionNftsStatusResult {
    fetch: jest.Mock;
    pendingIds: number[];
    failedIds: number[];

    constructor({ fetch = jest.fn(), pendingIds = [], failedIds = [] }: Partial<UseCollectionNftsStatusResult> = {}) {
        super();
        this.fetch = fetch as any;
        this.pendingIds = pendingIds;
        this.failedIds = failedIds;
        this.mock = jest.spyOn(UseCollectionNftsStatus, "default").mockReturnValue(this);
    }
}
