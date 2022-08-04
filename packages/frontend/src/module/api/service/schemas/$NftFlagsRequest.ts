/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NftFlagsRequest = {
    properties: {
        burnable: {
            type: 'boolean',
            description: `If set, indicates that the issuer (or an entity authorized by the issuer) can destroy the object. The object's owner can always do so.`,
        },
        onlyXRP: {
            type: 'boolean',
            description: `If set, indicates that the tokens can only be offered or sold for XRP.`,
        },
        trustLine: {
            type: 'boolean',
            description: `If set, indicates that the issuer wants a trustline to be automatically created. The lsfTrustLine field is useful when the token can be offered for sale for assets other than XRP and the issuer charges a TransferFee. If this flag is set, a trust line is automatically created as needed to allow the issuer to receive the appropriate transfer fee. If this flag is not set, an attempt to transfer the NFToken for an asset for which the issuer does not have a trustline fails.`,
        },
        transferable: {
            type: 'boolean',
            description: `If set, indicates that this NFT can be transferred. This flag has no effect if the token is being transferred from the issuer or to the issuer.`,
        },
    },
} as const;
