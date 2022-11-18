import { Col, Typography } from "@peersyst/react-components";
import InformationField from "module/common/component/display/InformationField/InformationField";

const NftPublishSuccess = (): JSX.Element => {
    return (
        <Col gap="1rem" flex={1} justifyContent="center">
            <Typography variant="h6">Success</Typography>
            <InformationField title={"Transaction hash"}>
                <Typography variant="body2">rKPK5miro1LNnN4dejRzXpNjWqZ2R2Yb5h</Typography>
            </InformationField>
            <InformationField title={"Token id:"}>
                <Typography variant="body2">1</Typography>
            </InformationField>
        </Col>
    );
};

export default NftPublishSuccess;
