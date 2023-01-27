/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XummTransactionStatusDto = {
    status: 'declined' | 'signed' | 'pending' | 'bad-signature' | 'cancelled' | 'expired';
    txHash?: string;
};

