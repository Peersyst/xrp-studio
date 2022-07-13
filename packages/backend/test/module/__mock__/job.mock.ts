import BaseMock from "./base.mock";

class JobMock extends BaseMock {
    finished = jest.fn(() => new Promise((resolve) => resolve(true)));
}

export default JobMock;
