/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class AuthenticateService {

    /**
     * Authenticate user with email
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginRequest,
    ): CancelablePromise<void> {
        return __request({
            method: 'POST',
            path: `/api/auth/login`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}