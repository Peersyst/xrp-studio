import { Col, Typography } from "@peersyst/react-components";
import InformationField from "module/common/component/display/InformationField/InformationField";
import useTranslate from "module/common/hook/useTranslate";

const NftPublishSuccess = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <Col gap="2rem">
            <Typography variant="h6" fontWeight={700}>
                Process completed!
            </Typography>
            <Col gap="1rem" flex={1} style={{ width: "100%" }}>
                <InformationField title={"Transaction hash"}>
                    <Typography variant="body2">rKPK5miro1LNnN4dejRzXpNjWqZ2R2Yb5h</Typography>
                </InformationField>
                <InformationField title={"Token id"}>
                    <Typography variant="body2">1</Typography>
                </InformationField>
                <InformationField title={translate("transferFee")}>
                    <Typography variant="body2">0.5 XRP</Typography>
                </InformationField>
            </Col>
        </Col>
    );
};

export default NftPublishSuccess;
