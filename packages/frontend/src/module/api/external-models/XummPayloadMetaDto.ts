/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XummPayloadMetaDto = {
    exists: boolean;
    uuid: string;
    multisign: boolean;
    submit: boolean;
    destination: string;
    resolved_destination: string;
    resolved: boolean;
    signed: boolean;
    cancelled: boolean;
    expired: boolean;
    pushed: boolean;
    app_opened: boolean;
    opened_by_deeplink: boolean | null;
    immutable?: boolean;
    forceAccount?: boolean;
    return_url_app: string | null;
    return_url_web: string | null;
    is_xapp: boolean;
    signers: Array<string> | null;
};

