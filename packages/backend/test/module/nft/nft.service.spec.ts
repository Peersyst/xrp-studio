import { NftService } from "../../../src/modules/nft/nft.service";
import { Test } from "@nestjs/testing";
import NftRepositoryMock from "../__mock__/nft.repository.mock";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Nft, NftStatus } from "../../../src/database/entities/Nft";
import NFTokenMintTransactionMock from "../__mock__/nftokenmint-transaction.mock";
import { convertHexToString, decodeAccountID } from "xrpl";

describe("NftService", () => {
    let nftService: NftService;
    const nftRepositoryMock = new NftRepositoryMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Nft),
                    useValue: nftRepositoryMock,
                },
                NftService,
            ],
        }).compile();
        nftService = module.get(NftService);
        nftRepositoryMock.clear();
    });

    describe("createNftFromMintTransaction", () => {
        test("Creates an NFT with an NFTokenMint transaction with just the required fields", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock();
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);
            expect(nft.tokenId).toEqual(
                "00000000" + decodeAccountID(nftMintTransaction.Account).toString("hex").toUpperCase() + "0000000000000002",
            );
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toBeUndefined();
            expect(nft.transferFee).toBeUndefined();
            expect(nft.flags).toEqual(0);
            expect(nft.uri).toEqual(convertHexToString(nftMintTransaction.URI));
            expect(nft.status).toEqual(NftStatus.CONFIRMED);
            expect(nft.user.address).toEqual(nftMintTransaction.Account);
            expect(nft.collection).toBeUndefined();
        });
        test("Creates an NFT with a complete NFTokenMint transaction", async () => {
            const nftMintTransaction = new NFTokenMintTransactionMock({
                NFTokenTaxon: 2,
                Issuer: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
                TransferFee: 100,
                Flags: 1,
            });
            const nft = await nftService.createNftFromMintTransaction(nftMintTransaction);
            expect(nft.tokenId).toEqual(
                "00010064" + decodeAccountID(nftMintTransaction.Issuer).toString("hex").toUpperCase() + "0000000200000002",
            );
            expect(nft.mintTransactionHash).toEqual(nftMintTransaction.hash);
            expect(nft.issuer).toEqual(nftMintTransaction.Issuer);
            expect(nft.transferFee).toEqual(100);
            expect(nft.flags).toEqual(1);
            expect(nft.uri).toEqual(convertHexToString(nftMintTransaction.URI));
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
                "00000000" + decodeAccountID(nftMintTransaction.Account).toString("hex").toUpperCase() + "0000000000000001",
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
});
