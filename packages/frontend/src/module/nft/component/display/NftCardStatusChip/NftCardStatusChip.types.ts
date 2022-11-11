import { ChipProps } from "@peersyst/react-components";

export type NftStatus = "draft" | "pending" | "failed" | "confirmed";

export interface NftCardStatusChipProps extends ChipProps {
    status: NftStatus;
    idNFT: number;
}
