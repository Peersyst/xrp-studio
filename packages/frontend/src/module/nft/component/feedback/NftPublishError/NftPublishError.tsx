import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { Typography } from "@peersyst/react-components";

interface NftPublishErrorProps {
    errorMessage: string;
}

const NftPublishError = ({ errorMessage }: NftPublishErrorProps): JSX.Element => {
    return (
        <PublishResult title={"Something bad happened..."} type="error">
            <Typography variant="body1">{errorMessage}</Typography>
        </PublishResult>
    );
};

export default NftPublishError;
