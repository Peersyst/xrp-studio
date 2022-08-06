import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../database/entities/User";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createIfNotExists(address: string): Promise<User> {
        return this.userRepository.save({ address });
    }
}
