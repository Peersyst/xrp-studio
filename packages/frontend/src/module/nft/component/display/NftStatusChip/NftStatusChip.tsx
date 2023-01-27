import { NftStatusChipRoot } from "./NftStatusChip.styles";
import { NftStatusChipProps } from "module/nft/component/display/NftStatusChip/NftStatusChip.types";
import useTranslate from "module/common/hook/useTranslate";
import { cx } from "@peersyst/react-utils";

const NftStatusChip = ({ status, label: labelProp, className, ...restChipProps }: NftStatusChipProps): JSX.Element => {
    const translate = useTranslate();

    const label = labelProp || translate(status);

    return <NftStatusChipRoot label={label} className={cx("nft-status-chip", status, className)} {...restChipProps} />;
};

export default NftStatusChip;
