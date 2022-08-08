/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionDto } from '../models/CollectionDto';
import type { CreateCollectionRequest } from '../models/CreateCollectionRequest';
import type { PaginatedCollectionDto } from '../models/PaginatedCollectionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CollectionService {

    /**
     * Gets a collection
     * @param id
     * @returns CollectionDto
     * @throws ApiError
     */
    public static collectionControllerGetCollection(
        id: number,
    ): CancelablePromise<CollectionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/collection/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get all Collections
     * @param page
     * @param pageSize
     * @param query
     * @param account
     * @param order
     * @returns PaginatedCollectionDto
     * @throws ApiError
     */
    public static collectionControllerGetCollections(
        page?: number,
        pageSize?: number,
        query?: string,
        account?: string,
        order?: 'ASC' | 'DESC',
    ): CancelablePromise<PaginatedCollectionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/collection',
            query: {
                'page': page,
                'pageSize': pageSize,
                'query': query,
                'account': account,
                'order': order,
            },
        });
    }

    /**
     * Create a collection
     * @param requestBody
     * @returns CollectionDto
     * @throws ApiError
     */
    public static collectionControllerCreateCollection(
        requestBody: CreateCollectionRequest,
    ): CancelablePromise<CollectionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/collection',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
