import { NftService } from "../../../src/modules/nft/nft.service";
import { Test } from "@nestjs/testing";
import NftRepositoryMock from "../__mock__/nft.repository.mock";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../../src/database/entities/Nft";
import NFTokenMintTransactionMock from "../__mock__/nftokenmint-transaction.mock";
import { convertStringToHex, decodeAccountID, parseNFTokenID } from "xrpl";
import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionServiceMock from "../__mock__/collection.service.mock";
import CollectionMock from "../__mock__/collection.mock";
import UserMock from "../__mock__/user.mock";
import MetadataConsumerMock from "../__mock__/metadata.consumer.mock";
import NftMock from "../__mock__/nft.mock";
import MetadataDtoMock from "../__mock__/metadata.dto.mock";
import { NftMetadataAttribute } from "../../../src/database/entities/NftMetadataAttribute";
import { NftMetadata } from "../../../src/database/entities/NftMetadata";
import { MetadataDto } from "../../../src/modules/nft/dto/metadata.dto";
import unscrambleTaxon from "../../../src/modules/nft/util/unscrambleTaxon";
import { NftDraftDto } from "../../../src/modules/nft/dto/nft-draft.dto";
import { CreateNftMetadataRequest } from "../../../src/modules/nft/request/create-nft-metadata.request";
import NftMetadataRepositoryMock from "../__mock__/nft-metadata.repository.mock";
import NftMetadataAttributeRepositoryMock from "../__mock__/nft-metadata-attribute.repository.mock";
import { UpdateNftDraftRequest } from "../../../src/modules/nft/request/update-nft-draft-request";
import { User } from "../../../src/database/entities/User";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";
import { Order } from "../../../src/modules/common/types";
import { NftDraftStatus } from "../../../src/modules/nft/request/get-nft-drafts.request";
import XummServiceMock from "../__mock__/xumm.service.mock";
import { XummService } from "@peersyst/xumm-module";
import IpfsServiceMock from "../__mock__/ipfs.service.mock";
import NftMetadataMock from "../__mock__/nft-metadata.mock";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";

