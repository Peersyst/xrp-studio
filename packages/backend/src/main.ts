import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import * as helmet from "helmet";
import * as morgan from "morgan";
import { utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import * as winston from "winston";
import { AppModule } from "./app.module";
import * as packageJson from "../package.json";
import registerBullBoard from "./register-bull-board";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import { getConfigEnv } from "./config/util/config.utils";
import { runSeeders } from "./database/seeders/seed";

async function bootstrap() {
    if (getConfigEnv() === "preview") await runSeeders(true);
    const app = await NestFactory.create(AppModule);
    const configService = app.get("ConfigService");
    const logLevel = configService.get("logger.logLevel");
    const logFileName = configService.get("logger.logFile");
    const serverPort = configService.get("server.port");

    const logger = WinstonModule.createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
                level: logLevel,
            }),
            new winston.transports.File({
                format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
                level: logLevel,
                filename: logFileName,
            }),
        ],
    });

    app.useLogger(logger);
    app.use(helmet());
    app.use(morgan("tiny"));
    app.setGlobalPrefix("api");

    // Enables custom validators
    app.useGlobalPipes(new ValidationPipe());
    // Enables custom validators injections
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    if (configService.get("server.enableCors")) {
        app.enableCors();
    }
    const options = new DocumentBuilder()
        .setTitle(packageJson.name)
        .setDescription(packageJson.description)
        .setVersion(packageJson.version)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    fs.writeFileSync("./openapi-spec.json", JSON.stringify(document));

    if (configService.get("server.enableSwagger")) {
        SwaggerModule.setup("swagger", app, document);
    }

    if (configService.get("server.enableBullBoard")) {
        registerBullBoard(app, configService.get("server.basePath"));
    }

    await app.listen(serverPort);
    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
