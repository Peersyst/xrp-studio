import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import MetadataConsumerMock from "../__mock__/metadata.consumer.mock";
import MetadataDtoMock from "../__mock__/metadata.dto.mock";
import { NftMetadataAttribute } from "../../../src/database/entities/NftMetadataAttribute";
import { NftMetadata } from "../../../src/database/entities/NftMetadata";
import NftMetadataRepositoryMock from "../__mock__/nft-metadata.repository.mock";
import NftMetadataAttributeRepositoryMock from "../__mock__/nft-metadata-attribute.repository.mock";
import IpfsServiceMock from "../__mock__/ipfs.service.mock";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";
import { MetadataService } from "../../../src/modules/metadata/metadata.service";
import { ConfigService } from "@nestjs/config";
import ConfigServiceMock from "../__mock__/config.service.mock";
import axios from "axios";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";

describe("MetadataService", () => {
    let metadataService: MetadataService;
    const nftMetadataRepositoryMock = new NftMetadataRepositoryMock();
    const nftMetadataAttributeRepositoryMock = new NftMetadataAttributeRepositoryMock();
    const metadataConsumerMock = new MetadataConsumerMock();
    const ipfsServiceMock = new IpfsServiceMock();
    const configServiceMock = new ConfigServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
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
                    provide: IpfsService,
                    useValue: ipfsServiceMock,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceMock,
                },
                MetadataService,
            ],
        }).compile();
        metadataService = module.get(MetadataService);
        nftMetadataRepositoryMock.clear();
        nftMetadataAttributeRepositoryMock.clear();
        metadataConsumerMock.clear();
        ipfsServiceMock.clear();
    });

    describe("createNftMetadata", () => {
        test("Creates metadata with attributes", async () => {
            const metadataDto = new MetadataDtoMock();
            await metadataService.create(0, metadataDto);
            expect(nftMetadataRepositoryMock.create).toHaveBeenCalledWith({ ...metadataDto, nftId: 0 });
            expect(nftMetadataRepositoryMock.delete).toHaveBeenCalledTimes(0);
        });

        test("Overrides draft metadata", async () => {
            const metadataDto = new MetadataDtoMock();
            await metadataService.create(1, metadataDto);
            expect(nftMetadataRepositoryMock.create).toHaveBeenCalledWith({ ...metadataDto, nftId: 1 });
            expect(nftMetadataRepositoryMock.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe("processMetadata", () => {
        describe("http metadata", () => {
            test("Processes http metadata correctly", async () => {
                const metadataDto = new MetadataDtoMock();
                jest.spyOn(axios, "get").mockReturnValue(Promise.resolve({ data: metadataDto }));
                const dto = await metadataService.retrieveMetadata("http://randomlink.com/metadata");
                expect(dto).toEqual(metadataDto);
            });
        });

        test("Uri is an http url neither an ipfs uri", async () => {
            await expect(metadataService.retrieveMetadata("unknown")).rejects.toEqual(
                new BusinessException(ErrorCode.METADATA_URI_NOT_SUPPORTED),
            );
        });
    });

    describe("publishMetadata", () => {
        test("Publishes correct metadata", async () => {
            await metadataService.publishMetadata(1);
            expect(ipfsServiceMock.uploadFile).toHaveBeenCalledWith(Buffer.from(new MetadataDtoMock().encode()));
        });
    });

    describe("processImage", () => {
        test("image is already an url and returns it", async () => {
            const image = await metadataService.processImage("http://domain.com/image.jpg");
            expect(image).toEqual("http://domain.com/image.jpg");
        });

        test("image is an ipfs uri and returns the ipfs gateway url", async () => {
            const image = await metadataService.processImage("ipfs://cid");
            expect(image).toEqual(configServiceMock.get("pinata.gateway") + "cid");
        });

        test("image is an url neither an ipfs uri and return undefined", async () => {
            const image = await metadataService.processImage("unknown");
            expect(image).toBeUndefined();
        });
    });
});
