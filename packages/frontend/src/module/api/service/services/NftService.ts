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
     * @param collection
     * @param order
     * @param status
     * @returns PaginatedNftDraftDto
     * @throws ApiError
     */
    public static nftControllerGetNftDrafts(
        page?: number,
        pageSize?: number,
        query?: string,
        collection?: number,
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
                'collection': collection,
                'order': order,
                'status': status,
            },
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
     * Get all NFTs (status = confirmed) paginated
     * @param page
     * @param pageSize
     * @param query
     * @param collection
     * @param order
     * @param account
     * @returns PaginatedNftDto
     * @throws ApiError
     */
    public static nftControllerGetNfts(
        page?: number,
        pageSize?: number,
        query?: string,
        collection?: number,
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
                'collection': collection,
                'order': order,
                'account': account,
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

}
