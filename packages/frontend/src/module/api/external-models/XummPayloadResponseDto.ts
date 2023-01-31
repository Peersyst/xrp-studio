/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XummPayloadResponseDto = {
    hex: string | null;
    txid: string | null;
    resolved_at: string | null;
    dispatched_nodetype: string | null;
    dispatched_to: string | null;
    dispatched_result: string | null;
    dispatched_to_node: boolean | null;
    environment_nodeuri: string | null;
    environment_nodetype: string | null;
    multisign_account: string | null;
    account: string | null;
    signer: string | null;
    approved_with?: any;
};

