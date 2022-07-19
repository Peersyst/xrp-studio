import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { Repository } from "typeorm";
import { FindCollectionByTaxonAndAccountOptions } from "./types";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";

@Injectable()
export class CollectionService {
    constructor(@InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>) {}

    async findCollectionByTaxonAndAccount(
        taxon: string,
        account: string,
        { notFoundError = false }: FindCollectionByTaxonAndAccountOptions = {},
    ): Promise<Collection | undefined> {
        const collection = await this.collectionRepository
            .createQueryBuilder("collection")
            .where("taxon = :taxon AND account = :address", { taxon, address: account })
            .getOne();
        if (notFoundError && !collection) throw new BusinessException(ErrorCode.COLLECTION_NOT_FOUND);
        return collection;
    }
}
