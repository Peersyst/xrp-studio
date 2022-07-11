import { getNestTypeORMConfig } from "./typeormConfig";

export default (): any => ({
    server: {
        port: parseInt(process.env.APP_PORT, 10),
        basePath: process.env.BASE_PATH || "",
        secretKey: process.env.APP_JWT_KEY,
        encryptionKey: process.env.APP_ENCRYPTION_KEY,
        enableSwagger: process.env.APP_ENABLE_SWAGGER === "1",
        enableCORS: process.env.APP_ENABLE_CORS === "1",
        enableBullBoard: process.env.APP_ENABLE_BULL_BOARD === "1",
    },
    database: getNestTypeORMConfig(),
    logger: {
        logLevel: "info",
        logFileName: "logs/app.log",
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD,
    },
    bull: {
        age: parseInt(process.env.JOB_AGE_SECONDS) || 3600,
        count: parseInt(process.env.JOB_MAX_COUNT) || 100,
    },
    xrp: {
        node: process.env.XRP_NODE,
        startingLedgerIndex: parseInt(process.env.STARTING_LEDGER_INDEX),
    },
    xumm: {
        appKey: process.env.XUMM_API_KEY,
        appSecret: process.env.XUMM_SECRET_KEY,
    },
});
