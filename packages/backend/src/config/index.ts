import { getNestTypeORMConfig } from "./typeorm.config";
import loadAwsSecrets from "./util/loadAwsSecrets";
import serverConfig from "./server.config";
import loggerConfig from "./logger.config";
import redisConfig from "./redis.config";
import bullConfig from "./bull.config";
import xrpConfig from "./xrp.config";
import xummConfig from "./xumm.config";
import awsS3Config from "./aws-s3.config";
import defaultImagesConfig from "./default-images.config";
import pinataConfig from "./pinata.config";

export default async (): Promise<any> => {
    const secrets = await loadAwsSecrets(process.env.AWS_REGION, process.env.AWS_SECRET_ID);
    return {
        server: serverConfig(secrets),
        database: getNestTypeORMConfig(secrets),
        logger: loggerConfig(),
        redis: redisConfig(secrets),
        bull: bullConfig(),
        xrp: xrpConfig(),
        xumm: xummConfig(secrets),
        pinata: pinataConfig(secrets),
        aws: awsS3Config(secrets),
        defaultImages: defaultImagesConfig(),
    };
};
