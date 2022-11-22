import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bull";
import { Nft } from "../../../database/entities/Nft";
import { convertHexToString } from "xrpl";
import { MetadataProcessingError, MetadataService } from "../metadata.service";

@Processor("metadata")
export class MetadataConsumer {
    private readonly logger = new Logger(MetadataConsumer.name);

    constructor(@Inject(MetadataService) private readonly metadataService: MetadataService) {}

    /**
     * Handle timeouts and unknown errors
     * @param job
     * @param err
     */
    @OnQueueFailed()
    onQueueFailed(job: Job, err: Error) {
        this.logger.error(
            err.name === "TimeoutError"
                ? `Queue metadata timeout ${JSON.stringify(job.data)}`
                : `Queue metadata could not index nft due to an unknown failure ${JSON.stringify(job.data)}
Error: ${err}`,
        );
    }

    /**
     * Processes an NFT metadata from ipfs or http URIs
     */
    @Process("process-metadata")
    async processMetadata({ data: { nft } }: Job<{ nft: Nft }>) {
        this.logger.log(`[process-metadata] consuming ${JSON.stringify(nft)}`);
        try {
            const { uri: hexUri } = nft;
            const uri = convertHexToString(hexUri);
            const metadata = await this.metadataService.retrieveMetadata(uri);
            await this.metadataService.create(nft.id, metadata);
            this.logger.log(`[process-metadata] indexed ${JSON.stringify(nft)}`);
        } catch (e) {
            if (e === MetadataProcessingError.FETCH_ERROR)
                this.logger.warn(`[process-metadata] could not fetch metadata from ${JSON.stringify(nft)}`);
            else if (e === MetadataProcessingError.INVALID)
                this.logger.warn(`[process-metadata] metadata is not valid from ${JSON.stringify(nft)}`);
            else {
                this.logger.error(`[process-metadata] could not process metadata from ${JSON.stringify(nft)}
Error: ${e}`);
            }
        }
    }
}
