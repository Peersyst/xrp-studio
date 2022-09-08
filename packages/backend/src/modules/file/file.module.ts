import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { StorageModule, StorageType } from "@peersyst/storage-module/src/storage.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        StorageModule.register(ConfigModule, {
            storageType: StorageType.S3,
        }),
    ],
    controllers: [FileController],
    providers: [],
    exports: [],
})
export class FileModule {}
