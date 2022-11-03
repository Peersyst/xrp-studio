import BaseMock from "../base.mock";

export class useCollectionCreationStateMock extends BaseMock {
    useCollectionCreationState = jest.fn();

    constructor() {
        super();
        this.mock = jest.mock("module/collection/hook/useCollectionCreationState", () => {
            return this.useCollectionCreationState();
        });
    }
}
