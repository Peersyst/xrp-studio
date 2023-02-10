import { NftCreationForm } from "module/nft/types";
import { CreateNftDraftRequest } from "module/api/service";

/**
 * Creates a CreateNftRequest/UpdateNftRequest from an NftCreationForm
 * Note the || undefined in most fields.
 *   Firstly,if a property is not specified it must be set to undefined instead of "", the default value of inouts.
 *   Secondly, issuer must never be "", because it is set to the creator address by default if not specified
 * @param name
 * @param description
 * @param image
 * @param backgroundColor
 * @param externalUrl
 * @param attributes
 * @param collection
 * @param issuer
 * @param transferFee
 * @param burnable
 * @param onlyXRP
 * @param trustLine
 * @param transferable
 */
export default function ({
    name,
    description,
    image,
    backgroundColor,
    externalUrl,
    attributes = [],
    collection,
    issuer,
    transferFee,
    burnable,
    onlyXRP,
    transferable,
    phygital,
}: NftCreationForm): CreateNftDraftRequest {
    return {
        issuer: issuer || undefined,
        transferFee: transferFee ? Number(transferFee) * 1000 : undefined,
        flags: {
            burnable,
            onlyXRP,
            trustLine: false,
            transferable,
        },
        taxon: collection ? Number(collection) : undefined,
        metadata: {
            name: name || undefined,
            description: description || undefined,
            image: image || undefined,
            backgroundColor: backgroundColor?.hex(),
            externalUrl: externalUrl || undefined,
            attributes: phygital ? [...attributes, { traitType: "Phygital Public Key", value: phygital }] : attributes,
        },
    };
}
