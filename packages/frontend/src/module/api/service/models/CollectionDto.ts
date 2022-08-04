/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

export type CollectionDto = {
    id: number;
    taxon: string;
    name?: string;
    description?: string;
    image?: string;
    header?: string;
    user: UserDto;
};

