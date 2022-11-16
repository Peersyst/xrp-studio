/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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

}
