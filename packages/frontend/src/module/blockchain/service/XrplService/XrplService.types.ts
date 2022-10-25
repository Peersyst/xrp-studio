import { AccountTxRequest, AccountTxResponse } from "xrpl";

export enum XrplServiceErrors {
    ACCOUNT_NOT_FOUND = "Account not found.",
}

export interface CreateGetAccountTxRequestParams {
    limit?: AccountTxRequest["limit"];
    account: AccountTxRequest["account"];
    marker?: AccountTxRequest["marker"];
}

export type AccountTransactions = AccountTxResponse["result"]["transactions"];

export type XrplMarker = AccountTxResponse["result"]["marker"];

export interface getLatestAccountTxsResponse {
    transactions: AccountTransactions;
    marker?: XrplMarker;
}
