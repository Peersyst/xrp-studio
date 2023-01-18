import { Test } from "@nestjs/testing";
import * as XRPL from "xrpl";
import NftMock from "../../__mock__/nft.mock";
import { Job } from "bull";
import LoggerMock from "../../__mock__/logger.mock";
import { MetadataService } from "../../../../src/modules/metadata/metadata.service";
import { MetadataConsumer } from "../../../../src/modules/metadata/queue/metadata.consumer";
import MetadataServiceMock from "../../__mock__/metadata.service.mock";
import MetadataDtoMock from "../../__mock__/metadata.dto.mock";

describe("MetadataConsumer", () => {
    let metadataConsumer: MetadataConsumer;
    const loggerMock = new LoggerMock();
    const metadataServiceMock = new MetadataServiceMock();

    jest.spyOn(XRPL, "convertHexToString").mockImplementation((uri) => uri);

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: MetadataService,
                    useValue: metadataServiceMock,
                },
                MetadataConsumer,
            ],
        }).compile();
        metadataConsumer = module.get(MetadataConsumer);
        loggerMock.clear();
        metadataServiceMock.clear();
    });

    const nftMock = new NftMock();

    describe("processMetadata", () => {
        test("process metadata correctly", async () => {
            await metadataConsumer.processMetadata({ data: { nftId: 1, uri: "uri" } } as Job);
            expect(metadataServiceMock.retrieveMetadata).toHaveBeenCalledWith("uri");
            expect(metadataServiceMock.create).toHaveBeenCalledWith(nftMock.id, new MetadataDtoMock());
        });
    });

    describe("onQueueFailed", () => {
        test("Job times out", () => {
            metadataConsumer.onQueueFailed({ data: { nft: nftMock } } as Job, { name: "TimeoutError", message: "" });
            expect(loggerMock.error).toHaveBeenCalledWith(`Queue metadata timeout ${JSON.stringify({ nft: nftMock })}`);
        });

        test("There is an unknown error", () => {
            metadataConsumer.onQueueFailed({ data: { nft: nftMock } } as Job, { name: "UnknownError", message: "" });
            expect(loggerMock.error).toHaveBeenCalledWith(`Queue metadata could not index nft due to an unknown failure ${JSON.stringify({
                nft: nftMock,
            })}
Error: ${{ name: "UnknownError", message: "" }}`);
        });
    });
});
