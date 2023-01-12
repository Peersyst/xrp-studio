import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../database/entities/User";
import { UserDto } from "./dto/user.dto";
import { BusinessException } from "../common/exception/business.exception";
import { ErrorCode } from "../common/exception/error-codes";
import { UpdateUserRequest } from "./request/update-user.request";
import { ConfigService } from "@nestjs/config";
import { QueryBuilderHelper } from "../common/util/query-builder.helper";
import { GetUsersRequest } from "./request/get-users.request";
import { NftStatus } from "../../database/entities/Nft";
import generateName from "./util/name-generator/generate-name";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly configService: ConfigService) {}

    /**
     * Creates a user with the given address and default images if it does not exist
     */
    async createIfNotExists(address: string): Promise<User> {
        const user = await this.userRepository.findOne({ address });
        if (user) return user;
        const name = await this.getRandomUserName();
        return this.userRepository.save({
            name,
            address,
            image: this.configService.get<string>("defaultImages.profile"),
            header: this.configService.get<string>("defaultImages.header"),
            verifiedArtist: this.configService.get<boolean>("user.isVerified"),
        });
    }

    /**
     * Gets a random user name handling reps
     */
    async getRandomUserName(): Promise<string> {
        const name = generateName();
        const nameSequenceQuery = await this.userRepository.query(
            `SELECT s.i AS missing_sequence FROM generate_series(1,99999) s(i) WHERE NOT EXISTS (SELECT 1 FROM "user" WHERE s.i = 1 AND name = $1 OR name = CONCAT($1, s.i)) LIMIT 1;`,
            [name],
        );
        const nameSequenceQueryRes = nameSequenceQuery?.[0];
        if (!nameSequenceQueryRes) return this.getRandomUserName();
        const missingSequence = Number(nameSequenceQueryRes.missing_sequence);
        if (missingSequence === 1) return name;
        else return name + missingSequence;
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

    async findAll(filters: GetUsersRequest): Promise<UserDto[]> {
        const { page, pageSize } = filters;
        const take = pageSize;
        const skip = (page - 1) * take;

        const { relations, qbWheres, qbOrders } = GetUsersRequest.toFilterClause(filters);

        const entities = await QueryBuilderHelper.buildQuery(
            this.userRepository,
            "user",
            [],
            [],
            relations,
            qbWheres,
            qbOrders,
            [],
            undefined,
            skip,
            take,
        )
            .loadRelationCountAndMap("user.nftsCount", "user.nfts", "nft", (qb) =>
                qb.where("nft.status = :confirmed", { confirmed: NftStatus.CONFIRMED }),
            )
            .getMany();

        return entities.map((user) => UserDto.fromEntity(user));
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
    async userNameIsAvailable(name: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ name });
        return !user;
    }
}
