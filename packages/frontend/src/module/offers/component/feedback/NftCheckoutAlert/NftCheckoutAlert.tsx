import { Alert } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

export interface NftCheckoutAlertProps {
    hasBalance: boolean;
}

function NftCheckoutAlert({ hasBalance }: NftCheckoutAlertProps): JSX.Element {
    const translateError = useTranslate("error");
    return <>{hasBalance && <Alert content={translateError("notEnoughBalanceToBuyNft")} type="info" />}</>;
}

export default NftCheckoutAlert;
