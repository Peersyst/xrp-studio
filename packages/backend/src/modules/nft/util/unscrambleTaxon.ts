/**
 * From https://github.com/XRPLF/xrpl.js/blob/0f132744/packages/xrpl/src/utils/parseNFTokenID.ts#L54 as it is not exported from xrpl
 *
 * An issuer may issue several NFTs with the same taxon; to ensure that NFTs are
 * spread across multiple pages we lightly mix the taxon up by using the sequence
 * (which is not under the issuer's direct control) as the seed for a simple linear
 * congruential generator.
 *
 * From the Hull-Dobell theorem we know that f(x)=(m*x+c) mod n will yield a
 * permutation of [0, n) when n is a power of 2 if m is congruent to 1 mod 4 and
 * c is odd. By doing a bitwise XOR with this permutation we can scramble/unscramble
 * the taxon.
 *
 * The XLS-20d proposal fixes m = 384160001 and c = 2459.
 * We then take the modulus of 2^32 which is 4294967296.
 *
 * @param taxon - The scrambled or unscrambled taxon (The XOR is both the encoding and decoding)
 * @param tokenSeq - The account sequence when the token was minted. Used as a psuedorandom seed.
 * @returns the opposite taxon. If the taxon was scrambled it becomes unscrambled, and vice versa.
 */
export default function unscrambleTaxon(taxon: number, tokenSeq: number): number {
    /* eslint-disable no-bitwise -- XOR is part of the encode/decode scheme. */
    return (taxon ^ (384160001 * tokenSeq + 2459)) % 4294967296 >>> 0;
    /* eslint-enable no-bitwise */
}
