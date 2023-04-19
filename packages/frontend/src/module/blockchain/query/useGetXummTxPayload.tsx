import { XummService } from "module/api/service";
import { useMutation, UseMutationResult } from "react-query";
import Queries from "../../../query/queries";

export interface XummJsonTransaction {
    TransactionType: string;
    Account: string;
    NFTokenID: string;
    Destination: string;
    Amount: string;
    Flags: 1;
    Sequence: number;
    Fee: string;
    LastLedgerSequence: number;
}

export interface XummPayloadPayloadDto {
    tx_type: string;
    tx_destination: string;
    tx_destination_tag: number | null;
    request_json: XummJsonTransaction;
    origintype: string | null;
    signmethod: string | null;
    created_at: string;
    expires_at: string;
    expires_in_seconds: number;
    computed?: Record<string, unknown>;
    txid: string;
}

export default function (): UseMutationResult<XummPayloadPayloadDto, unknown, string, unknown> {
    return useMutation([Queries.GET_TX_PAYLOAD], async (uuid: string) => {
        const res = await XummService.xummControllerGetPayload(uuid);
        const payload: Omit<XummPayloadPayloadDto, "txid"> = res.payload;
        return {
            ...payload,
            txid: res.response.txid,
        };
    });
}
