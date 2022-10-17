import { UserService } from "../../../src/modules/user/user.service";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../../src/database/entities/User";
import UserRepositoryMock from "../__mock__/user.repository.mock";
import UserMock from "../__mock__/user.mock";
import { BusinessException } from "../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../src/modules/common/exception/error-codes";
import { UpdateUserRequest } from "../../../src/modules/user/request/update-user.request";

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

    describe("updateUser", () => {
        test("Updates user with all fields", async () => {
            const userRequest: UpdateUserRequest = {
                name: "NEW_NAME",
                description: "NEW_DESCRIPTION",
                image: "NEW_IMAGE_URL",
                header: "NEW_HEADER_URL",
                twitter: "NEW_TWITTER",
                discord: "NEW_DISCORD",
            };
            await userService.updateUser(ADDRESS, userRequest);
            expect(userRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining(userRequest));
        });

        test("Updates user with all fields set to null", async () => {
            await userService.updateUser(ADDRESS, {});
            expect(userRepositoryMock.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: null,
                    description: null,
                    image: null,
                    header: null,
                    twitter: null,
                    discord: null,
                }),
            );
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

    describe("findOneByName", () => {
        const name = "Manolito";
        test("Returns an existing user", async () => {
            const userMock = new UserMock({ address: ADDRESS, name });
            userRepositoryMock.findOne.mockResolvedValueOnce(userMock);
            const user = await userService.findOneByName(name);
            expect(user).toEqual(userMock);
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ name });
        });

        test("User does not exist and throws USER_NOT_FOUND_ERROR", async () => {
            userRepositoryMock.findOne.mockResolvedValueOnce(undefined);
            await expect(async () => {
                await userService.findOneByName(name);
            }).rejects.toEqual(new BusinessException(ErrorCode.USER_NOT_FOUND));
        });
    });

    describe("findName", () => {
        const name = "Manolito";
        test("Finds the name", async () => {
            const userMock = new UserMock({ address: ADDRESS, name });
            userRepositoryMock.findOne.mockResolvedValueOnce(userMock);
            const exist = await userService.findName(name);
            expect(exist).toEqual(true);
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ name });
        });

        test("Does not find the name", async () => {
            userRepositoryMock.findOne.mockResolvedValueOnce(undefined);
            const exist = await userService.findName(name);
            expect(exist).toEqual(false);
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ name });
        });
    });
});
