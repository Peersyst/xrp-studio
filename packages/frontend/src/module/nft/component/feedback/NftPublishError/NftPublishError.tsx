import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

const NftPublishError = (): JSX.Element => {
    const translate = useTranslate();

    return (
        <PublishResult title={translate("errorTitle")} type="error">
            <Typography variant="body1">mock_error</Typography>
        </PublishResult>
    );
};

export default NftPublishError;
