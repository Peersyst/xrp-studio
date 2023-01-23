import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bull";
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
    @Process({ name: "process-metadata", concurrency: 5 })
    async processMetadata({ data: { nftId, uri } }: Job<{ nftId: number; uri: string }>) {
        this.logger.log(`[process-metadata] consuming ${JSON.stringify({ nftId, uri })}`);
        try {
            const metadata = await this.metadataService.retrieveMetadata(uri);
            await this.metadataService.create(nftId, metadata);
            this.logger.log(`[process-metadata] indexed ${JSON.stringify({ nftId, uri })}`);
        } catch (e) {
            if (e === MetadataProcessingError.FETCH_ERROR) {
                this.logger.warn(
                    `[process-metadata] could not fetch metadata from ${JSON.stringify({
                        nftId,
                        uri,
                    })}`,
                );
            } else if (e === MetadataProcessingError.INVALID)
                this.logger.warn(
                    `[process-metadata] metadata is not valid from ${JSON.stringify({
                        nftId,
                        uri,
                    })}`,
                );
            else {
                this.logger.error(`[process-metadata] could not process metadata from ${JSON.stringify({
                    nftId,
                    uri,
                })}
Error: ${e}`);
            }
        }
    }
}
