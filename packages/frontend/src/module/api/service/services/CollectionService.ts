/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionDto } from '../models/CollectionDto';
import type { CreateCollectionRequest } from '../models/CreateCollectionRequest';
import type { PaginatedCollectionDto } from '../models/PaginatedCollectionDto';
import type { UpdateCollectionRequest } from '../models/UpdateCollectionRequest';

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
     * Updates a collection
     * @param id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static collectionControllerUpdateCollection(
        id: number,
        requestBody: UpdateCollectionRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/collection/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get all Collections
     * @param page
     * @param pageSize
     * @param query
     * @param account
     * @param order
     * @param orderField
     * @returns PaginatedCollectionDto
     * @throws ApiError
     */
    public static collectionControllerGetCollections(
        page?: number,
        pageSize?: number,
        query?: string,
        account?: string,
        order?: 'ASC' | 'DESC',
        orderField?: 'priority' | 'name',
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
                'orderField': orderField,
            },
        });
    }

    /**
     * Create a collection
     * @param requestBody
     * @param publish
     * @returns CollectionDto
     * @throws ApiError
     */
    public static collectionControllerCreateCollection(
        requestBody: CreateCollectionRequest,
        publish?: boolean,
    ): CancelablePromise<CollectionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/collection',
            query: {
                'publish': publish,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
