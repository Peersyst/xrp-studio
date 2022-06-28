import { Test } from "@nestjs/testing";
import { AuthService } from "@peersyst/auth-module";
import JwtServiceMock from "../__mock__/jwt-service.mock";
import { UserType } from "../../../src/database/entities/User";
import UserServiceMock from "../__mock__/user-service.mock";

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: "UserService",
                    useValue: UserServiceMock,
                },
                {
                    provide: "JwtService",
                    useValue: JwtServiceMock,
                },
                AuthService,
            ],
        }).compile();
        authService = module.get<AuthService>(AuthService);
    });

    it("should validate a user", async () => {
        const user = await authService.validateUser("email", "password");
        expect(user.type).toEqual(UserType.USER);
        expect(user.email).toEqual("user@example.com");
    });

    it("should return a token", async () => {
        const credentials = await authService.login({ id: 1, email: "email", type: UserType.USER });
        expect(credentials).toEqual({ access_token: "signed-payload" });
    });
});
