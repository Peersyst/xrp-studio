import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionRepositoryMock from "../__mock__/collection.repository.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import CollectionMock from "../__mock__/collection.mock";
import { Collection } from "../../../src/database/entities/Collection";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";
import { Order } from "../../../src/modules/common/types";

describe("CollectionService", () => {
    let collectionService: CollectionService;
    const collectionRepositoryMock = new CollectionRepositoryMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Collection),
                    useValue: collectionRepositoryMock,
                },
                CollectionService,
            ],
        }).compile();
        collectionService = module.get(CollectionService);
        collectionRepositoryMock.clear();
    });

    describe("findCollectionByTaxonAndAccount", () => {
        test("Returns existing collection", async () => {
            const collection = await collectionService.findCollectionByTaxonAndAccount("1", "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2");
            expect(collection).toEqual(new CollectionMock());
        });
        test("Collection does not exist and notFoundError option is not set (does not throw error)", async () => {
            collectionRepositoryMock.getOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            const collection = await collectionService.findCollectionByTaxonAndAccount("1", "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2");
            expect(collection).toBeUndefined();
        });
        test("Collection does not exist and notFoundError option is set (throws error)", async () => {
            collectionRepositoryMock.getOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            await expect(async () => {
                await collectionService.findCollectionByTaxonAndAccount("1", "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2", { notFoundError: true });
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_NOT_FOUND));
        });
    });

    describe("findOne", () => {
        test("Finds existing collection", async () => {
            const collectionMock = new CollectionMock();
            collectionRepositoryMock.getOne.mockResolvedValueOnce(collectionMock);
            const collection = await collectionService.findOne(1);
            expect(collection).toEqual(collectionMock);
        });

        test("Does not find collection and throws COLLECTION_NOT_FOUND_ERROR", async () => {
            collectionRepositoryMock.getOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await collectionService.findOne(1);
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_NOT_FOUND));
        });
    });

    describe("findAll", () => {
        test("Returns all collections with a simple query", async () => {
            const collections = await collectionService.findAll();
            expect(collectionRepositoryMock.take).toHaveBeenCalledWith(15);
            expect(collectionRepositoryMock.skip).toHaveBeenCalledWith(0);
            expect(collectionRepositoryMock.orderBy).toHaveBeenCalledWith("collection.id", Order.DESC);
            expect(collections).toEqual({ items: expect.any(Array), pages: 1, currentPage: 1 });
        });

        test("Returns all collections with all optional params", async () => {
            const ACCOUNT = "rEyNeRJhWBBtHatF6yKoQRaYzwcy9bhCjY";
            const collections = await collectionService.findAll({
                page: 3,
                pageSize: 20,
                order: Order.ASC,
                query: "xyz",
                account: ACCOUNT,
            });
            expect(collectionRepositoryMock.take).toHaveBeenCalledWith(20);
            expect(collectionRepositoryMock.skip).toHaveBeenCalledWith(40);
            expect(collectionRepositoryMock.andWhere).toHaveBeenCalledWith("LOWER(collection.name) like :query", { query: "xyz" });
            expect(collectionRepositoryMock.andWhere).toHaveBeenCalledWith("user.address = :account", { account: ACCOUNT });
            expect(collectionRepositoryMock.orderBy).toHaveBeenCalledWith("collection.id", Order.ASC);
            expect(collections).toEqual({ items: expect.any(Array), pages: 1, currentPage: 3 });
        });
    });
});
