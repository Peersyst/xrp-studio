/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TrendsDto } from '../models/TrendsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TrendService {

    /**
     * Get trends
     * @returns TrendsDto
     * @throws ApiError
     */
    public static trendControllerGetTrends(): CancelablePromise<TrendsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trend',
        });
    }

}
