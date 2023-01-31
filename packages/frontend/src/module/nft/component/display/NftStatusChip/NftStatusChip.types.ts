import { NftDto } from "module/api/service";
import { ChipProps } from "@peersyst/react-components";
import { Loosen } from "@peersyst/react-types";

export interface NftStatusChipProps extends Loosen<ChipProps, "label"> {
    status: NftDto["status"];
}
