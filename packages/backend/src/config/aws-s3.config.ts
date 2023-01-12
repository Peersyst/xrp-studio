import { buildConfig } from "./util/config.utils";
import { AwsSecrets } from "./util/loadAwsSecrets";

interface AwsS3Config {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
}

export default (secrets: AwsSecrets): AwsS3Config => {
    return buildConfig<AwsS3Config>({
        region: {
            default: process.env.AWS_S3_REGION || secrets.AWS_S3_REGION,
        },
        accessKeyId: {
            default: process.env.AWS_S3_ACCESS_KEY_ID || secrets.AWS_S3_ACCESS_KEY_ID,
        },
        secretAccessKey: {
            default: process.env.AWS_S3_SECRET_ACCESS_KEY || secrets.AWS_S3_SECRET_ACCESS_KEY,
        },
        bucketName: {
            default: process.env.AWS_S3_BUCKET_NAME || secrets.AWS_S3_BUCKET_NAME,
        },
    });
};
