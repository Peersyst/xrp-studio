import { Common } from "@peersyst/react-types";
import { NftDraftDto, NftDto } from "module/api/service";

export default function (nft: Common<NftDto, NftDraftDto>): boolean {
    return nft.status === "draft" || nft.status === "failed";
}
