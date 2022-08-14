import BaseMock from "../base.mock";

export interface BaseReturnXummReactMockType {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export class XummReactBaseReturnMock extends BaseMock implements BaseReturnXummReactMockType {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    constructor({ isLoading = false, isSuccess = false, isError = false }: Partial<BaseReturnXummReactMockType> = {}) {
        super();
        this.isLoading = isLoading;
        this.isSuccess = isSuccess;
        this.isError = isError;
    }
}
