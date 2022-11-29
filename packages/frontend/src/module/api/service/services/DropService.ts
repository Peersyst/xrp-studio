/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDropRequest } from '../models/CreateDropRequest';
import type { DropDto } from '../models/DropDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DropService {

    /**
     * Gets a drop
     * @param id
     * @returns DropDto
     * @throws ApiError
     */
    public static dropControllerGetDrop(
        id: number,
    ): CancelablePromise<DropDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/drop/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Publish a drop
     * @param requestBody
     * @returns DropDto
     * @throws ApiError
     */
    public static dropControllerPublishDrop(
        requestBody: CreateDropRequest,
    ): CancelablePromise<DropDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drop',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Sends an minting authorization
     * @returns any
     * @throws ApiError
     */
    public static dropControllerAuthorize(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drop/authorize',
        });
    }

    /**
     * Buys a random nft from drop that is on sale
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static dropControllerBuy(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drop/{id}/buy',
            path: {
                'id': id,
            },
        });
    }

}
