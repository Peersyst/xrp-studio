import { getNestTypeORMConfig } from "./typeormConfig";

export default (): any => ({
    server: {
        port: parseInt(process.env.APP_PORT, 10),
        secretKey: process.env.APP_JWT_KEY,
        encryptionKey: process.env.APP_ENCRYPTION_KEY,
        enableSwagger: process.env.APP_ENABLE_SWAGGER === "1",
        enableCORS: process.env.APP_ENABLE_CORS === "1",
    },
    database: getNestTypeORMConfig(),
    logger: {
        logLevel: "info",
        logFileName: "logs/app.log",
    },
});
