import BaseMock, { MockFnType } from "../base.mock";
import * as Genesys from "@peersyst/react-components";

export interface GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
    toastActive: boolean;
}

export class ToastMock extends BaseMock implements GenesysToastMock {
    hideToast: MockFnType;
    showToast: MockFnType;
    toastActive: boolean;
    constructor({ hideToast = jest.fn(), showToast = jest.fn(), toastActive = false }: Partial<GenesysToastMock> = {}) {
        super();
        this.showToast = showToast;
        this.hideToast = hideToast;
        this.toastActive = toastActive;
        jest.spyOn(Genesys, "useToast").mockReturnValue(this);
    }
}
