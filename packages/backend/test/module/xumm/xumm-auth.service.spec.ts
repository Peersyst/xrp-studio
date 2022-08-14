import { XummAuthService } from "../../../src/modules/xumm/xumm-auth.service";
import UserServiceMock from "../__mock__/user.service.mock";
import { Test } from "@nestjs/testing";
import { UserService } from "../../../src/modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import JwtServiceMock from "../__mock__/jwt-service.mock";
import XummServiceMock from "../__mock__/xumm.service.mock";
import { XummService } from "@peersyst/xumm-module";

describe("XummAuthService", () => {
    const ADDRESS = "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2";

    let xummAuthService: XummAuthService;
    const jwtServiceMock = new JwtServiceMock();
    const xummServiceMock = new XummServiceMock();
    const userServiceMock = new UserServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: JwtService,
                    useValue: jwtServiceMock,
                },
                {
                    provide: XummService,
                    useValue: xummServiceMock,
                },
                {
                    provide: UserService,
                    useValue: userServiceMock,
                },
                XummAuthService,
            ],
        }).compile();
        xummAuthService = module.get(XummAuthService);
        jwtServiceMock.clear();
        xummServiceMock.clear();
        userServiceMock.clear();
    });

    describe("onSignIn", () => {
        test("Creates user if it does not exist", async () => {
            await xummAuthService.onSignIn({ address: ADDRESS, access_token: "ACCESS_TOKEN" });
            expect(userServiceMock.createIfNotExists).toHaveBeenCalledWith(ADDRESS);
        });
    });
});
