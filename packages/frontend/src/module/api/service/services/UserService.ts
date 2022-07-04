/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from '../models/CreateUserRequest';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Create user
     * @param requestBody
     * @returns UserDto
     * @throws ApiError
     */
    public static userControllerCreate(
        requestBody: CreateUserRequest,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Show user info
     * @returns UserDto
     * @throws ApiError
     */
    public static userControllerInfo(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/info',
        });
    }

    /**
     * Find all users
     * @returns UserDto
     * @throws ApiError
     */
    public static userControllerFindAll(): CancelablePromise<Array<UserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/all',
        });
    }

}
