import { XummPostPayloadResponse } from "xumm-sdk/dist/src/types";

export class XummSignInResponseDto {
    access_token: string;
    xummPayload: XummPostPayloadResponse;
}

export class XummVerifiedSignInResponseDto {
    address: string;
    access_token: string;
}
