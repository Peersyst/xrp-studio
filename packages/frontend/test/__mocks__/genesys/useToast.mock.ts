import BaseMock, { MockFnType } from "../base.mock";
import * as Genesys from "@peersyst/react-components";

export interface GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
}

export class ToastMock extends BaseMock implements GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
    constructor({ hideToast = jest.fn(), showToast = jest.fn() }: Partial<GenesysToastMock> = {}) {
        super();
        this.showToast = showToast;
        this.hideToast = hideToast;
        jest.spyOn(Genesys, "useToast").mockReturnValue(this);
    }
}
