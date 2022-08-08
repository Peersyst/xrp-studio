import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseIntPipe, Post, Request } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { CollectionService } from "./collection.service";
import { CollectionDto, PaginatedCollectionDto } from "./dto/collection.dto";
import { ApiGetCollectionsDecorator } from "./decorator/api-get-collections.decorator";
import { EnhancedQuery } from "../common/decorator/enhanced-query";
import { GetCollectionsRequest } from "./request/get-collections.request";
import { CreateCollectionRequest } from "./request/create-collection.request";
import { XummAuthenticated } from "@peersyst/xumm-module";

@ApiTags("collection")
@Controller("collection")
@ApiErrorDecorators()
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}

    @Get(":id")
    @ApiOperation({ description: "Gets a collection" })
    async getCollection(@Param("id", ParseIntPipe) id: number): Promise<CollectionDto> {
        return this.collectionService.findOne(id);
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
    async createCollection(@Request() req, @Body() collection: CreateCollectionRequest): Promise<CollectionDto> {
        return this.collectionService.createCollection(req.user.address, collection);
    }
}
