/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateOfferRequest = {
    nftId: number;
    /**
     * Price in drops
     */
    price: string;
    destination?: string;
    expiration?: number;
    owner?: string;
    type: string;
};

