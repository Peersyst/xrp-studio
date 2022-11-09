import { WithSkeleton } from "@peersyst/react-components";
import NftStatusChipPopover from "../NftCardStatusChipPopover/NftStatusChipPopover";
import { NftCardChip } from "./NftCardStatusChip.styles";
import { NftCardStatusChipProps } from "./NftCardStatusChip.types";

const NftCardStatusChip = ({ label, status, id }: WithSkeleton<NftCardStatusChipProps>): JSX.Element => {
    return (
        <>
            {status === "failed" ? (
                <NftStatusChipPopover label={label} status={status} id={id} />
            ) : (
                <NftCardChip label={label} status={status} />
            )}
        </>
    );
};

export default NftCardStatusChip;
