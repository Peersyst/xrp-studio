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

@ApiTags("collection")
@Controller("collection")
@ApiErrorDecorators()
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}

    @Get(":id")
    @ApiOperation({ description: "Gets a collection" })
    async getCollection(@Param("id", ParseIntPipe) id: number): Promise<CollectionDto> {
        return this.collectionService.findOne({ id }, { relations: ["nfts", "nfts.metadata", "nfts.metadata.attributes"] });
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