describe("NftService", () => {
    const ADDRESS = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2";
    const ISSUER = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf3";

    let nftService: NftService;
    const nftRepositoryMock = new NftRepositoryMock();
    const nftMetadataRepositoryMock = new NftMetadataRepositoryMock();
    const nftMetadataAttributeRepositoryMock = new NftMetadataAttributeRepositoryMock();
    const metadataConsumerMock = new MetadataConsumerMock();
    const collectionServiceMock = new CollectionServiceMock();
    const xummServiceMock = new XummServiceMock();
    const ipfsServiceMock = new IpfsServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Nft),
                    useValue: nftRepositoryMock,
                },
                {
                    provide: getRepositoryToken(NftMetadata),
                    useValue: nftMetadataRepositoryMock,
                },
                {
                    provide: getRepositoryToken(NftMetadataAttribute),
                    useValue: nftMetadataAttributeRepositoryMock,
                },
                {
                    provide: "BullQueue_metadata",
                    useValue: metadataConsumerMock,
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
                    provide: IpfsService,
                    useValue: ipfsServiceMock,
                },
                NftService,
            ],
        }).compile();
        nftService = module.get(NftService);
        nftRepositoryMock.clear();
        nftMetadataRepositoryMock.clear();
        nftMetadataAttributeRepositoryMock.clear();
        metadataConsumerMock.clear();
        collectionServiceMock.clear();
        xummServiceMock.clear();
        ipfsServiceMock.clear();
    });

    describe("createNftFromMintTransaction", () => {
        test("Creates an NFT with an NFTokenMint transaction with just the required fields. Does not queue metadata", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock();
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            const nftokenId =
                "00000000" +
                decodeAccountID(nftMintTransaction.Account).toString("hex").toUpperCase() +
                unscrambleTaxon(0, 2).toString(16).toUpperCase().padStart(8, "0") +
                "00000002";

            expect(nft.tokenId).toEqual(nftokenId);
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toEqual(nftMintTransaction.Account);
            expect(nft.transferFee).toBeUndefined();
            expect(nft.flags).toEqual(0);
            expect(nft.uri).toBeUndefined();
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.user.address).toEqual(nftMintTransaction.Account);
            expect(nft.collection).toBeUndefined();

            //Token id is generated correctly
            const parsedTokenId = parseNFTokenID(nftokenId);
            expect(parsedTokenId.Flags).toEqual(0);
            expect(parsedTokenId.Flags).toEqual(0);
            expect(parsedTokenId.Issuer).toEqual(nftMintTransaction.Account);
            expect(parsedTokenId.Taxon).toEqual(0);
            expect(parsedTokenId.Sequence).toEqual(2);

            expect(metadataConsumerMock.add).not.toHaveBeenCalled();
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
            collectionServiceMock.findCollectionByTaxonAndAccount.mockReturnValueOnce(new Promise((resolve) => resolve(collection)));
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.tokenId).toEqual(
                "00010064" +
                    decodeAccountID(nftMintTransaction.Issuer).toString("hex").toUpperCase() +
                    unscrambleTaxon(2, 2).toString(16).toUpperCase().padStart(8, "0") +
                    "00000002",
            );
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toEqual(nftMintTransaction.Issuer);
            expect(nft.transferFee).toEqual(100);
            expect(nft.flags).toEqual(1);
            expect(nft.uri).toEqual(nftMintTransaction.URI);
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.user.address).toEqual(nftMintTransaction.Account);
            expect(nft.collection.user.address).toEqual(collection.user.address);
            expect(nft.collection.taxon).toEqual(collection.taxon);

            expect(metadataConsumerMock.add).toHaveBeenCalledWith("process-metadata", { nft }, expect.any(Object));
        });

        test("Creates an NFT with an NFTokenMint transaction with URI bigger than 256 bytes. Does not queue metadata", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock({ URI: "".padStart(257, "F") });
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.tokenId).toEqual(
                "00000000" +
                    decodeAccountID(nftMintTransaction.Account).toString("hex").toUpperCase() +
                    unscrambleTaxon(0, 2).toString(16).toUpperCase().padStart(8, "0") +
                    "00000002",
            );
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toEqual(nftMintTransaction.Account);
            expect(nft.transferFee).toBeUndefined();
            expect(nft.flags).toEqual(0);
            expect(nft.uri).toBeUndefined();
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.user.address).toEqual(nftMintTransaction.Account);
            expect(nft.collection).toBeUndefined();

            expect(metadataConsumerMock.add).not.toHaveBeenCalled();
        });

        test("Creates an NFT with new collection", async () => {
            collectionServiceMock.findCollectionByTaxonAndAccount.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            const nftMintTransaction = new NFTokenMintTransactionMock({
                NFTokenTaxon: 3,
            });
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.tokenId).toEqual(
                "00000000" +
                    decodeAccountID(nftMintTransaction.Account).toString("hex").toUpperCase() +
                    unscrambleTaxon(3, 2).toString(16).toUpperCase().padStart(8, "0") +
                    "00000002",
            );
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.user.address).toEqual(nftMintTransaction.Account);
            expect(nft.collection.user.address).toEqual(nftMintTransaction.Account);
            expect(nft.collection.taxon).toEqual(nftMintTransaction.NFTokenTaxon.toString());
        });

        test("Creates a users' first NFT", async () => {
            nftRepositoryMock.getRawOne.mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
            const nftMintTransaction = new NFTokenMintTransactionMock();
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);

            expect(nft.tokenId).toEqual(
                "00000000" +
                    decodeAccountID(nftMintTransaction.Account).toString("hex").toUpperCase() +
                    unscrambleTaxon(0, 0).toString(16).toUpperCase().padStart(8, "0") +
                    "00000000",
            );
        });

        test("An error is thrown with the intended nft", async () => {
            nftRepositoryMock.save.mockReturnValueOnce(new Promise((resolve, reject) => reject("Error")));
            const nftMintTransaction = new NFTokenMintTransactionMock();

            await expect(async () => {
                await nftService.createNftFromMintTransaction(nftMintTransaction);
            }).rejects.toEqual({
                error: "Error",
                nft: expect.any(Object),
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

    describe("createNftMetadata", () => {
        test("Creates metadata with attributes", async () => {
            const nft = new NftMock();
            const metadataDto = new MetadataDtoMock();
            const { attributes: metadataDtoAttributes, ...restMetadataDto } = metadataDto;
            const metadataAttributes = metadataDtoAttributes.map(
                (attribute) => new NftMetadataAttribute({ nftMetadataId: nft.id, ...attribute }),
            );
            const nftMetadata = new NftMetadata({ ...restMetadataDto, attributes: metadataAttributes, nft });
            const nftWithMetadata = new NftMock({ metadata: nftMetadata });
            await nftService.createNftMetadata(nft, metadataDto);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith(nftWithMetadata);
        });

        test("Creates metadata without attributes", async () => {
            const nft = new NftMock();
            const metadataDto = new MetadataDtoMock({ attributes: undefined });
            delete metadataDto["attributes"];
            const nftMetadata = new NftMetadata({ ...(metadataDto as Omit<MetadataDto, "attributes">), nft });
            const nftWithMetadata = new NftMock({ metadata: nftMetadata });
            await nftService.createNftMetadata(nft, metadataDto);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith(nftWithMetadata);
        });

        test("Overrides draft metadata", async () => {
            const nft = new NftMock({ metadata: new NftMetadataMock() });
            const metadataDto = new MetadataDtoMock();
            const { attributes: metadataDtoAttributes, ...restMetadataDto } = metadataDto;
            const metadataAttributes = metadataDtoAttributes.map(
                (attribute) => new NftMetadataAttribute({ nftMetadataId: nft.id, ...attribute }),
            );
            const nftMetadata = new NftMetadata({ ...restMetadataDto, attributes: metadataAttributes, nft });
            const nftWithMetadata = new NftMock({ metadata: nftMetadata });
            await nftService.createNftMetadata(nft, metadataDto);
            expect(nftMetadataRepositoryMock.delete).toHaveBeenCalledWith({ nft: new Nft({ id: nft.id }) });
            expect(nftRepositoryMock.save).toHaveBeenCalledWith(nftWithMetadata);
        });
    });

    describe("createNftDraft", () => {
        test("Creates an NFT draft without issuer, transferFee, collection or metadata and publish = true", async () => {
            const nftDraft = await nftService.createNftDraft(ADDRESS, {}, true);
            expect(nftDraft).toEqual({
                id: 1,
                issuer: ADDRESS,
                flags: 0,
                status: NftStatus.DRAFT,
                user: new User({ address: ADDRESS }),
            } as NftDraftDto);
            expect(xummServiceMock.transactionRequestAndSubscribe).toHaveBeenCalledWith(
                ADDRESS,
                expect.objectContaining({ TransactionType: "NFTokenMint" }),
            );
        });

        test("Creates an NFT draft with issuer and transferFee without collection or metadata", async () => {
            const nftDraft = await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10 });
            expect(nftDraft).toEqual({
                id: 1,
                issuer: ISSUER,
                transferFee: 10,
                flags: 0,
                status: NftStatus.DRAFT,
                user: new User({ address: ADDRESS }),
            } as NftDraftDto);
        });

        test("Creates an NFT draft with issuer, transferFee and an existing collection without metadata", async () => {
            const nftDraft = await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10, taxon: 1 });
            expect(nftDraft).toEqual({
                id: 1,
                issuer: ISSUER,
                transferFee: 10,
                flags: 0,
                status: NftStatus.DRAFT,
                user: { address: ADDRESS },
                collection: { id: 1, taxon: "1", items: 2, user: new User({ address: ADDRESS }) },
            } as NftDraftDto);
        });

        test("Creates an NFT draft with issuer, transferFee, an existing collection and metadata without attributes", async () => {
            const metadata: CreateNftMetadataRequest = { name: "metadata_name", description: "metadata_description" };

            const nftDraft = await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10, taxon: 1, metadata });
            expect(nftDraft).toEqual({
                id: 1,
                issuer: ISSUER,
                transferFee: 10,
                flags: 0,
                status: NftStatus.DRAFT,
                user: { address: ADDRESS },
                collection: { id: 1, taxon: "1", items: 2, user: new User({ address: ADDRESS }) },
                metadata,
            } as NftDraftDto);
        });

        test("Creates an NFT draft with issuer, transferFee, an existing collection and metadata with attributes", async () => {
            const metadata: CreateNftMetadataRequest = {
                name: "metadata_name",
                description: "metadata_description",
                attributes: [{ traitType: "eyes", value: "closed" }],
            };

            const nftDraft = await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10, taxon: 1, metadata });
            expect(nftDraft).toEqual({
                id: 1,
                issuer: ISSUER,
                transferFee: 10,
                flags: 0,
                status: NftStatus.DRAFT,
                user: { address: ADDRESS },
                collection: { id: 1, taxon: "1", items: 2, user: new User({ address: ADDRESS }) },
                metadata,
            } as NftDraftDto);
        });
    });

    describe("updateNftDraft", () => {
        beforeAll(() => {
            nftRepositoryMock.getOne.mockResolvedValue(new NftMock({ status: NftStatus.DRAFT }));
        });
        afterAll(() => {
            nftRepositoryMock.getOne = new NftRepositoryMock().getOne;
        });

        test("Update nft draft with an empty object and publish = true", async () => {
            await nftService.updateNftDraft(1, ADDRESS, {}, true);
            expect(collectionServiceMock.findCollectionByTaxonAndAccount).not.toHaveBeenCalled();
            expect(nftMetadataRepositoryMock.delete).toHaveBeenCalledTimes(1);
            expect(nftMetadataAttributeRepositoryMock.delete).not.toHaveBeenCalled();
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                id: 1,
                issuer: ADDRESS,
                transferFee: null,
                flags: undefined,
                collection: null,
                metadata: undefined,
            });
            expect(xummServiceMock.transactionRequestAndSubscribe).toHaveBeenCalledWith(
                ADDRESS,
                expect.objectContaining({ TransactionType: "NFTokenMint" }),
            );
        });

        test("Update nft draft with an issuer, transferFee, flags and taxon", async () => {
            await nftService.updateNftDraft(1, ADDRESS, {
                issuer: ISSUER,
                transferFee: 10,
                flags: { burnable: true, transferable: true, trustLine: false, onlyXRP: false },
                taxon: 1,
            });
            expect(collectionServiceMock.findCollectionByTaxonAndAccount).toHaveBeenCalledWith("1", ADDRESS, { notFoundError: true });
            expect(nftMetadataRepositoryMock.delete).toHaveBeenCalledTimes(1);
            expect(nftMetadataAttributeRepositoryMock.delete).not.toHaveBeenCalled();
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                id: 1,
                issuer: ISSUER,
                transferFee: 10000,
                flags: 9,
                collection: new CollectionMock(),
                metadata: undefined,
            });
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
            expect(collectionServiceMock.findCollectionByTaxonAndAccount).toHaveBeenCalledWith("1", ADDRESS, { notFoundError: true });
            expect(nftMetadataRepositoryMock.delete).not.toHaveBeenCalled();
            expect(nftMetadataAttributeRepositoryMock.delete).toHaveBeenCalledTimes(1);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                id: 1,
                issuer: ISSUER,
                transferFee: 10000,
                flags: 9,
                collection: new CollectionMock(),
                metadata: new NftMetadata({
                    name: null,
                    description: null,
                    image: null,
                    backgroundColor: null,
                    externalUrl: null,
                    attributes: undefined,
                    nft: new Nft({ id: 1 }),
                }),
            });
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
            expect(collectionServiceMock.findCollectionByTaxonAndAccount).toHaveBeenCalledWith("1", ADDRESS, { notFoundError: true });
            expect(nftMetadataRepositoryMock.delete).not.toHaveBeenCalled();
            expect(nftMetadataAttributeRepositoryMock.delete).toHaveBeenCalledTimes(1);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith({
                id: 1,
                issuer: ISSUER,
                transferFee: 10000,
                flags: 9,
                collection: new CollectionMock(),
                metadata: new NftMetadata({
                    ...metadata,
                    attributes: [new NftMetadataAttribute({ nftMetadataId: 1, traitType: "eyes", value: "closed" })],
                    nft: new Nft({ id: 1 }),
                }),
            });
        });
    });

    describe("publishDraftById", () => {
        test("A draft is published and signed", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const metadataMock = new NftMetadataMock({ externalUrl: "externalUrl" });
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
            nftRepositoryMock.getOne.mockResolvedValueOnce(nftMock);

            await nftService.publishDraftById(1, ADDRESS);

            expect(ipfsServiceMock.uploadFile).toHaveBeenCalledWith(
                Buffer.from(
                    JSON.stringify({
                        name: metadataMock.name,
                        description: metadataMock.description,
                        image: metadataMock.image,
                        backgroundColor: metadataMock.backgroundColor,
                        externalUrl: metadataMock.externalUrl,
                        attributes: metadataMock.attributes,
                    }),
                ),
            );
            expect(xummServiceMock.transactionRequestAndSubscribe).toHaveBeenCalledWith(ADDRESS, {
                TransactionType: "NFTokenMint",
                Account: ADDRESS,
                NFTokenTaxon: Number(nftMock.collection.taxon),
                Flags: 0,
                Memos: [
                    {
                        Memo: {
                            MemoData: Buffer.from(JSON.stringify({ id: nftMock.id }), "utf8").toString("hex"),
                        },
                    },
                ],
                Issuer: nftMock.issuer,
                TransferFee: nftMock.transferFee,
                URI: convertStringToHex("ipfs://" + ipfsServiceMock.CID_MOCK),
            });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.PENDING });
            await xummServiceMock.websocket.onmessage({ data: '{"signed": true}' });
            expect(nftRepositoryMock.update).toHaveBeenCalledTimes(1);
            expect(xummServiceMock.websocket.close).toHaveBeenCalled();
        });

        test("A draft is published without metadata or collection and rejected", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.DRAFT,
                user: userMock,
            });
            nftRepositoryMock.getOne.mockResolvedValueOnce(nftMock);

            await nftService.publishDraftById(1, ADDRESS);

            expect(ipfsServiceMock.uploadFile).not.toHaveBeenCalled();
            expect(xummServiceMock.transactionRequestAndSubscribe).toHaveBeenCalledWith(ADDRESS, {
                TransactionType: "NFTokenMint",
                Account: ADDRESS,
                NFTokenTaxon: 0,
                Flags: 0,
                Memos: [
                    {
                        Memo: {
                            MemoData: Buffer.from(JSON.stringify({ id: nftMock.id }), "utf8").toString("hex"),
                        },
                    },
                ],
            });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.PENDING });
            await xummServiceMock.websocket.onmessage({ data: '{"signed": false}' });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.FAILED });
            expect(xummServiceMock.websocket.close).toHaveBeenCalled();
        });

        test("A draft is published without metadata or collection and expired", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.DRAFT,
                user: userMock,
            });
            nftRepositoryMock.getOne.mockResolvedValueOnce(nftMock);

            await nftService.publishDraftById(1, ADDRESS);

            await xummServiceMock.websocket.onmessage({ data: '{"expired": true}' });
            expect(nftRepositoryMock.update).toHaveBeenCalledWith({ id: nftMock.id }, { status: NftStatus.FAILED });
            expect(xummServiceMock.websocket.close).toHaveBeenCalled();
        });

        test("The draft to publish is not found and throws NFT_DRAFT_NOT_FOUND", async () => {
            nftRepositoryMock.getOne.mockResolvedValueOnce(undefined);

            await expect(async () => {
                await nftService.publishDraftById(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_DRAFT_NOT_FOUND));
        });

        test("The draft to publish is not owned by the user with the address provided and throws NFT_DRAFT_NOT_OWNED", async () => {
            const userMock = new UserMock({ address: ISSUER });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.DRAFT,
                user: userMock,
            });
            nftRepositoryMock.getOne.mockResolvedValueOnce(nftMock);

            await expect(async () => {
                await nftService.publishDraftById(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_DRAFT_NOT_OWNED));
        });

        test("The draft to publish has status pending", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            const nftMock = new NftMock({
                id: 1,
                status: NftStatus.PENDING,
                user: userMock,
            });
            nftRepositoryMock.getOne.mockResolvedValueOnce(nftMock);

            await expect(async () => {
                await nftService.publishDraftById(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_DRAFT_ALREADY_PUBLISHED));
        });
    });

    describe("findOne", () => {
        test("Returns existing Nft", async () => {
            const nft = await nftService.findOne(1);
            expect(nft).toBeDefined();
        });

        test("Throws NFT_NOT_FOUND error", async () => {
            nftRepositoryMock.getOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await nftService.findOne(1);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_NOT_FOUND));
        });
    });

    describe("findOneDraft", () => {
        test("Returns existing Nft draft from its owner account", async () => {
            nftRepositoryMock.getOne.mockResolvedValueOnce(new NftMock({ status: NftStatus.DRAFT, user: new User({ address: ADDRESS }) }));
            const nft = await nftService.findOneDraft(1, ADDRESS);
            expect(nft).toBeDefined();
        });
        test("Throws NFT_DRAFT_NOT_OWNED error", async () => {
            nftRepositoryMock.getOne.mockResolvedValueOnce(new NftMock({ user: new User({ address: ISSUER }) }));
            await expect(async () => {
                await nftService.findOneDraft(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_DRAFT_NOT_OWNED));
        });
        test("Throws NFT_DRAFT_NOT_FOUND error", async () => {
            nftRepositoryMock.getOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await nftService.findOneDraft(1, ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.NFT_DRAFT_NOT_FOUND));
        });
    });

    describe("findAll", () => {
        test("Returns all NFTs with a simple query", async () => {
            const nfts = await nftService.findAll();
            expect(nftRepositoryMock.take).toHaveBeenCalledWith(15);
            expect(nftRepositoryMock.skip).toHaveBeenCalledWith(0);
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("nft.status = :confirmed", { confirmed: NftStatus.CONFIRMED });
            expect(nftRepositoryMock.orderBy).toHaveBeenCalledWith("nft.id", Order.DESC);
            expect(nfts).toEqual({ items: expect.any(Array), pages: 1, currentPage: 1 });
        });
        test("Returns all NFTs with all optional params", async () => {
            const nfts = await nftService.findAll({
                page: 2,
                pageSize: 10,
                order: Order.ASC,
                query: "asd",
                collection: 1,
                account: ADDRESS,
            });
            expect(nftRepositoryMock.take).toHaveBeenCalledWith(10);
            expect(nftRepositoryMock.skip).toHaveBeenCalledWith(10);
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith(
                "LOWER(collection.name) like :query OR LOWER(metadata.name) like :query",
                { query: "asd" },
            );
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("collection.id = :collection", { collection: 1 });
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("nft.status = :confirmed", { confirmed: NftStatus.CONFIRMED });
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("user.address = :account", { account: ADDRESS });
            expect(nftRepositoryMock.orderBy).toHaveBeenCalledWith("nft.id", Order.ASC);
            expect(nfts).toEqual({ items: expect.any(Array), pages: 1, currentPage: 2 });
        });
    });
    describe("findAllDrafts", () => {
        beforeEach(() => {
            nftRepositoryMock.getManyAndCount.mockResolvedValueOnce([
                [
                    new NftMock({ id: 1, status: NftStatus.DRAFT }),
                    new NftMock({ id: 2, status: NftStatus.DRAFT }),
                    new NftMock({ id: 3, status: NftStatus.DRAFT }),
                ],
                3,
            ]);
        });
        test("Returns all NFT drafts with a simple query", async () => {
            const nfts = await nftService.findAllDrafts(ADDRESS);
            expect(nftRepositoryMock.take).toHaveBeenCalledWith(15);
            expect(nftRepositoryMock.skip).toHaveBeenCalledWith(0);
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("user.address = :address", { address: ADDRESS });
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("nft.status != :confirmed", { confirmed: NftStatus.CONFIRMED });
            expect(nftRepositoryMock.orderBy).toHaveBeenCalledWith("nft.id", Order.DESC);
            expect(nfts).toEqual({ items: expect.any(Array), pages: 1, currentPage: 1 });
        });
        test("Returns all NFTs with all optional params", async () => {
            const nfts = await nftService.findAllDrafts(ADDRESS, {
                page: 2,
                pageSize: 10,
                order: Order.ASC,
                query: "asd",
                collection: 1,
                status: NftDraftStatus.DRAFT,
            });
            expect(nftRepositoryMock.take).toHaveBeenCalledWith(10);
            expect(nftRepositoryMock.skip).toHaveBeenCalledWith(10);
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith(
                "LOWER(collection.name) like :query OR LOWER(metadata.name) like :query",
                { query: "asd" },
            );
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("collection.id = :collection", { collection: 1 });
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("user.address = :address", { address: ADDRESS });
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("nft.status != :confirmed", { confirmed: NftStatus.CONFIRMED });
            expect(nftRepositoryMock.andWhere).toHaveBeenCalledWith("nft.status = :status", { status: NftStatus.DRAFT });
            expect(nftRepositoryMock.orderBy).toHaveBeenCalledWith("nft.id", Order.ASC);
            expect(nfts).toEqual({ items: expect.any(Array), pages: 1, currentPage: 2 });
        });
    });

    describe("getNftDraftStatus", () => {
        let findOneDraftMock: jest.SpyInstance;
        beforeAll(() => {
            findOneDraftMock = jest.spyOn(NftService.prototype, "findOneDraft").mockResolvedValue(new NftMock({ status: NftStatus.DRAFT }));
        });
        afterAll(() => {
            findOneDraftMock.mockRestore();
        });

        test("Returns a draft status correctly", async () => {
            const status = await nftService.getNftDraftStatus(1, ADDRESS);
            expect(status).toEqual(NftStatus.DRAFT);
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
