import { ChipProps } from "@peersyst/react-components";
import { NftDraftDto, NftDto } from "module/api/service";

export type NftStatus = "draft" | "pending" | "failed" | "confirmed";

export interface NftCardStatusChipProps extends Omit<ChipProps, "label"> {
    nft: NftDto | NftDraftDto;
}
