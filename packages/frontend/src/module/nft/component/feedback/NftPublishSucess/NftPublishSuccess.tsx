import { Col, Typography } from "@peersyst/react-components";
import InformationField from "module/common/component/display/InformationField/InformationField";
import useTranslate from "module/common/hook/useTranslate";

const NftPublishSuccess = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <Col gap="2rem">
            <Typography variant="h6" fontWeight={700}>
                {translate("successTitle")}
            </Typography>
            <Col gap="1rem">
                <InformationField title={translate("hashTransactionCreation")}>
                    <Typography variant="body2">mock_transactionHash</Typography>
                </InformationField>
                <InformationField title={translate("tokenId")}>
                    <Typography variant="body2">mock_id</Typography>
                </InformationField>
                <InformationField title={translate("transferFeeCost")}>
                    <Typography variant="body2">mock_transactionFee</Typography>
                </InformationField>
            </Col>
        </Col>
    );
};

export default NftPublishSuccess;
