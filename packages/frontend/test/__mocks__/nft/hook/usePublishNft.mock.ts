import BaseMock from "../../base.mock";
import * as usePublishNft from "module/nft/hook/usePublishNft";

export class UsePublishNftMock extends BaseMock {
    publish: jest.Mock<Promise<void>>;
    startPolling: jest.Mock<Promise<string>>;
    endPolling: jest.Mock<void>;
    onPollingError: jest.Mock<void>;

    constructor() {
        super();
        this.publish = jest.fn();
        this.startPolling = jest.fn();
        this.endPolling = jest.fn();
        this.onPollingError = jest.fn();
        this.mock = jest.spyOn(usePublishNft, "default").mockReturnValue({
            publish: () => this.publish(),
            startPolling: () => this.startPolling(),
            endPolling: this.endPolling,
            isPolling: false,
            isPublishing: false,
            pollingError: null,
            onPollingError: this.onPollingError,
        });
    }
}
