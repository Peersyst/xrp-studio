/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcceptOfferRequest } from '../models/AcceptOfferRequest';
import type { CreateOfferRequest } from '../models/CreateOfferRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OfferService {

    /**
     * Create an NFTokenCreateOffer
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static offerControllerCreate(
        requestBody: CreateOfferRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/offer/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Accept an NFTokenAcceptOffer to buy or sell an NFToken
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static offerControllerAccept(
        requestBody: AcceptOfferRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/offer/accept',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
