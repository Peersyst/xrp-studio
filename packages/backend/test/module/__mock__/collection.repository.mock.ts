import BaseMock from "./base.mock";
import CollectionMock from "./collection.mock";

class CollectionRepositoryMock extends BaseMock {
    getOne = jest.fn(() => new Promise((resolve) => resolve(new CollectionMock())));
    where = jest.fn(() => ({ getOne: this.getOne }));
    createQueryBuilder = jest.fn(() => ({ where: this.where }));
}

export default CollectionRepositoryMock;
