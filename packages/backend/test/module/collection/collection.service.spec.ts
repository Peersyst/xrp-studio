import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionRepositoryMock from "../__mock__/collection.repository.mock";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import CollectionMock from "../__mock__/collection.mock";
import { Collection } from "../../../src/database/entities/Collection";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";
import { Order } from "../../../src/modules/common/types";
import { CollectionDto } from "../../../src/modules/collection/dto/collection.dto";
import { CreateCollectionRequest } from "../../../src/modules/collection/request/create-collection.request";
import { User } from "../../../src/database/entities/User";

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

    describe("createCollection", () => {
        const CREATE_COLLECTION_REQUEST: CreateCollectionRequest = {
            name: "COLLECTION_NAME",
            description: "COLLECTION_DESCRIPTION",
            image: "COLLECTION_IMAGE_URL",
            header: "COLLECTION_HEADER_URL",
        };
        const ADDRESS = "rwxmBgnEtpqAMerLSLkCCLfuSisi7GAvU6";

        const baseCreatedCollection: Omit<Collection, "taxon" | "id" | "nfts" | "createdAt" | "updatedAt"> = {
            ...CREATE_COLLECTION_REQUEST,
            user: new User({ address: ADDRESS }),
        };

        test("Creates collection with auto generated taxon with user having 0 collections", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "1" }]);
            const collection = await collectionService.createCollection(ADDRESS, CREATE_COLLECTION_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "1" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 1 }));
        });

        test("Creates collection with auto generated taxon with user having smallest missing taxon = 1", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "2" }]);
            const collection = await collectionService.createCollection(ADDRESS, CREATE_COLLECTION_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "2" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 2 }));
        });

        test("Creates collection with auto generated taxon with user having smallest missing taxon = 3", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "3" }]);
            const collection = await collectionService.createCollection(ADDRESS, CREATE_COLLECTION_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "3" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 3 }));
        });

        test("Throws NO_MORE_TAXONS_AVAILABLE when user has 4294967295 collections", async () => {
            collectionRepositoryMock.query.mockResolvedValue([]);
            await expect(async () => {
                await collectionService.createCollection(ADDRESS, CREATE_COLLECTION_REQUEST);
            }).rejects.toEqual(new BusinessException(ErrorCode.NO_MORE_TAXONS_AVAILABLE));
            expect(collectionRepositoryMock.save).not.toHaveBeenCalled();
            collectionRepositoryMock.query = new CollectionRepositoryMock().query;
        });

        test("Creates a collection with a given taxon not used by the account", async () => {
            const findCollectionByTaxonAndAccountMock = jest
                .spyOn(CollectionService.prototype, "findCollectionByTaxonAndAccount")
                .mockResolvedValue(undefined);
            const collection = await collectionService.createCollection(ADDRESS, { taxon: 25, ...CREATE_COLLECTION_REQUEST });
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "25" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 25 }));
            findCollectionByTaxonAndAccountMock.mockRestore();
        });

        test("Throws COLLECTION_TAXON_ALREADY_EXISTS error when creating a collection with a given taxon already used by the account", async () => {
            const findCollectionByTaxonAndAccountMock = jest
                .spyOn(CollectionService.prototype, "findCollectionByTaxonAndAccount")
                .mockResolvedValue(new CollectionMock({ taxon: "25" }));
            await expect(async () => {
                await collectionService.createCollection(ADDRESS, { taxon: 25, ...CREATE_COLLECTION_REQUEST });
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS));
            expect(collectionRepositoryMock.save).not.toHaveBeenCalled();
            findCollectionByTaxonAndAccountMock.mockRestore();
        });
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
            expect(collection).toEqual(CollectionDto.fromEntity(collectionMock));
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
