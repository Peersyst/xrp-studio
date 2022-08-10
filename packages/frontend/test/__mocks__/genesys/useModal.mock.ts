import BaseMock, { MockFnType } from "../base.mock";

export interface GenesysModalMock {
    showModal: MockFnType;
    hideModal: MockFnType;
    isModalActive: MockFnType;
}

export class ModalMock extends BaseMock implements GenesysModalMock {
    showModal: MockFnType;
    hideModal: MockFnType;
    isModalActive: MockFnType;
    constructor({ showModal = jest.fn(), hideModal = jest.fn(), isModalActive = jest.fn() }: Partial<GenesysModalMock>) {
        super();
        this.hideModal = hideModal;
        this.showModal = showModal;
        this.isModalActive = isModalActive;
    }
}
