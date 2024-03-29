/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDropRequest } from '../models/CreateDropRequest';
import type { DropDto } from '../models/DropDto';
import type { DropPaymentDto } from '../models/DropPaymentDto';
import type { DropPaymentRequest } from '../models/DropPaymentRequest';
import type { PaginatedDropDto } from '../models/PaginatedDropDto';
import type { RequestBuyNftDto } from '../models/RequestBuyNftDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DropService {

    /**
     * Gets a drop by id
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
     * Gets a drop by drop name and artist name
     * @param path
     * @returns DropDto
     * @throws ApiError
     */
    public static dropControllerGetDropByPath(
        path: string,
    ): CancelablePromise<DropDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/drop/by-path/{path}',
            path: {
                'path': path,
            },
        });
    }

    /**
     * Get all Drops
     * @param page
     * @param pageSize
     * @param query
     * @param account
     * @param isVerifiedArtist
     * @param order
     * @param orderField
     * @returns PaginatedDropDto
     * @throws ApiError
     */
    public static dropControllerGetDrops(
        page?: number,
        pageSize?: number,
        query?: string,
        account?: string,
        isVerifiedArtist?: boolean,
        order?: 'ASC' | 'DESC',
        orderField?: 'priority' | 'name',
    ): CancelablePromise<PaginatedDropDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/drop',
            query: {
                'page': page,
                'pageSize': pageSize,
                'query': query,
                'account': account,
                'isVerifiedArtist': isVerifiedArtist,
                'order': order,
                'orderField': orderField,
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
     * Sends a drop payment request to XUMM
     * @param requestBody
     * @returns DropPaymentDto
     * @throws ApiError
     */
    public static dropControllerPayment(
        requestBody: DropPaymentRequest,
    ): CancelablePromise<DropPaymentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drop/payment',
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
     * @returns RequestBuyNftDto
     * @throws ApiError
     */
    public static dropControllerBuy(
        id: number,
    ): CancelablePromise<RequestBuyNftDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/drop/{id}/buy',
            path: {
                'id': id,
            },
        });
    }

}
