import { IsArray, IsInt, IsOptional } from "class-validator";

export class NftDraftStatusRequest {
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    ids?: number[];
}
