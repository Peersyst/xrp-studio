import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "../../../database/entities/Collection";
import { Repository } from "typeorm";

@ValidatorConstraint({ async: true })
@Injectable()
export class CollectionExistsConstraint implements ValidatorConstraintInterface {
    constructor(@InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>) {}

    async validate(id: number) {
        const collection = await this.collectionRepository.findOne({ where: { id } });
        return !!collection;
    }

    defaultMessage() {
        return `Collection not found`;
    }
}

export function CollectionExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "IsCollectionId",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: CollectionExistsConstraint,
        });
    };
}
