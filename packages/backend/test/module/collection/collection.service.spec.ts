import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionRepositoryMock from "../__mock__/collection.repository.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import CollectionMock from "../__mock__/collection.mock";
import { Collection } from "../../../src/database/entities/Collection";

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
        test("Collection does not exist", async () => {
            collectionRepositoryMock.getOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            const collection = await collectionService.findCollectionByTaxonAndAccount("1", "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2");
            expect(collection).toBeUndefined();
        });
    });
});
