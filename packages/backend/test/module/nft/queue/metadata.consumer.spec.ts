import { MetadataConsumer, MetadataProcessingError } from "../../../../src/modules/nft/queue/metadata.consumer";
import IpfsServiceMock from "../../__mock__/ipfs.service.mock";
import ConfigServiceMock from "../../__mock__/config.service.mock";
import NftServiceMock from "../../__mock__/nft.service.mock";
import { Test } from "@nestjs/testing";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";
import { ConfigService } from "@nestjs/config";
import { NftService } from "../../../../src/modules/nft/nft.service";
import * as XRPL from "xrpl";
import * as isHttpUrl from "../../../../src/modules/common/util/isHttpUrl";
import MetadataDtoMock from "../../__mock__/metadata.dto.mock";
import NftMock from "../../__mock__/nft.mock";
import { Job } from "bull";
import LoggerMock from "../../__mock__/logger.mock";
import axios from "axios";

describe("MetadataConsumer", () => {
    let metadataConsumer: MetadataConsumer;
    const loggerMock = new LoggerMock();
    const ipfsServiceMock = new IpfsServiceMock();
    const configServiceMock = new ConfigServiceMock();
    const nftServiceMock = new NftServiceMock();
    jest.useFakeTimers();

    const convertStringToHexMock = jest.spyOn(XRPL, "convertHexToString").mockReturnValue("string");
    const isHttpUrlMock = jest.spyOn(isHttpUrl, "default").mockReturnValue(true);

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: IpfsService,
                    useValue: ipfsServiceMock,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceMock,
                },
                {
                    provide: NftService,
                    useValue: nftServiceMock,
                },
                MetadataConsumer,
            ],
        }).compile();
        metadataConsumer = module.get(MetadataConsumer);
        loggerMock.clear();
        ipfsServiceMock.clear();
        configServiceMock.clear();
        nftServiceMock.clear();
    });

    const nftMock = new NftMock();
    const metadataDtoMock = new MetadataDtoMock();

    describe("processMetadata", () => {
        describe("http metadata", () => {
            const retrieveHttpMetadataMock = jest
                .spyOn(MetadataConsumer.prototype, "retrieveHttpMetadata")
                .mockReturnValue(new Promise((resolve) => resolve(metadataDtoMock)));

            beforeEach(() => {
                convertStringToHexMock.mockReturnValue("string");
                isHttpUrlMock.mockReturnValue(true);
                retrieveHttpMetadataMock.mockClear();
            });

            afterAll(() => {
                retrieveHttpMetadataMock.mockRestore();
                isHttpUrlMock.mockReset();
            });

            test("Processes http metadata correctly", async () => {
                await metadataConsumer.processMetadata({ data: { nft: nftMock } } as Job);
                expect(retrieveHttpMetadataMock).toHaveBeenCalledTimes(1);
                expect(nftServiceMock.createNftMetadata).toHaveBeenCalledWith(nftMock, metadataDtoMock);
                expect(loggerMock.log).toHaveBeenCalledWith(`INDEXED METADATA FROM ${nftMock.tokenId}`);
            });

            test("Cannot fetch http metadata and throws error", async () => {
                retrieveHttpMetadataMock.mockReturnValueOnce(
                    new Promise((_resolve, reject) => reject(MetadataProcessingError.FETCH_ERROR)),
                );
                await metadataConsumer.processMetadata({ data: { nft: nftMock } } as Job);
                expect(retrieveHttpMetadataMock).toHaveBeenCalledTimes(1);
                expect(nftServiceMock.createNftMetadata).not.toHaveBeenCalled();
                expect(loggerMock.warn).toHaveBeenCalledWith(`COULD NOT FETCH METADATA FROM ${nftMock.tokenId}`);
            });
        });
        describe("ipfs metadata", () => {
            const retrieveIpfsMetadataMock = jest
                .spyOn(MetadataConsumer.prototype, "retrieveIpfsMetadata")
                .mockReturnValue(new Promise((resolve) => resolve(metadataDtoMock)));

            beforeEach(() => {
                convertStringToHexMock.mockReturnValue("ipfs://cid");
                isHttpUrlMock.mockReturnValue(false);
                retrieveIpfsMetadataMock.mockClear();
            });

            afterAll(() => {
                convertStringToHexMock.mockReset();
                retrieveIpfsMetadataMock.mockRestore();
                isHttpUrlMock.mockReset();
            });

            test("Processes ipfs metadata correctly", async () => {
                await metadataConsumer.processMetadata({ data: { nft: nftMock } } as Job);
                expect(retrieveIpfsMetadataMock).toHaveBeenCalledTimes(1);
                expect(nftServiceMock.createNftMetadata).toHaveBeenCalledWith(nftMock, metadataDtoMock);
                expect(loggerMock.log).toHaveBeenCalledWith(`INDEXED METADATA FROM ${nftMock.tokenId}`);
            });

            test("Cannot fetch ipfs metadata and throws error", async () => {
                retrieveIpfsMetadataMock.mockReturnValueOnce(
                    new Promise((_resolve, reject) => reject(MetadataProcessingError.FETCH_ERROR)),
                );
                await metadataConsumer.processMetadata({ data: { nft: nftMock } } as Job);
                expect(retrieveIpfsMetadataMock).toHaveBeenCalledTimes(1);
                expect(nftServiceMock.createNftMetadata).not.toHaveBeenCalled();
                expect(loggerMock.warn).toHaveBeenCalledWith(`COULD NOT FETCH METADATA FROM ${nftMock.tokenId}`);
            });

            test("ipfs is not valid and throws error", async () => {
                retrieveIpfsMetadataMock.mockReturnValueOnce(new Promise((_resolve, reject) => reject(MetadataProcessingError.INVALID)));
                await metadataConsumer.processMetadata({ data: { nft: nftMock } } as Job);
                expect(retrieveIpfsMetadataMock).toHaveBeenCalledTimes(1);
                expect(nftServiceMock.createNftMetadata).not.toHaveBeenCalled();
                expect(loggerMock.warn).toHaveBeenCalledWith(`METADATA FROM ${nftMock.tokenId} IS NOT VALID`);
            });
        });

        test("Uri is an http url neither an ipfs uri", async () => {
            convertStringToHexMock.mockReturnValue("string");
            isHttpUrlMock.mockReturnValue(false);
            await metadataConsumer.processMetadata({ data: { nft: nftMock } } as Job);
            expect(nftServiceMock.createNftMetadata).not.toHaveBeenCalled();
            expect(loggerMock.warn).toHaveBeenCalledWith(`URI FROM ${nftMock.tokenId} IS NOT VALID`);
        });

        test("An unknown error is thrown", async () => {
            convertStringToHexMock.mockImplementationOnce(() => {
                throw "Error";
            });
            isHttpUrlMock.mockReturnValue(false);
            await metadataConsumer.processMetadata({ data: { nft: nftMock } } as Job);
            expect(nftServiceMock.createNftMetadata).not.toHaveBeenCalled();
            expect(loggerMock.error).toHaveBeenCalledWith(`COULD NOT PROCESS METADATA FROM ${nftMock.tokenId}
Error: Error`);
        });
    });

    describe("processImage", () => {
        test("image is already an url and returns it", async () => {
            isHttpUrlMock.mockReturnValueOnce(true);
            const image = await metadataConsumer.processImage("image");
            expect(image).toEqual("image");
        });

        test("image is an ipfs uri and returns the ipfs gateway url", async () => {
            isHttpUrlMock.mockReturnValueOnce(false);
            const image = await metadataConsumer.processImage("ipfs://cid");
            expect(image).toEqual(configServiceMock.get("pinata.gateway") + "cid");
        });

        test("image is an url neither an ipfs uri and return undefined", async () => {
            isHttpUrlMock.mockReturnValueOnce(false);
            const image = await metadataConsumer.processImage("image");
            expect(image).toBeUndefined();
        });
    });

    describe("constructMetadata", () => {
        test("Construct metadata with image", async () => {
            jest.spyOn(MetadataConsumer.prototype, "processImage").mockResolvedValueOnce("image");
            const rawMetadata = new MetadataDtoMock();
            const metadata = await metadataConsumer.constructMetadata(rawMetadata);
            expect(metadata).toEqual({ ...rawMetadata, image: "image" });
        });

        test("Construct metadata without image", async () => {
            jest.spyOn(MetadataConsumer.prototype, "processImage").mockResolvedValueOnce("image");
            const rawMetadata = new MetadataDtoMock();
            rawMetadata.image = undefined;
            const metadata = await metadataConsumer.constructMetadata(rawMetadata);
            expect(metadata).toEqual({ ...rawMetadata, image: undefined });
        });
    });

    describe("retreiveHttpMetada", () => {
        let constructMetadataMock;

        beforeAll(() => {
            constructMetadataMock = jest.spyOn(MetadataConsumer.prototype, "constructMetadata").mockImplementation();
        });

        beforeEach(() => {
            constructMetadataMock.mockClear();
        });

        afterAll(() => {
            constructMetadataMock.mockRestore();
        });

        test("Gets metadata from url successfully", async () => {
            jest.spyOn(axios, "get").mockResolvedValueOnce({});
            await metadataConsumer.retrieveHttpMetadata("url");
            expect(constructMetadataMock).toHaveBeenCalledTimes(1);
        });

        test("There is an error fetching data from url", async () => {
            jest.spyOn(axios, "get").mockRejectedValueOnce({});
            await expect(async () => {
                await metadataConsumer.retrieveHttpMetadata("url");
            }).rejects.toEqual(MetadataProcessingError.FETCH_ERROR);
            expect(constructMetadataMock).not.toHaveBeenCalled();
        });
    });

    describe("retreiveIpfsMetada", () => {
        let constructMetadataMock;

        beforeAll(() => {
            constructMetadataMock = jest.spyOn(MetadataConsumer.prototype, "constructMetadata").mockImplementation();
        });

        beforeEach(() => {
            constructMetadataMock.mockClear();
        });

        afterAll(() => {
            constructMetadataMock.mockRestore();
        });

        test("Gets metadata from ipfs successfully", async () => {
            ipfsServiceMock.getFile.mockResolvedValueOnce(Buffer.from(JSON.stringify({})));
            await metadataConsumer.retrieveIpfsMetadata("cid");
            expect(constructMetadataMock).toHaveBeenCalledTimes(1);
        });

        test("There is an error fetching data from ipfs", async () => {
            ipfsServiceMock.getFile.mockRejectedValueOnce({});
            await expect(async () => {
                await metadataConsumer.retrieveIpfsMetadata("cid");
            }).rejects.toEqual(MetadataProcessingError.FETCH_ERROR);
            expect(constructMetadataMock).not.toHaveBeenCalled();
        });

        test("There is an error parsing ipfs data", async () => {
            ipfsServiceMock.getFile.mockResolvedValueOnce(Buffer.from(JSON.stringify({})));
            jest.spyOn(JSON, "parse").mockImplementationOnce(() => {
                throw "Error";
            });
            await expect(async () => {
                await metadataConsumer.retrieveIpfsMetadata("cid");
            }).rejects.toEqual(MetadataProcessingError.INVALID);
            expect(constructMetadataMock).not.toHaveBeenCalled();
        });
    });

    describe("onQueueFailed", () => {
        test("Job times out", () => {
            metadataConsumer.onQueueFailed({ data: { nft: nftMock } } as Job, { name: "TimeoutError", message: "" });
            expect(loggerMock.error).toHaveBeenCalledWith(`METADATA FROM ${nftMock.tokenId} TIMEOUT`);
        });

        test("There is an unknown error", () => {
            metadataConsumer.onQueueFailed({ data: { nft: nftMock } } as Job, { name: "UnknownError", message: "" });
            expect(loggerMock.error).toHaveBeenCalledWith(`METADATA FROM ${nftMock.tokenId} COULD NOT BE INDEXED DUE TO AN UNKNOWN FAILURE
Error: ${{ name: "UnknownError", message: "" }}`);
        });
    });
});
