import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionRepositoryMock from "../__mock__/collection.repository.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import CollectionMock from "../__mock__/collection.mock";
import { Collection } from "../../../src/database/entities/Collection";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";

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
});
