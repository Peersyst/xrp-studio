import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { StorageModule } from "@peersyst/storage-module/src/storage.module";

@Module({
    imports: [StorageModule],
    controllers: [FileController],
    providers: [],
    exports: [],
})
export class FileModule {}
