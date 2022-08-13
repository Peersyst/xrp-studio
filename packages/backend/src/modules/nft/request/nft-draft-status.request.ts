import { IsArray, IsInt, IsOptional } from "class-validator";

export class NftDraftStatusRequest {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    ids?: number[];
}
