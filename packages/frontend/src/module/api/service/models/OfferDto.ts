/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

export type OfferDto = {
    id: number;
    offerId: string;
    offerHash: string;
    creatorUser?: UserDto;
    accepterUser?: UserDto;
    acceptOfferHash?: string;
    destination?: string;
    amount?: string;
    expiration?: number;
};

