import { NFTokenMintFlagsInterface } from "xrpl/dist/npm/models/transactions/NFTokenMint";

/**
 * Transforms NFTokenMintFlagsInterface object into its numeric representation
 * @param tfBurnable
 * @param tfOnlyXRP
 * @param tfTrustLine
 * @param tfTransferable
 */
export default function ({
    tfBurnable = false,
    tfOnlyXRP = false,
    tfTrustLine = false,
    tfTransferable = false,
}: NFTokenMintFlagsInterface): number {
    return +tfBurnable + +tfOnlyXRP * 2 + +tfTrustLine * 4 + +tfTransferable * 8;
}
