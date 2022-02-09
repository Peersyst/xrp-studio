import { NetworkType } from "symbol-sdk";
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
    symbol: {
        payerPrivateKey: process.env.SYMBOL_PAYER_PRIVATE_KEY,
        node: process.env.SYMBOL_NODE,
        networkType: process.env.SYMBOL_NETWORK || NetworkType.TEST_NET,
    },
});
