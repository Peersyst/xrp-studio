/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNftDraftRequest } from '../models/CreateNftDraftRequest';
import type { NftDraftDto } from '../models/NftDraftDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NftService {

    /**
     * Create an NFT draft
     * @param requestBody
     * @returns NftDraftDto
     * @throws ApiError
     */
    public static nftControllerCreateNftDraft(
        requestBody: CreateNftDraftRequest,
    ): CancelablePromise<NftDraftDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nfts/draft',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
