import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { XummAuthenticated } from "@peersyst/xumm-module";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageServiceInterface } from "@peersyst/storage-module/src/storage.module";
import imageFileFilter from "./util/image-file.filter";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "@nestjs/config";

@ApiTags("file")
@Controller("file")
@ApiErrorDecorators()
export class FileController {
    constructor(
        @Inject("StorageService") private readonly storageService: StorageServiceInterface,
        private readonly configService: ConfigService,
    ) {}

    @Post("image")
    @ApiOperation({ description: "Upload an image file" })
    @UseInterceptors(
        FileInterceptor("file", {
            limits: {
                fileSize: 4000000,
            },
            fileFilter: imageFileFilter,
        }),
    )
    @XummAuthenticated()
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
        const fileName = uuidv4() + "." + file.originalname.split(".").pop();
        await this.storageService.storeFileFromBuffer(file.buffer, {
            mimetype: file.mimetype,
            size: file.size,
            path: fileName,
        });

        return this.configService.get("aws.bucketUrl") + "/" + fileName;
    }
}
