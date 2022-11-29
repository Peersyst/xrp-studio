import ActionsResult from "module/common/component/feedback/ActionsResult/ActionsResult";
import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

interface NftPublishErrorProps {
    error: unknown;
}

const NftPublishError = ({ error }: NftPublishErrorProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <ActionsResult title={translate("errorTitle")} type="error">
            <Typography variant="body1">{error?.toString()}</Typography>
        </ActionsResult>
    );
};

export default NftPublishError;
