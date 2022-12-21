import { NftService } from "../../../src/modules/nft/nft.service";
import { Test } from "@nestjs/testing";
import NftRepositoryMock from "../__mock__/nft.repository.mock";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../../src/database/entities/Nft";
import NFTokenMintTransactionMock from "../__mock__/nftokenmint-transaction.mock";
import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionServiceMock from "../__mock__/collection.service.mock";
import CollectionMock from "../__mock__/collection.mock";
import UserMock from "../__mock__/user.mock";
import NftMock from "../__mock__/nft.mock";
import { UpdateNftDraftRequest } from "../../../src/modules/nft/request/update-nft-draft-request";
import { User } from "../../../src/database/entities/User";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";
import { Order } from "../../../src/modules/common/types";
import XummServiceMock from "../__mock__/xumm.service.mock";
import { XummService } from "@peersyst/xumm-module";
import NftMetadataMock from "../__mock__/nft-metadata.mock";
import { MetadataService } from "../../../src/modules/metadata/metadata.service";
import { CreateMetadataRequest } from "../../../src/modules/metadata/request/create-metadata.request";
import MetadataServiceMock from "../__mock__/metadata.service.mock";
import { GetNftsRequest } from "../../../src/modules/nft/request/get-nfts.request";
import { FilterType, QueryBuilderHelper } from "../../../src/modules/common/util/query-builder.helper";
import { CollectionDto } from "../../../src/modules/collection/dto/collection.dto";
import { UserService } from "../../../src/modules/user/user.service";
import UserServiceMock from "../__mock__/user.service.mock";
import { BlockchainService } from "../../../src/modules/blockchain/blockchain.service";
import BlockchainServiceMock from "../__mock__/blockchain.service.mock";
import XummTransactionServiceMock from "../__mock__/xumm-transaction.service.mock";
import { XummTransactionService } from "../../../src/modules/xumm/xumm-transaction.service";
import BlockchainTransactionServiceMock from "../__mock__/blockchain-transaction.service.mock";
import { BlockchainTransactionService } from "../../../src/modules/blockchain/blockchain-transaction.service";

