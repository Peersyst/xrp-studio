/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

/**
 * Upload a file to the server
 * @returns the url of the uploaded file
 * @throws ApiError
 */
export async function uploadFile(file: File): Promise<string> {
    return __request(OpenAPI, {
        method: "POST",
        url: "/api/file/image",
        formData: {
            file,
        },
    });
}
