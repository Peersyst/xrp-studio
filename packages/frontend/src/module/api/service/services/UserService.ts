/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Gets a user
     * @param address
     * @returns UserDto
     * @throws ApiError
     */
    public static userControllerGetUser(
        address: string,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{address}',
            path: {
                'address': address,
            },
        });
    }

}
