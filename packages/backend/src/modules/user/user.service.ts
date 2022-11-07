import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../database/entities/User";
import { UserDto } from "./dto/user.dto";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { UpdateUserRequest } from "./request/update-user.request";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly configService: ConfigService) {}

    /**
     * Creates a user with the given address and default images if it does not exist
     */
    async createIfNotExists(address: string): Promise<User> {
        const user = await this.userRepository.findOne({ address });
        if (user) return user;
        return this.userRepository.save({
            address,
            image: this.configService.get<string>("defaultImages.profile"),
            header: this.configService.get<string>("defaultImages.header"),
        });
    }

    /**
     * Updates a user
     */
    async updateUser(
        address: string,
        { name = null, description = null, image = null, header = null, twitter = null, discord = null }: UpdateUserRequest,
    ): Promise<void> {
        await this.userRepository.save({ address, name, description, image, header, twitter, discord });
    }

    /**
     * Gets a user by its address
     */
    async findOne(address: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ address });
        if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        return UserDto.fromEntity(user);
    }

    /**
     * Gets a user by its name
     */
    async findOneByName(name: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ name });
        if (!user) throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        return UserDto.fromEntity(user);
    }

    /**
     * Checks if a userName already exists
     */
    async findName(name: string): Promise<boolean> {
        try {
            await this.findOneByName(name);
            return true;
        } catch (e) {
            return false;
        }
    }
}
