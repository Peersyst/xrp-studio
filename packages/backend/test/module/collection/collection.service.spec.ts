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
import UserMock from "../__mock__/user.mock";
import { UpdateCollectionRequest } from "../../../src/modules/collection/request/update-collection.request";
import { NftService } from "../../../src/modules/nft/nft.service";
import NftServiceMock from "../__mock__/nft.service.mock";
import { GetNftsRequest } from "../../../src/modules/nft/request/get-nfts.request";

describe("CollectionService", () => {
    const ACCOUNT = "rwxmBgnEtpqAMerLSLkCCLfuSisi7GAvU6";

    let collectionService: CollectionService;
    const collectionRepositoryMock = new CollectionRepositoryMock();
    const nftServiceMock = new NftServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Collection),
                    useValue: collectionRepositoryMock,
                },
                {
                    provide: NftService,
                    useValue: nftServiceMock,
                },
                CollectionService,
            ],
        }).compile();
        collectionService = module.get(CollectionService);
        collectionRepositoryMock.clear();
        nftServiceMock.clear();
        nftServiceMock.clear();
    });

    describe("createCollection", () => {
        const CREATE_COLLECTION_REQUEST: CreateCollectionRequest = {
            name: "COLLECTION_NAME",
            description: "COLLECTION_DESCRIPTION",
            image: "COLLECTION_IMAGE_URL",
            header: "COLLECTION_HEADER_URL",
        };

        const CREATE_COLLECTRION_WITH_NFTS_REQUEST: CreateCollectionRequest = {
            ...CREATE_COLLECTION_REQUEST,
            nfts: [{ metadata: { name: "NFT #1" } }, { metadata: { name: "NFT #2" } }, { metadata: { name: "NFT #3" } }],
        };

        const baseCreatedCollection: Omit<Collection, "taxon" | "id" | "nfts" | "createdAt" | "updatedAt"> = {
            ...CREATE_COLLECTION_REQUEST,
            user: new User({ address: ACCOUNT }),
        };

        test("Creates collection with auto generated taxon with user having 0 collections", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "1" }]);
            const collection = await collectionService.createCollection(ACCOUNT, CREATE_COLLECTION_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "1" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 1 }));
        });

        test("Creates collection with auto generated taxon with user having smallest missing taxon = 1", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "2" }]);
            const collection = await collectionService.createCollection(ACCOUNT, CREATE_COLLECTION_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "2" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 2 }));
        });

        test("Creates collection with auto generated taxon with user having smallest missing taxon = 3", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "3" }]);
            const collection = await collectionService.createCollection(ACCOUNT, CREATE_COLLECTION_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "3" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 3 }));
        });

        test("Throws NO_MORE_TAXONS_AVAILABLE when user has 4294967295 collections", async () => {
            collectionRepositoryMock.query.mockResolvedValue([]);
            await expect(async () => {
                await collectionService.createCollection(ACCOUNT, CREATE_COLLECTION_REQUEST);
            }).rejects.toEqual(new BusinessException(ErrorCode.NO_MORE_TAXONS_AVAILABLE));
            expect(collectionRepositoryMock.save).not.toHaveBeenCalled();
            collectionRepositoryMock.query = new CollectionRepositoryMock().query;
        });

        test("Creates a collection with a given taxon not used by the account", async () => {
            const findCollectionByTaxonAndAccountMock = jest
                .spyOn(CollectionService.prototype, "findCollectionByTaxonAndAccount")
                .mockResolvedValue(undefined);
            const collection = await collectionService.createCollection(ACCOUNT, { taxon: 25, ...CREATE_COLLECTION_REQUEST });
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "25" });
            expect(collection).toEqual(expect.objectContaining({ taxon: 25 }));
            findCollectionByTaxonAndAccountMock.mockRestore();
        });

        test("Throws COLLECTION_TAXON_ALREADY_EXISTS error when creating a collection with a given taxon already used by the account", async () => {
            const findCollectionByTaxonAndAccountMock = jest
                .spyOn(CollectionService.prototype, "findCollectionByTaxonAndAccount")
                .mockResolvedValue(new CollectionMock({ taxon: "25" }));
            await expect(async () => {
                await collectionService.createCollection(ACCOUNT, { taxon: 25, ...CREATE_COLLECTION_REQUEST });
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS));
            expect(collectionRepositoryMock.save).not.toHaveBeenCalled();
            findCollectionByTaxonAndAccountMock.mockRestore();
        });

        test("Creates collection with nft drafts", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "1" }]);
            await collectionService.createCollection(ACCOUNT, CREATE_COLLECTRION_WITH_NFTS_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "1" });
            expect(nftServiceMock.createNftDraft).toHaveBeenCalledWith(
                ACCOUNT,
                {
                    ...CREATE_COLLECTRION_WITH_NFTS_REQUEST.nfts[0],
                    taxon: 1,
                },
                undefined,
            );
        });

        test("Creates collection with published nfts", async () => {
            collectionRepositoryMock.query.mockResolvedValueOnce([{ missing_taxon: "1" }]);
            await collectionService.createCollection(ACCOUNT, CREATE_COLLECTRION_WITH_NFTS_REQUEST, true);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "1" });
            expect(nftServiceMock.createNftDraft).toHaveBeenCalledWith(
                ACCOUNT,
                {
                    ...CREATE_COLLECTRION_WITH_NFTS_REQUEST.nfts[0],
                    taxon: 1,
                },
                true,
            );
        });
    });

    describe("updateCollection", () => {
        const collectionMock = new CollectionMock();

        let findCollectionByTaxonAndAccountMock: jest.SpyInstance;
        beforeAll(() => {
            findCollectionByTaxonAndAccountMock = jest
                .spyOn(CollectionService.prototype, "findOwnedCollection")
                .mockResolvedValue(collectionMock);
        });

        afterAll(() => {
            findCollectionByTaxonAndAccountMock.mockRestore();
        });

        test("Updates collection with new values", async () => {
            const updateCollectionRequest: UpdateCollectionRequest = {
                name: "NEW_NAME",
                description: "NEW_DESCRIPTION",
                image: "NEW_IMAGE_URL",
                header: "NEW_HEADER_URL",
            };
            await collectionService.updateCollection(1, ACCOUNT, updateCollectionRequest);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...collectionMock, ...updateCollectionRequest });
        });

        test("Updates collection with null values", async () => {
            await collectionService.updateCollection(1, ACCOUNT, { name: "NEW_NAME" });
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({
                ...collectionMock,
                name: "NEW_NAME",
                description: null,
                image: null,
                header: null,
            });
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
            const req = new GetNftsRequest();
            req.page = 3;
            req.pageSize = 20;
            req.order = Order.ASC;
            req.query = "xyz";
            req.account = ACCOUNT;
            const collections = await collectionService.findAll(req);
            expect(collectionRepositoryMock.take).toHaveBeenCalledWith(20);
            expect(collectionRepositoryMock.skip).toHaveBeenCalledWith(40);
            expect(collectionRepositoryMock.andWhere).toHaveBeenCalledWith("LOWER(collection.name) like :query", { query: "%xyz%" });
            expect(collectionRepositoryMock.andWhere).toHaveBeenCalledWith("user.address = :account", { account: ACCOUNT });
            expect(collectionRepositoryMock.orderBy).toHaveBeenCalledWith("collection.id", Order.ASC);
            expect(collections).toEqual({ items: expect.any(Array), pages: 1, currentPage: 3 });
        });
    });

    describe("findOwnedCollection", () => {
        test("Collection exists and is owned by account", async () => {
            const collectionMock = new CollectionMock({ id: 21, taxon: "50", user: new UserMock({ address: ACCOUNT }) });
            collectionRepositoryMock.getOne.mockResolvedValueOnce(collectionMock);
            const collection = await collectionService.findOwnedCollection(21, ACCOUNT);
            expect(collection).toEqual(collectionMock);
        });

        test("Collection does not exist and throws COLLECTION_NOT_FOUND error", async () => {
            collectionRepositoryMock.getOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await collectionService.findOwnedCollection(21, ACCOUNT);
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_NOT_FOUND));
        });

        test("Collection exists but is not owned by the account", async () => {
            const collectionMock = new CollectionMock({
                id: 21,
                taxon: "50",
                user: new UserMock({ address: "rTgjigngbTMDRf7dgjdWUPXrP7WgvkCsv" }),
            });
            collectionRepositoryMock.getOne.mockResolvedValueOnce(collectionMock);
            await expect(async () => {
                await collectionService.findOwnedCollection(21, ACCOUNT);
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_NOT_OWNED));
        });
    });
});
