import BaseMock, { MockFnType } from "../base.mock";

export interface GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
}

export class ToastMock extends BaseMock implements GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
    constructor({ hideToast = jest.fn(), showToast = jest.fn() }: Partial<GenesysToastMock>) {
        super();
        this.showToast = showToast;
        this.hideToast = hideToast;
    }
}
