import { NftService } from "../../../src/modules/nft/nft.service";
import { Test } from "@nestjs/testing";
import NftRepositoryMock from "../__mock__/nft.repository.mock";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../../src/database/entities/Nft";
import NFTokenMintTransactionMock from "../__mock__/nftokenmint-transaction.mock";
import { decodeAccountID, parseNFTokenID } from "xrpl";
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

describe("NftService", () => {
    let nftService: NftService;
    const nftRepositoryMock = new NftRepositoryMock();
    const nftMetadataRepositoryMock = new NftMetadataRepositoryMock();
    const nftMetadataAttributeRepositoryMock = new NftMetadataAttributeRepositoryMock();
    const metadataConsumerMock = new MetadataConsumerMock();
    const collectionServiceMock = new CollectionServiceMock();

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
                NftService,
            ],
        }).compile();
        nftService = module.get(NftService);
        nftRepositoryMock.clear();
        nftMetadataRepositoryMock.clear();
        nftMetadataAttributeRepositoryMock.clear();
        metadataConsumerMock.clear();
        collectionServiceMock.clear();
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
            const nftMintTransaction = new NFTokenMintTransactionMock({ URI: "".padStart(256, "F") });
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
                    unscrambleTaxon(0, 1).toString(16).toUpperCase().padStart(8, "0") +
                    "00000001",
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
    });

    describe("createNftMetadata", () => {
        test("Creates metadata with attributes", () => {
            const nft = new NftMock();
            const metadataDto = new MetadataDtoMock();
            const { attributes: metadataDtoAttribtues, ...restMetadataDto } = metadataDto;
            const metadataAttributes = metadataDtoAttribtues.map(
                (attribute) => new NftMetadataAttribute({ nftMetadataId: nft.id, ...attribute }),
            );
            const nftMetadata = new NftMetadata({ ...restMetadataDto, attributes: metadataAttributes, nft });
            const nftWithMetadata = new NftMock({ metadata: nftMetadata });
            nftService.createNftMetadata(nft, metadataDto);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith(nftWithMetadata);
        });

        test("Creates metadata without attributes", () => {
            const nft = new NftMock();
            const metadataDto = new MetadataDtoMock({ attributes: undefined });
            delete metadataDto["attributes"];
            const nftMetadata = new NftMetadata({ ...(metadataDto as Omit<MetadataDto, "attributes">), nft });
            const nftWithMetadata = new NftMock({ metadata: nftMetadata });
            nftService.createNftMetadata(nft, metadataDto);
            expect(nftRepositoryMock.save).toHaveBeenCalledWith(nftWithMetadata);
        });
    });

    describe("createNftDraft", () => {
        const ADDRESS = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2";
        const ISSUER = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf3";

        test("Creates an NFT draft without issuer, transferFee, collection or metadata", async () => {
            const nftDraft = await nftService.createNftDraft(ADDRESS, {});
            expect(nftDraft).toEqual({ id: 1, issuer: ADDRESS, flags: 0, status: NftStatus.DRAFT, account: ADDRESS } as NftDraftDto);
        });

        test("Creates an NFT draft with issuer and transferFee without collection or metadata", async () => {
            const nftDraft = await nftService.createNftDraft(ADDRESS, { issuer: ISSUER, transferFee: 10 });
            expect(nftDraft).toEqual({
                id: 1,
                issuer: ISSUER,
                transferFee: 10,
                flags: 0,
                status: NftStatus.DRAFT,
                account: ADDRESS,
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
                account: ADDRESS,
                collectionId: 1,
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
                account: ADDRESS,
                collectionId: 1,
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
                account: ADDRESS,
                collectionId: 1,
                metadata,
            } as NftDraftDto);
        });
    });

    describe("updateNftDraft", () => {
        const ADDRESS = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2";
        const ISSUER = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf3";

        test("Update nft draft with an empty object", async () => {
            await nftService.updateNftDraft(1, ADDRESS, {});
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
});