describe("NftService", () => {
    const ADDRESS = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2";
    const ISSUER = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf3";

    let nftService: NftService;
    const metadataServiceMock = new MetadataServiceMock();
    const nftRepositoryMock = new NftRepositoryMock();
    const collectionServiceMock = new CollectionServiceMock();
    const xummServiceMock = new XummServiceMock();
    const userServiceMock = new UserServiceMock();
    const blockchainServiceMock = new BlockchainServiceMock();
    const blockchainTransactionServiceMock = new BlockchainTransactionServiceMock();
    const xummTransactionServiceMock = new XummTransactionServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Nft),
                    useValue: nftRepositoryMock,
                },
                {
                    provide: MetadataService,
                    useValue: metadataServiceMock,
                },
                {
                    provide: CollectionService,
                    useValue: collectionServiceMock,
                },
                {
                    provide: XummService,
                    useValue: xummServiceMock,
                },
                {
                    provide: XummService,
                    useValue: xummServiceMock,
                },
                {
                    provide: UserService,
                    useValue: userServiceMock,
                },
                {
                    provide: BlockchainService,
                    useValue: blockchainServiceMock,
                },
                {
                    provide: BlockchainTransactionService,
                    useValue: blockchainTransactionServiceMock,
                },
                {
                    provide: XummTransactionService,
                    useValue: xummTransactionServiceMock,
                },
                NftService,
            ],
        }).compile();
        nftService = module.get(NftService);
        metadataServiceMock.clear();
        nftRepositoryMock.clear();
        collectionServiceMock.clear();
        xummServiceMock.clear();
        blockchainServiceMock.clear();
    });

    describe("createNftFromMintTransaction", () => {
        test("Creates an NFT with an NFTokenMint transaction with just the required fields. Does not queue metadata", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock();
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toEqual(nftMintTransaction.Account);
            expect(nft.transferFee).toBeUndefined();
            expect(nft.flags).toEqual(0);
            expect(nft.uri).toBeUndefined();
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.account).toEqual(nftMintTransaction.Account);
            expect(nft.collection).toBeUndefined();

            expect(metadataServiceMock.sendToProcessMetadata).not.toHaveBeenCalled();
        });

        test("Creates an NFT with a complete NFTokenMint transaction. Queues metadata", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock({
                NFTokenTaxon: 2,
                Issuer: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
                TransferFee: 100,
                Flags: 1,
                URI: "596F75206D757374206265207265616C6C7920626F72656420746F206465636F64652074686973203A29",
            });
            const collection = new CollectionMock({ id: 1, taxon: "2", user: new UserMock({ address: nftMintTransaction.Account }) });
            collectionServiceMock.findOne.mockReturnValueOnce(new Promise((resolve) => resolve(CollectionDto.fromEntity(collection))));
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.tokenId).toEqual("0008000A65880702C56031DC90384A905E59F581F8D825677CB38DD00000153F");
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toEqual(nftMintTransaction.Issuer);
            expect(nft.transferFee).toEqual(100);
            expect(nft.flags).toEqual(1);
            expect(nft.uri).toEqual(nftMintTransaction.URI);
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.account).toEqual(nftMintTransaction.Issuer);
            expect(nft.collectionId).toEqual(1);

            expect(metadataServiceMock.sendToProcessMetadata).toHaveBeenCalledWith(nft);
        });

        test("Creates an NFT with an NFTokenMint transaction with URI bigger than 256 bytes. Does not queue metadata", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock({ URI: "".padStart(257, "F") });
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.tokenId).toEqual("0008000A65880702C56031DC90384A905E59F581F8D825677CB38DD00000153F");
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toEqual(nftMintTransaction.Account);
            expect(nft.transferFee).toBeUndefined();
            expect(nft.flags).toEqual(0);
            expect(nft.uri).toBeUndefined();
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.account).toEqual(nftMintTransaction.Account);
            expect(nft.collection).toBeUndefined();

            expect(metadataServiceMock.sendToProcessMetadata).not.toHaveBeenCalled();
        });

        test("Creates an NFT with new collection", async () => {
            collectionServiceMock.findOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            const nftMintTransaction = new NFTokenMintTransactionMock({
                NFTokenTaxon: 3,
            });
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.tokenId).toEqual("0008000A65880702C56031DC90384A905E59F581F8D825677CB38DD00000153F");
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.account).toEqual(nftMintTransaction.Account);
        });

        test("Creates a users' first NFT", async () => {
            nftRepositoryMock.getRawOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            const nftMintTransaction = new NFTokenMintTransactionMock();
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);
            expect(nft.tokenId).toEqual("0008000A65880702C56031DC90384A905E59F581F8D825677CB38DD00000153F");
        });

        test("An error is thrown with the intended nft", async () => {
            nftRepositoryMock.save.mockReturnValueOnce(new Promise((resolve, reject) => reject("Error")));
            const nftMintTransaction = new NFTokenMintTransactionMock();
            await expect(async () => {
                await nftService.createNftFromMintTransaction(nftMintTransaction);
            }).rejects.toEqual({
                error: "Error",
                tokenId: "0008000A65880702C56031DC90384A905E59F581F8D825677CB38DD00000153F",
            } as any);
        });

        describe("Draft publishing", () => {
            test("An id is included in the Memo but is not a valid number. Nft repository is not queried", async () => {
                const nftMintTransaction = new NFTokenMintTransactionMock({
                    Memos: [{ Memo: { MemoData: Buffer.from(JSON.stringify({ id: "NaN" }), "utf8").toString("hex") } }],
                });

                await nftService.createNftFromMintTransaction(nftMintTransaction);
                expect(nftRepositoryMock.getOne).not.toHaveBeenCalled();
                expect(nftRepositoryMock.save).not.toHaveBeenLastCalledWith(expect.objectContaining({ id: expect.any(Number) }));
            });

            test("An id is included in the Memo but it does not belong to a draft from that address. A new Nft is created", async () => {
                nftRepositoryMock.getOne.mockResolvedValueOnce(undefined);

                const nftMintTransaction = new NFTokenMintTransactionMock({
                    Memos: [{ Memo: { MemoData: Buffer.from(JSON.stringify({ id: 1 }), "utf8").toString("hex") } }],
                });

                await nftService.createNftFromMintTransaction(nftMintTransaction);
                expect(nftRepositoryMock.getOne).toHaveBeenCalled();
                expect(nftRepositoryMock.save).not.toHaveBeenLastCalledWith(expect.objectContaining({ id: expect.any(Number) }));
            });

            test("An id is included in the Memo and it is valid, thus the existing draft is updated", async () => {
                nftRepositoryMock.getOne.mockResolvedValueOnce(new NftMock({ metadata: new NftMetadataMock() }));

                const nftMintTransaction = new NFTokenMintTransactionMock({
                    Memos: [{ Memo: { MemoData: Buffer.from(JSON.stringify({ id: 1 }), "utf8").toString("hex") } }],
                });

                const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);
                expect(nftRepositoryMock.save).toHaveBeenLastCalledWith(expect.objectContaining({ id: 1 }));
                expect(nft.id).toEqual(1);
            });
        });
    });

    describe("createNftDraft", () => {
        test("Creates an NFT draft without issuer, transferFee, collection or metadata and publish = true", async () => {
            const publishMock = jest.spyOn(nftService, "publishDraft").mockImplementation(jest.fn());
            await nftService.createNftDraft(ADDRESS, {}, true);
            expect(metadataServiceMock.create).not.toHaveBeenCalled();
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                account: ADDRESS,
                ownerAccount: ADDRESS,
                issuer: ADDRESS,
                flags: 0,
                status: NftStatus.DRAFT,
            });
            expect(publishMock).toHaveBeenCalledWith(expect.any(Number), ADDRESS);
        });

        test("Creates an NFT draft with issuer and transferFee without collection or metadata", async () => {
            await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10 });
            expect(metadataServiceMock.create).not.toHaveBeenCalled();
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                account: ADDRESS,
                ownerAccount: ADDRESS,
                issuer: ISSUER,
                flags: 0,
                status: NftStatus.DRAFT,
                transferFee: 10,
            });
        });

        test("Creates an NFT draft with issuer, transferFee and an existing collection without metadata", async () => {
            await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10, taxon: 1 });
            expect(metadataServiceMock.create).not.toHaveBeenCalled();
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                account: ADDRESS,
                ownerAccount: ADDRESS,
                issuer: ISSUER,
                flags: 0,
                status: NftStatus.DRAFT,
                collectionId: 1,
                transferFee: 10,
            });
        });

        test("Creates an NFT draft with issuer, transferFee, an existing collection and metadata without attributes", async () => {
            const metadata: CreateMetadataRequest = { name: "metadata_name", description: "metadata_description" };
            await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10, taxon: 1, metadata });
            expect(metadataServiceMock.create).toHaveBeenCalledWith(1, metadata);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                account: ADDRESS,
                ownerAccount: ADDRESS,
                issuer: ISSUER,
                flags: 0,
                status: NftStatus.DRAFT,
                collectionId: 1,
                transferFee: 10,
            });
        });

        test("Creates an NFT draft with issuer, transferFee, an existing collection and metadata with attributes", async () => {
            const metadata: CreateMetadataRequest = {
                name: "metadata_name",
                description: "metadata_description",
                attributes: [{ traitType: "eyes", value: "closed" }],
            };
            await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10, taxon: 1, metadata });
            expect(metadataServiceMock.create).toHaveBeenCalledWith(1, metadata);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                account: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
                ownerAccount: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
                collectionId: 1,
                flags: 0,
                issuer: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf3",
                status: "draft",
                transferFee: 10,
            });
        });
    });

    describe("updateNftDraft", () => {
        beforeAll(() => {
            nftRepositoryMock.findOne.mockResolvedValue(new NftMock({ status: NftStatus.DRAFT }));
        });
        afterAll(() => {
            nftRepositoryMock.findOne = new NftRepositoryMock().findOne;
        });

        test("Update nft draft with an empty object and publish = true", async () => {
            const publishMock = jest.spyOn(nftService, "publishDraft").mockImplementation(jest.fn());
            await nftService.updateNftDraft(1, ADDRESS, {}, true);
            expect(collectionServiceMock.findOne).not.toHaveBeenCalled();
            expect(nftRepositoryMock.update).toHaveBeenCalledWith(
                { id: 1 },
                {
                    issuer: ADDRESS,
                },
            );
            expect(publishMock).toHaveBeenCalledWith(1, ADDRESS);
        });

        test("Update nft draft with an issuer, transferFee, flags and taxon", async () => {
            await nftService.updateNftDraft(1, ADDRESS, {
                issuer: ISSUER,
                transferFee: 10,
                flags: { burnable: true, transferable: true, trustLine: false, onlyXRP: false },
                taxon: 1,
            });
            expect(collectionServiceMock.findOne).toHaveBeenCalledWith({ taxon: "1", account: ADDRESS });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith(
                { id: 1 },
                {
                    issuer: ISSUER,
                    transferFee: 10000,
                    flags: 9,
                    collectionId: 1,
                },
            );
        });

        test("Update nft draft with an issuer, transferFee, flags, taxon and empty metadata", async () => {
            const metadata: UpdateNftDraftRequest["metadata"] = {};

            await nftService.updateNftDraft(1, ADDRESS, {
                issuer: ISSUER,
                transferFee: 10,
                flags: { burnable: true, transferable: true, trustLine: false, onlyXRP: false },
                taxon: 1,
                metadata,
            });
            expect(collectionServiceMock.findOne).toHaveBeenCalledWith({ taxon: "1", account: ADDRESS });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith(
                { id: 1 },
                {
                    issuer: ISSUER,
                    transferFee: 10000,
                    flags: 9,
                    collectionId: 1,
                },
            );
            expect(metadataServiceMock.delete).toHaveBeenCalledWith(1);
        });

        test("Update nft draft with an issuer, transferFee, flags, taxon and metadata", async () => {
            const metadata: UpdateNftDraftRequest["metadata"] = {
                name: "Name",
                description: "Description",
                image: "imageUrl",
                backgroundColor: "#FFFFFF",
                externalUrl: "externalUrl",
                attributes: [{ traitType: "eyes", value: "closed" }],
            };

            await nftService.updateNftDraft(1, ADDRESS, {
                issuer: ISSUER,
                transferFee: 10,
                flags: { burnable: true, transferable: true, trustLine: false, onlyXRP: false },
                taxon: 1,
                metadata,
            });
            expect(collectionServiceMock.findOne).toHaveBeenCalledWith({ taxon: "1", account: ADDRESS });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith(
                { id: 1 },
                {
                    issuer: ISSUER,
                    transferFee: 10000,
                    flags: 9,
                    collectionId: 1,
                },
            );
            expect(metadataServiceMock.create).toHaveBeenCalledWith(1, metadata, true);
        });
    });

    describe("publishDraftById", () => {
        test("A draft is published and signed", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const metadataMock = new NftMetadataMock({ nftId: 1, externalUrl: "externalUrl" });
            const collectionMock = new CollectionMock();
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.DRAFT,
                user: userMock,
                metadata: metadataMock,
                collection: collectionMock,
                issuer: ISSUER,
                transferFee: 100,
            });
            jest.spyOn(nftRepositoryMock, "findOne").mockReturnValue(Promise.resolve(nftMock));

            await nftService.publishDraft(1, ADDRESS);

            expect(metadataServiceMock.publishMetadata).toHaveBeenCalledWith(1);
            expect(xummTransactionServiceMock.sendTransactionRequest).toHaveBeenCalledWith(
                ADDRESS,
                expect.any(Object),
                expect.any(Function),
            );
            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.PENDING });
            expect(nftRepositoryMock.update).toHaveBeenCalledTimes(1);
        });

        test("A draft is published without metadata or collection and rejected", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.DRAFT,
                user: userMock,
            });
            nftRepositoryMock.findOne.mockResolvedValue(nftMock);
            xummTransactionServiceMock.sendTransactionRequest.mockImplementation(async (address, tx, onFailed) => await onFailed());

            await nftService.publishDraft(1, ADDRESS);

            expect(metadataServiceMock.publishMetadata).not.toHaveBeenCalled();
            expect(xummTransactionServiceMock.sendTransactionRequest).toHaveBeenCalledWith(
                ADDRESS,
                expect.any(Object),
                expect.any(Function),
            );
            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.PENDING });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.FAILED });
        });

        test("A draft is published without metadata or collection and expired", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.DRAFT,
                user: userMock,
            });
            nftRepositoryMock.findOne.mockResolvedValue(nftMock);
            xummTransactionServiceMock.sendTransactionRequest.mockImplementation(async (address, tx, onFailed) => await onFailed());

            await nftService.publishDraft(1, ADDRESS);

            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.FAILED });
        });

        test("The draft to publish is not found and throws NFT_DRAFT_NOT_FOUND", async () => {
            nftRepositoryMock.findOne.mockResolvedValueOnce(undefined);

            await expect(async () => {
                await nftService.publishDraft(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_NOT_FOUND));
        });

        test("The draft to publish is not owned by the user with the address provided and throws NFT_DRAFT_NOT_OWNED", async () => {
            const userMock = new UserMock({ address: ISSUER });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.DRAFT,
                user: userMock,
            });
            nftRepositoryMock.findOne.mockResolvedValueOnce(nftMock);

            await expect(async () => {
                await nftService.publishDraft(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_NOT_FOUND));
        });

        test("The draft to publish has status pending", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.PENDING,
                user: userMock,
            });
            nftRepositoryMock.findOne.mockResolvedValueOnce(nftMock);

            await expect(async () => {
                await nftService.publishDraft(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_NOT_FOUND));
        });
    });

    describe("findOne", () => {
        test("Returns existing Nft", async () => {
            const nft = await nftService.findOne(1);
            expect(nft).toBeDefined();
        });

        test("Throws NFT_NOT_FOUND error", async () => {
            nftRepositoryMock.findOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await nftService.findOne(1);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_NOT_FOUND));
        });
    });

    describe("findOneDraft", () => {
        test("Returns existing Nft draft from its owner account", async () => {
            nftRepositoryMock.findOne.mockResolvedValueOnce(new NftMock({ status: NftStatus.DRAFT, user: new User({ address: ADDRESS }) }));
            const nft = await nftService.findOne(1, { ownerAddress: ADDRESS, status: [NftStatus.DRAFT] });
            expect(nft).toBeDefined();
        });
        test("Throws NFT_DRAFT_NOT_OWNED error", async () => {
            nftRepositoryMock.findOne.mockResolvedValueOnce(new NftMock({ user: new User({ address: ISSUER }) }));
            await expect(async () => {
                await nftService.findOne(1, { ownerAddress: ADDRESS, status: [NftStatus.DRAFT] });
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_NOT_FOUND));
        });
        test("Throws NFT_DRAFT_NOT_FOUND error", async () => {
            nftRepositoryMock.findOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await nftService.findOne(1, { ownerAddress: ADDRESS });
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_NOT_FOUND));
        });
    });

    describe("findAll", () => {
        test("Returns all NFTs with a simple query", async () => {
            const queryBuilderHelper = jest
                .spyOn(QueryBuilderHelper, "buildFindManyAndCount")
                .mockReturnValue(Promise.resolve([[new NftMock()], 1]));
            const nfts = await nftService.findAll();
            expect(queryBuilderHelper).toHaveBeenCalledWith(
                nftRepositoryMock,
                "nft",
                0,
                15,
                ["metadata", "metadata.attributes"],
                [
                    {
                        field: "nft.status",
                        operator: "=",
                        value: "confirmed",
                    },
                ],
                [{ field: "nft.updated_at", type: "DESC", nullsPosition: "NULLS LAST" }],
            );
            expect(nfts).toEqual({ items: expect.any(Array), pages: 1, currentPage: 1 });
        });
        test("Returns all NFTs with all optional params", async () => {
            const req = new GetNftsRequest();
            req.page = 2;
            req.pageSize = 10;
            req.order = Order.ASC;
            req.query = "asd";
            req.collections = [1];
            req.account = ADDRESS;
            req.status = [NftStatus.CONFIRMED];
            const queryBuilderHelper = jest
                .spyOn(QueryBuilderHelper, "buildFindManyAndCount")
                .mockReturnValue(Promise.resolve([[new NftMock()], 1]));
            const nfts = await nftService.findAll(req, ISSUER);
            expect(queryBuilderHelper).toHaveBeenCalledWith(
                nftRepositoryMock,
                "nft",
                10,
                10,
                ["metadata", "metadata.attributes", "collection", "user"],
                [
                    { field: "collection.id", operator: FilterType.IN, value: [1] },
                    { field: "user.address", operator: FilterType.EQUAL, value: ISSUER },
                    { field: "owner_account", operator: FilterType.EQUAL, value: ADDRESS },
                    { field: "metadata.name", operator: FilterType.LIKE, value: "asd" },
                    { field: "nft.status", operator: FilterType.IN, value: [NftStatus.CONFIRMED] },
                ],
                [{ field: "nft.updated_at", type: "ASC", nullsPosition: "NULLS LAST" }],
            );
            expect(nfts).toEqual({ items: expect.any(Array), pages: 1, currentPage: 2 });
        });
    });

    describe("getNftDraftsStatus", () => {
        test("Gets draft statuses correctly", async () => {
            nftRepositoryMock.getMany.mockResolvedValueOnce([
                new NftMock({ id: 1, status: NftStatus.DRAFT }),
                new NftMock({ id: 2, status: NftStatus.PENDING }),
                new NftMock({ id: 3, status: NftStatus.DRAFT }),
            ]);
            const statuses = await nftService.getNftDraftsStatus([1, 2, 3], ADDRESS);
            expect(statuses).toEqual([
                { id: 1, status: NftStatus.DRAFT },
                { id: 2, status: NftStatus.PENDING },
                { id: 3, status: NftStatus.DRAFT },
            ]);
        });
    });
});
