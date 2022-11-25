import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { Typography } from "@peersyst/react-components";

const NftPublishError = (): JSX.Element => {
    return (
        <PublishResult title={"Something bad happened..."} type="error">
            <Typography variant="body1">mock_error</Typography>
        </PublishResult>
    );
};

export default NftPublishError;
