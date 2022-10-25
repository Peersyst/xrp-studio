/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNftDraftRequest } from '../models/CreateNftDraftRequest';
import type { NftDraftDto } from '../models/NftDraftDto';
import type { NftDto } from '../models/NftDto';
import type { PaginatedNftDraftDto } from '../models/PaginatedNftDraftDto';
import type { PaginatedNftDto } from '../models/PaginatedNftDto';
import type { UpdateNftDraftRequest } from '../models/UpdateNftDraftRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NftService {

    /**
     * Create an NFT
     * @param requestBody
     * @returns NftDraftDto
     * @throws ApiError
     */
    public static nftControllerCreateNft(
        requestBody: CreateNftDraftRequest,
    ): CancelablePromise<NftDraftDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nft',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get all NFTs (status = confirmed) paginated
     * @param page
     * @param pageSize
     * @param query
     * @param collections
     * @param order
     * @param account
     * @returns PaginatedNftDto
     * @throws ApiError
     */
    public static nftControllerGetNfts(
        page?: number,
        pageSize?: number,
        query?: string,
        collections?: Array<number>,
        order?: 'ASC' | 'DESC',
        account?: string,
    ): CancelablePromise<PaginatedNftDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nft',
            query: {
                'page': page,
                'pageSize': pageSize,
                'query': query,
                'collections': collections,
                'order': order,
                'account': account,
            },
        });
    }

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
     * Get all user NFT drafts (status != confirmed) paginated
     * @param page
     * @param pageSize
     * @param query
     * @param collections
     * @param order
     * @param status
     * @returns PaginatedNftDraftDto
     * @throws ApiError
     */
    public static nftControllerGetNftDrafts(
        page?: number,
        pageSize?: number,
        query?: string,
        collections?: Array<number>,
        order?: 'ASC' | 'DESC',
        status?: 'draft' | 'pending' | 'failed',
    ): CancelablePromise<PaginatedNftDraftDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nft/draft',
            query: {
                'page': page,
                'pageSize': pageSize,
                'query': query,
                'collections': collections,
                'order': order,
                'status': status,
            },
        });
    }

    /**
     * Update an NFT draft
     * @param id
     * @param requestBody
     * @param publish
     * @returns void
     * @throws ApiError
     */
    public static nftControllerUpdateNftDraft(
        id: number,
        requestBody: UpdateNftDraftRequest,
        publish?: boolean,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nft/draft/{id}',
            path: {
                'id': id,
            },
            query: {
                'publish': publish,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get a single NFT draft (status != confirmed)
     * @param id
     * @returns NftDraftDto
     * @throws ApiError
     */
    public static nftControllerGetNftDraft(
        id: number,
    ): CancelablePromise<NftDraftDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nft/draft/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Publish an NFT draft
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static nftControllerPublishNftDraft(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/nft/draft/{id}/publish',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get a single NFT (status = confirmed)
     * @param id
     * @returns NftDto
     * @throws ApiError
     */
    public static nftControllerGetNft(
        id: number,
    ): CancelablePromise<NftDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nft/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get the status of a single or many NFT drafts
     * @param id
     * @param ids
     * @returns any
     * @throws ApiError
     */
    public static nftControllerGetNftDraftStatus(
        id?: number,
        ids?: Array<number>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nft/draft/status',
            query: {
                'id': id,
                'ids': ids,
            },
        });
    }

}
