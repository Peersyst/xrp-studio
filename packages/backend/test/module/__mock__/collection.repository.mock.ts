import BaseMock from "./base.mock";
import CollectionMock from "./collection.mock";

class CollectionRepositoryMock extends BaseMock {
    getOne = jest.fn(() => new Promise((resolve) => resolve(new CollectionMock())));
    where = jest.fn(() => ({ getOne: this.getOne }));
    andWhere = jest.fn(() => ({ andWhere: this.andWhere, orderBy: this.orderBy }));
    skip = jest.fn();
    take = jest.fn();
    createQueryBuilder = jest.fn(() => ({
        where: this.where,
        innerJoinAndSelect: this.innerJoinAndSelect,
        loadRelationCountAndMap: this.loadRelationCountAndMap,
        getOne: this.getOne,
        andWhere: this.andWhere,
        orderBy: this.orderBy,
        take: this.take,
        skip: this.skip,
        getManyAndCount: this.getManyAndCount,
    }));
    innerJoinAndSelect = jest.fn(() => ({ where: this.where, innerJoinAndSelect: this.innerJoinAndSelect }));
    loadRelationCountAndMap = jest.fn(() => ({ where: this.where }));
    getManyAndCount = jest.fn(
        () =>
            new Promise((resolve) =>
                resolve([[new CollectionMock({ id: 1 }), new CollectionMock({ id: 2 }), new CollectionMock({ id: 3 })], 3]),
            ),
    );
    orderBy = jest.fn(() => ({ getManyAndCount: this.getManyAndCount }));
}

export default CollectionRepositoryMock;
