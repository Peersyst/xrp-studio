import { ChipProps } from "@peersyst/react-components";
import { Nft } from "module/nft/types";

export type NftStatus = "draft" | "pending" | "failed" | "confirmed";

export interface NftCardStatusChipProps extends Omit<ChipProps, "label"> {
    nft: Nft;
}
