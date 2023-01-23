import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { MetadataDto } from "./dto/metadata.dto";
import { NftMetadata } from "../../database/entities/NftMetadata";
import { NftMetadataAttribute } from "../../database/entities/NftMetadataAttribute";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { IpfsService } from "@peersyst/ipfs-module/src/ipfs.service";
import isHttpUrl from "../common/util/isHttpUrl";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { CreateMetadataRequest } from "./request/create-metadata.request";
import * as Hash from "ipfs-only-hash";
import { RawMetadataDto } from "./dto/raw-metadata.dto";
import { MetadataAttributeDto } from "./dto/metadata-attribute.dto";

export enum MetadataProcessingError {
    FETCH_ERROR,
    INVALID,
}

@Injectable()
export class MetadataService {
    constructor(
        @InjectRepository(NftMetadata) private readonly nftMetadataRepository: Repository<NftMetadata>,
        @InjectRepository(NftMetadataAttribute) private readonly nftMetadataAttributeRepository: Repository<NftMetadataAttribute>,
        @InjectQueue("metadata") private readonly metadataQueue: Queue,
        @Inject(IpfsService) private readonly ipfsService: IpfsService,
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) {}

    async sendToProcessMetadata(nftId: number, uri: string, delay = 0): Promise<void> {
        await this.metadataQueue.add("process-metadata", { nftId, uri }, { timeout: 5000, delay });
    }

    getRandomIpfsGateway(): string {
        const gws = this.configService.get<string[]>("pinata.gateways");
        return gws[Math.floor(Math.random() * gws.length)];
    }

    /**
     * Creates NftMetadata and assigns it to an Nft
     */
    async create(nftId: number, metadataDto: MetadataDto | CreateMetadataRequest, forceRegenerate = true): Promise<NftMetadata> {
        const metadata = await this.nftMetadataRepository.findOne({ nftId });
        // If nft has metadata it means it was a draft with metadata. We have to delete it as it has to be overridden by its final metadata
        if (metadata && forceRegenerate) await this.delete(nftId);
        // Create attributes with nftMetadataId = nft.id, as it will be the value for nftMetadata.id
        return this.nftMetadataRepository.save({
            ...metadataDto,
            nftId,
        });
    }

    async delete(nftId: number): Promise<void> {
        await this.nftMetadataAttributeRepository.delete({ nftMetadataId: nftId });
        await this.nftMetadataRepository.delete({ nftId });
    }

    async publishMetadata(nftId: number): Promise<string> {
        const metadata = await this.nftMetadataRepository.findOne({ nftId });
        if (!metadata) throw new BusinessException(ErrorCode.METADATA_NOT_FOUND);
        const metadataDto = RawMetadataDto.fromEntity(metadata);
        return this.ipfsService.uploadFile(Buffer.from(metadataDto.encode()));
    }

    async calculateUri(nftId: number): Promise<string> {
        const metadata = await this.nftMetadataRepository.findOne({ nftId }, { relations: ["attributes"] });
        const data = RawMetadataDto.fromEntity(metadata).encode();
        return "ipfs://" + (await Hash.of(Buffer.from(data)));
    }

    async retrieveMetadata(uri: string): Promise<MetadataDto> {
        if (isHttpUrl(uri)) {
            return this.retrieveMetadataHttp(uri);
        } else if (uri.startsWith("ipfs://")) {
            const cid = uri.replace("ipfs://", "");
            return this.retrieveMetadataHttp(this.getRandomIpfsGateway() + cid);
        } else {
            throw new BusinessException(ErrorCode.METADATA_URI_NOT_SUPPORTED);
        }
    }

    async retrieveMetadataHttp(url: string): Promise<MetadataDto> {
        let res;
        try {
            res = await axios.get(url);
        } catch (e) {
            throw MetadataProcessingError.FETCH_ERROR;
        }
        const { data } = res;
        return this.constructMetadata(data);
    }

    async retrieveMetadataIpfs(cid: string): Promise<MetadataDto> {
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

    async constructMetadata(obj: any): Promise<MetadataDto> {
        const image = obj.image || obj.image_url;
        const attributes = Array.isArray(obj.attributes)
            ? obj.attributes.map(({ trait_type, value, display_type }) => new MetadataAttributeDto(trait_type, value, display_type))
            : undefined;

        return new MetadataDto(
            obj.name,
            obj.description,
            image ? await this.processImage(image) : undefined,
            obj.background_color,
            obj.external_url,
            attributes,
        );
    }

    /**
     * If image is an http url return it, if it is an ipfs uri download it and upload it to bucket, else ignore image
     */
    async processImage(image: string): Promise<string | undefined> {
        if (isHttpUrl(image)) return image;
        else if (image.startsWith("ipfs://")) {
            const cid = image.replace("ipfs://", "");
            return this.configService.get("pinata.publicGateway") + cid;
        } else return undefined;
    }
}
