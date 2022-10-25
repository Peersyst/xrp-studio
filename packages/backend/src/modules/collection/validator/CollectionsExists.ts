import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "../../../database/entities/Collection";
import { In, Repository } from "typeorm";

@ValidatorConstraint({ async: true })
@Injectable()
export class CollectionsExistsConstraint implements ValidatorConstraintInterface {
    constructor(@InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>) {}

    async validate(ids: number[]) {
        try {
            const count = await this.collectionRepository.find({ where: { id: In(ids) } });
            return count.length === ids.length;
        } catch (e) {
            return false;
        }
    }

    defaultMessage() {
        return `Collection/s not found`;
    }
}

export function CollectionsExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "IsCollectionId",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: CollectionsExistsConstraint,
        });
    };
}
