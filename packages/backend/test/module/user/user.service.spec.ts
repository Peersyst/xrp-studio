import { UserService } from "../../../src/modules/user/user.service";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../../src/database/entities/User";
import UserRepositoryMock from "../__mock__/user.repository.mock";

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
});
