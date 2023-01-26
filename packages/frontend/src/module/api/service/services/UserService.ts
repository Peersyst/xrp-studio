/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailabilityDto } from '../models/AvailabilityDto';
import type { UpdateUserRequest } from '../models/UpdateUserRequest';
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
            url: '/api/user/{address}',
            path: {
                'address': address,
            },
        });
    }

    /**
     * Check if the name of a user already exists.
     * @param name
     * @returns AvailabilityDto
     * @throws ApiError
     */
    public static userControllerUserNameAvailability(
        name: string,
    ): CancelablePromise<AvailabilityDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/name-availability/{name}',
            path: {
                'name': name,
            },
        });
    }

    /**
     * Updates a user
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static userControllerUpdateUser(
        requestBody: UpdateUserRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
