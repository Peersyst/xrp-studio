import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../src/app.module";

describe("User e2e", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    }, 100000);

    it("POST /api/auth/login", async () => {
        await request(app.getHttpServer()).post("/api/auth/login").send({ email: "userr@example.com", password: "tTTest12!!!!" });
    });
});
