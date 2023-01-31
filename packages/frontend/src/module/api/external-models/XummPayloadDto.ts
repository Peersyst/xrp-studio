/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { XummPayloadMetaDto } from "./XummPayloadMetaDto";
import { XummPayloadApplicationDto } from "./XummPayloadApplicationDto";
import { XummPayloadPayloadDto } from "./XummPayloadPayloadDto";
import { XummPayloadResponseDto } from "./XummPayloadResponseDto";

export type XummPayloadDto = {
    meta: XummPayloadMetaDto;
    application: XummPayloadApplicationDto;
    payload: XummPayloadPayloadDto;
    response: XummPayloadResponseDto;
    custom_meta: any;
};
