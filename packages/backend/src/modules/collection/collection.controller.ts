import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { CollectionService } from "./collection.service";
import { CollectionDto, PaginatedCollectionDto } from "./dto/collection.dto";
import { ApiGetCollectionsDecorator } from "./decorator/api-get-collections.decorator";
import { EnhancedQuery } from "../common/decorator/enhanced-query";
import { GetCollectionsRequest } from "./request/get-collections.request";
import { CreateCollectionRequest } from "./request/create-collection.request";
import { XummAuthenticated } from "@peersyst/xumm-module";
import { UpdateCollectionRequest } from "./request/update-collection.request";
import { CreateCollectionQueryRequest } from "./request/create-collection-query-request";
import { AvailabilityDto } from "../drop/dto/availability.dto";

@ApiTags("collection")
@Controller("collection")
@ApiErrorDecorators()
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}

    @Get(":id")
    @ApiOperation({ description: "Gets a collection by id" })
    async getCollection(@Param("id", ParseIntPipe) id: number): Promise<CollectionDto> {
        return this.collectionService.findOne({ id }, { relations: ["user", "nfts", "nfts.metadata", "nfts.metadata.attributes"] });
    }

    @Get("by-path/:path")
    @ApiOperation({ description: "Gets a collection by collection name and artist name" })
    async getCollectionByPath(@Param("path") path: string): Promise<CollectionDto> {
        return this.collectionService.findOne({ path }, { relations: ["user", "nfts", "nfts.metadata", "nfts.metadata.attributes"] });
    }

    @Get("name-availability/:name")
    @ApiOperation({ description: "Check if the name of a collection already exists for a user." })
    @XummAuthenticated()
    async collectionNameAvailability(@Param("name") name: string, @Request() req): Promise<AvailabilityDto> {
        return { available: await this.collectionService.collectionNameIsAvailable(name, req.user.address) };
    }

    @Get()
    @ApiOperation({ description: "Get all Collections" })
    @ApiGetCollectionsDecorator()
    async getCollections(@EnhancedQuery() queryParams: GetCollectionsRequest = {}): Promise<PaginatedCollectionDto> {
        return this.collectionService.findAll(queryParams);
    }

    @Post()
    @ApiOperation({ description: "Create a collection" })
    @XummAuthenticated()
    async createCollection(
        @Request() req,
        @EnhancedQuery() { publish }: CreateCollectionQueryRequest = {},
        @Body() collection: CreateCollectionRequest,
    ): Promise<CollectionDto> {
        return this.collectionService.createCollection(req.user.address, collection, publish);
    }

    @Put(":id")
    @ApiOperation({ description: "Updates a collection" })
    @XummAuthenticated()
    async updateCollection(
        @Param("id", ParseIntPipe) id: number,
        @Request() req,
        @EnhancedQuery() { publish }: CreateCollectionQueryRequest = {},
        @Body() collection: UpdateCollectionRequest,
    ): Promise<CollectionDto> {
        return this.collectionService.updateCollection(id, req.user.address, collection, publish);
    }
}
