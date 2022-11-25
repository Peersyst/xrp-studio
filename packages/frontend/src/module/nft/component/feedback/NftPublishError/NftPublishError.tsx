import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

interface NftPublishErrorProps {
    error: string | null;
}

const NftPublishError = ({ error }: NftPublishErrorProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <PublishResult title={translate("errorTitle")} type="error">
            <Typography variant="body1">{error?.toString()}</Typography>
        </PublishResult>
    );
};

export default NftPublishError;
