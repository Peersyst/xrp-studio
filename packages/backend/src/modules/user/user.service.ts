import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../database/entities/User";
import { UserDto } from "./dto/user.dto";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    /**
     * Creates a user with the given addres if it does not exist
     */
    async createIfNotExists(address: string): Promise<User> {
        return this.userRepository.save({ address });
    }

    /**
     * Gets a user by its address
     */
    async findOne(address: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ address });
        if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        return UserDto.fromEntity(user);
    }
}
