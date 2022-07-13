import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "../../database/entities/Collection";
import { Repository } from "typeorm";

@Injectable()
export class CollectionService {
    constructor(@InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>) {}

    async findCollectionByTaxonAndAccount(taxon: string, account: string): Promise<Collection | undefined> {
        return this.collectionRepository
            .createQueryBuilder("collection")
            .where("taxon = :taxon AND account = :address", { taxon, address: account })
            .getOne();
    }
}
