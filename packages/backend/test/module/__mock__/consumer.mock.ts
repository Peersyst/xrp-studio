import JobMock from "./job.mock";
import BaseMock from "./base.mock";

class ConsumerMock extends BaseMock {
    add = jest.fn(() => new Promise((resolve) => resolve(new JobMock())));
    empty = jest.fn();
    clean = jest.fn();
}

export default ConsumerMock;
