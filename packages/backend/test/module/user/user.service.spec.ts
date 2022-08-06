import { UserService } from "../../../src/modules/user/user.service";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../../src/database/entities/User";
import UserRepositoryMock from "../__mock__/user.repository.mock";
import UserMock from "../__mock__/user.mock";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";

describe("UserService", () => {
    const ADDRESS = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2";

    let userService: UserService;
    const userRepositoryMock = new UserRepositoryMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepositoryMock,
                },
                UserService,
            ],
        }).compile();
        userService = module.get(UserService);
        userRepositoryMock.clear();
    });

    describe("createIfNotExists", () => {
        test("Executes save on repository", async () => {
            const user = await userService.createIfNotExists(ADDRESS);
            expect(user).toEqual(new User({ address: ADDRESS }));
            expect(userRepositoryMock.save).toHaveBeenCalledWith({ address: ADDRESS });
        });
    });

    describe("findOne", () => {
        test("Returns an existing user", async () => {
            const userMock = new UserMock({ address: ADDRESS });
            userRepositoryMock.findOne.mockResolvedValueOnce(userMock);
            const user = await userService.findOne(ADDRESS);
            expect(user).toEqual(userMock);
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ address: ADDRESS });
        });

        test("User does not exist and throws USER_NOT_FOUND_ERROR", async () => {
            userRepositoryMock.findOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await userService.findOne(ADDRESS);
            }).rejects.toEqual(new BusinessException(ErrorCode.USER_NOT_FOUND));
        });
    });
});
