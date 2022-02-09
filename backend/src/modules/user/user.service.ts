import { compare, hash } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserRequest } from "./create-user.request";
import { User, UserType } from "../../database/entities/User";
import { UserDto } from "./user.dto";
import { BusinessException } from "../exception/business.exception";
import { ErrorCode } from "../exception/error-codes";
import { AuthUserServiceI } from "@peersyst/auth-module";

@Injectable()
export class UserService implements AuthUserServiceI {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createUser(createUserRequest: CreateUserRequest): Promise<UserDto> {
        const existingUser = await this.userRepository.findOne({ where: { email: createUserRequest.email } });
        if (existingUser) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_TAKEN);
        }
        const entity = await this.userRepository.save({
            ...createUserRequest,
            type: UserType.USER,
            password: await hash(createUserRequest.password, 10),
        });

        return UserDto.fromEntity(entity);
    }

    async findAll(): Promise<UserDto[]> {
        const entities = await this.userRepository.find();
        return entities.map((entity) => UserDto.fromEntity(entity));
    }

    async findById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        }
        return UserDto.fromEntity(user);
    }

    async userEmailPasswordMatch(email: string, plainPassword: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        }
        const result = await compare(plainPassword, user.password);
        if (result) {
            return UserDto.fromEntity(user);
        }
        return null;
    }
}
