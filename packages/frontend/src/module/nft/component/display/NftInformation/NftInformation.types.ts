import { NftCreationForm } from "module/nft/types";

export type NftInformationProps = Pick<
    NftCreationForm,
    "name" | "issuer" | "collection" | "transferFee" | "burnable" | "onlyXRP" | "trustLine" | "transferable"
>;
