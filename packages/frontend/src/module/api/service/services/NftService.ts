/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNftDraftRequest } from '../models/CreateNftDraftRequest';
import type { NftDraftDto } from '../models/NftDraftDto';
import type { UpdateNftDraftRequest } from '../models/UpdateNftDraftRequest';

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
            url: '/api/nft/draft',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update an NFT draft
     * @param id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static nftControllerUpdateNftDraft(
        id: number,
        requestBody: UpdateNftDraftRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nft/draft/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
