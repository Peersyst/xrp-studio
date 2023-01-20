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
import UserMock from "../__mock__/user.mock";
import { UpdateCollectionRequest } from "../../../src/modules/collection/request/update-collection.request";
import { NftService } from "../../../src/modules/nft/nft.service";
import NftServiceMock from "../__mock__/nft.service.mock";
import { GetNftsRequest } from "../../../src/modules/nft/request/get-nfts.request";
import { QueryBuilderHelper } from "../../../src/modules/common/util/query-builder.helper";
import * as random from "../../../src/modules/common/util/random";
import UserServiceMock from "../__mock__/user.service.mock";
import { UserService } from "../../../src/modules/user/user.service";

describe("CollectionService", () => {
    const ACCOUNT = "rwxmBgnEtpqAMerLSLkCCLfuSisi7GAvU6";

    let collectionService: CollectionService;
    const collectionRepositoryMock = new CollectionRepositoryMock();
    const nftServiceMock = new NftServiceMock();
    const userServiceMock = new UserServiceMock();

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
                {
                    provide: UserService,
                    useValue: userServiceMock,
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
            taxon: 1,
            nfts: [{ metadata: { name: "NFT #1" } }, { metadata: { name: "NFT #2" } }, { metadata: { name: "NFT #3" } }],
        };

        const user = new UserMock({ address: ACCOUNT });
        const baseCreatedCollection: Omit<Collection, "user" | "taxon" | "id" | "nfts" | "createdAt" | "updatedAt"> = {
            ...CREATE_COLLECTION_REQUEST,
            path: `${CREATE_COLLECTION_REQUEST.name}_by_${user.name}`,
            account: user.address,
            items: 0,
        };

        test("Creates collection with auto generated taxon with user having smallest missing taxon = 1", async () => {
            collectionRepositoryMock.findOne.mockResolvedValueOnce(undefined);
            jest.spyOn(random, "getRandomNumber").mockReturnValue(1234);
            await collectionService.createCollection(ACCOUNT, CREATE_COLLECTION_REQUEST);
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({
                ...baseCreatedCollection,
                taxon: "1234",
            });
        });

        test("Creates a collection with a given taxon not used by the account", async () => {
            const findCollectionByTaxonAndAccountMock = jest.spyOn(CollectionService.prototype, "findOne").mockResolvedValue(undefined);
            await collectionService.createCollection(ACCOUNT, { taxon: 25, ...CREATE_COLLECTION_REQUEST });
            expect(collectionRepositoryMock.save).toHaveBeenCalledWith({ ...baseCreatedCollection, taxon: "25" });
            findCollectionByTaxonAndAccountMock.mockRestore();
        });

        test("Throws COLLECTION_TAXON_ALREADY_EXISTS error when creating a collection with a given taxon already used by the account", async () => {
            const findCollectionByTaxonAndAccountMock = jest
                .spyOn(CollectionService.prototype, "findOne")
                .mockResolvedValue(CollectionDto.fromEntity(new CollectionMock({ taxon: "25" })));
            await expect(async () => {
                await collectionService.createCollection(ACCOUNT, { taxon: 25, ...CREATE_COLLECTION_REQUEST });
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_TAXON_ALREADY_EXISTS));
            expect(collectionRepositoryMock.save).not.toHaveBeenCalled();
            findCollectionByTaxonAndAccountMock.mockRestore();
        });

        test("Creates collection with nft drafts", async () => {
            collectionRepositoryMock.findOne.mockResolvedValueOnce(undefined);
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
            collectionRepositoryMock.findOne.mockResolvedValueOnce(undefined);
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
        const collectionMock = new CollectionMock({
            user: new UserMock({ address: ACCOUNT }),
        });

        let findCollectionByTaxonAndAccountMock: jest.SpyInstance;
        beforeAll(() => {
            findCollectionByTaxonAndAccountMock = jest
                .spyOn(CollectionService.prototype, "findOne")
                .mockResolvedValue(CollectionDto.fromEntity(collectionMock));
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
            expect(collectionRepositoryMock.update).toHaveBeenCalledWith(1, {
                ...updateCollectionRequest,
                path: `${updateCollectionRequest.name}_by_${collectionMock.user.name}`,
            });
        });

        test("Updates collection with null values", async () => {
            await collectionService.updateCollection(1, ACCOUNT, { name: "NEW_NAME" });
            expect(collectionRepositoryMock.update).toHaveBeenCalledWith(1, {
                name: "NEW_NAME",
                description: null,
                image: null,
                header: null,
                path: `NEW_NAME_by_${collectionMock.user.name}`,
            });
        });
    });

    describe("find collection By Taxon And Account", () => {
        test("Returns existing collection", async () => {
            const collection = await collectionService.findOne({ taxon: "1", account: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2" });
            expect(collection).toEqual(CollectionDto.fromEntity(new CollectionMock()));
        });
        test("Collection does not exist and notFoundError option is set (throws error)", async () => {
            collectionRepositoryMock.findOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            await expect(async () => {
                await collectionService.findOne({ taxon: "1", account: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2" });
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_NOT_FOUND));
        });
    });

    describe("findOne", () => {
        test("Finds existing collection", async () => {
            const collectionMock = new CollectionMock();
            collectionRepositoryMock.findOne.mockResolvedValueOnce(collectionMock);
            const collection = await collectionService.findOne({ id: 1 });
            expect(collection).toEqual(CollectionDto.fromEntity(collectionMock));
        });

        test("Does not find collection and throws COLLECTION_NOT_FOUND_ERROR", async () => {
            collectionRepositoryMock.findOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await collectionService.findOne({ id: 1 });
            }).rejects.toEqual(new BusinessException(ErrorCode.COLLECTION_NOT_FOUND));
        });
    });

    describe("findAll", () => {
        test("Returns all collections with a simple query", async () => {
            const queryBuilderSpy = jest
                .spyOn(QueryBuilderHelper, "buildFindManyAndCount")
                .mockReturnValue(Promise.resolve([[new CollectionMock()], 1]));
            const collections = await collectionService.findAll();
            expect(queryBuilderSpy).toHaveBeenCalledWith(
                collectionRepositoryMock,
                "collection",
                0,
                15,
                ["user"],
                [],
                [{ field: "collection.updated_at", type: "DESC", nullsPosition: "NULLS LAST" }],
            );
            expect(collections).toEqual({ items: expect.any(Array), pages: 1, currentPage: 1 });
        });

        test("Returns all collections with all optional params", async () => {
            const queryBuilderSpy = jest
                .spyOn(QueryBuilderHelper, "buildFindManyAndCount")
                .mockReturnValue(Promise.resolve([[new CollectionMock()], 1]));
            const req = new GetNftsRequest();
            req.page = 3;
            req.pageSize = 20;
            req.order = Order.ASC;
            req.query = "xyz";
            req.account = ACCOUNT;
            const collections = await collectionService.findAll(req);
            expect(queryBuilderSpy).toHaveBeenCalledWith(
                collectionRepositoryMock,
                "collection",
                40,
                20,
                ["user"],
                [
                    { field: "account", operator: "=", value: "rwxmBgnEtpqAMerLSLkCCLfuSisi7GAvU6" },
                    { field: "collection.name", operator: "LIKE", value: "xyz" },
                ],
                [{ field: "collection.updated_at", type: "ASC", nullsPosition: "NULLS LAST" }],
            );
            expect(collections).toEqual({ items: expect.any(Array), pages: 1, currentPage: 3 });
        });
    });
});
