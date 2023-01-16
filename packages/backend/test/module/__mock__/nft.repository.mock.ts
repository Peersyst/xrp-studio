import BaseMock from "./base.mock";
import { Nft } from "../../../src/database/entities/Nft";
import NftMock from "./nft.mock";

class NftRepositoryMock extends BaseMock {
    save = jest.fn(
        ({ collection, metadata, id = 1, ...restNft }: Partial<Nft>) =>
            new Promise((resolve) =>
                resolve({
                    id,
                    ...restNft,
                    ...(collection && { collection: { ...collection, id: collection.id || 1 } }),
                    ...(metadata && {
                        metadata: {
                            ...metadata,
                            nft: metadata.nft || { id, ...restNft },
                            ...(metadata.attributes && {
                                attributes: metadata.attributes.map((attribute) => ({
                                    ...attribute,
                                    nftMetadataId: attribute.nftMetadataId || id,
                                })),
                            }),
                        },
                    }),
                }),
            ),
    );
    getRawOne = jest.fn(() => new Promise((resolve) => resolve({ token_id: "00000001" })));
    orderBy = jest.fn(() => ({ getRawOne: this.getRawOne, getManyAndCount: this.getManyAndCount }));
    where = jest.fn(() => ({ orderBy: this.orderBy, getOne: this.getOne, getMany: this.getMany }));
    select = jest.fn(() => ({ where: this.where }));
    getOne = jest.fn(() => new Promise((resolve) => resolve(new NftMock())));
    getManyAndCount = jest.fn(
        () => new Promise((resolve) => resolve([[new NftMock({ id: 1 }), new NftMock({ id: 2 }), new NftMock({ id: 3 })], 3])),
    );
    andWhere = jest.fn(() => ({ andWhere: this.andWhere, orderBy: this.orderBy }));
    skip = jest.fn();
    take = jest.fn();
    innerJoinAndSelect = jest.fn(() => ({
        leftJoinAndSelect: this.leftJoinAndSelect,
        where: this.where,
        leftJoinAndMapMany: this.leftJoinAndMapMany,
    }));
    leftJoinAndSelect = jest.fn(() => ({
        leftJoinAndSelect: this.leftJoinAndSelect,
        take: this.take,
        where: this.where,
        getOne: this.getOne,
        andWhere: this.andWhere,
        orderBy: this.orderBy,
        skip: this.skip,
        getManyAndCount: this.getManyAndCount,
        leftJoinAndMapMany: this.leftJoinAndMapMany,
    }));
    leftJoinAndMapMany = jest.fn(() => ({
        leftJoinAndSelect: this.leftJoinAndSelect,
        take: this.take,
        where: this.where,
        getOne: this.getOne,
        andWhere: this.andWhere,
        orderBy: this.orderBy,
        skip: this.skip,
        getManyAndCount: this.getManyAndCount,
    }));
    loadRelationCountAndMap = jest.fn(() => ({
        where: this.where,
        leftJoinAndSelect: this.leftJoinAndSelect,
        leftJoinAndMapMany: this.leftJoinAndMapMany,
    }));
    createQueryBuilder = jest.fn(() => ({
        select: this.select,
        innerJoinAndSelect: this.innerJoinAndSelect,
        leftJoinAndSelect: this.leftJoinAndSelect,
        leftJoinAndMapMany: this.leftJoinAndMapMany,
        take: this.take,
        where: this.where,
        getOne: this.getOne,
        andWhere: this.andWhere,
        orderBy: this.orderBy,
        skip: this.skip,
        getManyAndCount: this.getManyAndCount,
        loadRelationCountAndMap: this.loadRelationCountAndMap,
    }));
    update = jest.fn();
    getMany = jest.fn(() => new Promise((resolve) => resolve([new NftMock({ id: 1 }), new NftMock({ id: 2 }), new NftMock({ id: 3 })])));
    findOne = jest.fn(() => new Promise((resolve) => resolve(new NftMock())));
    delete = jest.fn();
}

export default NftRepositoryMock;
