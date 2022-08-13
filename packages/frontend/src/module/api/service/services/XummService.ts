/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class XummService {

    /**
     * Get XUMM transaction status by uuid
     * @param uuid
     * @returns any
     * @throws ApiError
     */
    public static xummControllerGetStatusByUuid(
        uuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/xumm/status/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * Sign in with XUMM
     * @returns any
     * @throws ApiError
     */
    public static xummAuthControllerSignIn(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/xumm/auth/sign-in',
        });
    }

    /**
     * Verify sign in with XUMM
     * @returns void
     * @throws ApiError
     */
    public static xummAuthControllerVerifySignIn(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/xumm/auth/verify-sign-in',
        });
    }

}
