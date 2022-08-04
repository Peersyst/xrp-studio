import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { Job } from "bull";
import { MetadataDto } from "../dto/metadata.dto";
import axios from "axios";
import isHttpUrl from "../../common/util/isHttpUrl";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";
import { ConfigService } from "@nestjs/config";
import { Nft } from "../../../database/entities/Nft";
import { convertHexToString } from "xrpl";
import { NftService } from "../nft.service";

export enum MetadataProcessingError {
    FETCH_ERROR,
    INVALID,
}

@Processor("metadata")
export class MetadataConsumer {
    private readonly logger = new Logger(MetadataConsumer.name);

    constructor(
        @Inject(IpfsService) private readonly ipfsService: IpfsService,
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(NftService) private readonly nftService: NftService,
    ) {}

    /**
     * Handle timeouts and unknown errors
     * @param job
     * @param err
     */
    @OnQueueFailed()
    onQueueFailed(job: Job, err: Error) {
        this.logger.error(
            err.name === "TimeoutError"
                ? `METADATA FROM ${job.data.nft.tokenId} TIMEOUT`
                : `METADATA FROM ${job.data.nft.tokenId} COULD NOT BE INDEXED DUE TO AN UNKNOWN FAILURE
Error: ${err}`,
        );
    }

    /**
     * Processes an NFT metadata from ipfs or http URIs
     */
    @Process("process-metadata")
    async processMetadata({ data: { nft } }: Job<{ nft: Nft }>) {
        this.logger.log(`CONSUMING METADATA FROM ${nft.tokenId}`);
        try {
            const { uri: hexUri } = nft;
            const uri = convertHexToString(hexUri);
            let metadata;
            if (isHttpUrl(uri)) {
                metadata = await this.retrieveHttpMetadata(uri);
            } else if (uri.startsWith("ipfs://")) {
                const cid = uri.replace("ipfs://", "");
                metadata = await this.retrieveIpfsMetadata(cid);
            } else this.logger.warn(`URI FROM ${nft.tokenId} IS NOT VALID`);
            if (metadata) {
                await this.nftService.createNftMetadata(nft, metadata);
                this.logger.log(`INDEXED METADATA FROM ${nft.tokenId}`);
            }
        } catch (e) {
            if (e === MetadataProcessingError.FETCH_ERROR) this.logger.warn(`COULD NOT FETCH METADATA FROM ${nft.tokenId}`);
            else if (e === MetadataProcessingError.INVALID) this.logger.warn(`METADATA FROM ${nft.tokenId} IS NOT VALID`);
            else {
                this.logger.error(`COULD NOT PROCESS METADATA FROM ${nft.tokenId}
Error: ${e}`);
            }
        }
    }

    /**
     * If image is an http url return it, if it is an ipfs uri download it and upload it to bucket, else ignore image
     */
    async processImage(image: string): Promise<string | undefined> {
        if (isHttpUrl(image)) return image;
        else if (image.startsWith("ipfs://")) {
            const cid = image.replace("ipfs://", "");
            return this.configService.get("pinata.gateway") + cid;
        } else return undefined;
    }

    /**
     * Builds Metadata from an object of type any
     */
    async constructMetadata(obj: any): Promise<MetadataDto> {
        const metadata: MetadataDto = {};
        metadata.name = obj.name;
        metadata.description = obj.description;
        metadata.image = obj.image ? await this.processImage(obj.image) : undefined;
        metadata.backgroundColor = obj.backgroundColor;
        metadata.externalUrl = obj.externalUrl;
        metadata.attributes = obj.attributes;
        return metadata;
    }

    /**
     * Retrieves metadata from an HTTP URL
     */
    async retrieveHttpMetadata(url: string): Promise<MetadataDto> {
        let res;
        try {
            res = await axios.get(url);
        } catch (e) {
            throw MetadataProcessingError.FETCH_ERROR;
        }
        const { data } = res;
        return this.constructMetadata(data);
    }

    /**
     * Retrieves metadata from IPFS
     */
    async retrieveIpfsMetadata(cid: string): Promise<MetadataDto> {
        let res;
        try {
            res = await this.ipfsService.getFile(cid);
        } catch (e) {
            throw MetadataProcessingError.FETCH_ERROR;
        }
        try {
            const data = JSON.parse(res.toString());
            return this.constructMetadata(data);
        } catch (e) {
            throw MetadataProcessingError.INVALID;
        }
    }
}
