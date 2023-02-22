import { NftCreationForm } from "module/nft/types";

export const NftFormFields: Record<keyof NftCreationForm, keyof NftCreationForm> = {
    image: "image",
    name: "name",
    description: "description",
    collection: "collection",
    issuer: "issuer",
    transferFee: "transferFee",
    externalUrl: "externalUrl",
    backgroundColor: "backgroundColor",
    burnable: "burnable",
    onlyXRP: "onlyXRP",
    trustLine: "trustLine",
    transferable: "transferable",
    attributes: "attributes",
    phygital: "phygital",
};
