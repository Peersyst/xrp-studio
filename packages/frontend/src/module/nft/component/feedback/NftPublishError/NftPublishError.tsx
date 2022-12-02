import ActionsResult from "module/common/component/feedback/ActionsResult/ActionsResult";
import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { handleErrorMessage } from "../../../../../query/handleErrorMessage";

interface NftPublishErrorProps {
    error: unknown;
}

const NftPublishError = ({ error }: NftPublishErrorProps): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    return (
        <ActionsResult title={translate("errorTitle")} type="error">
            <Typography variant="body1">{handleErrorMessage(error, translateError).message}</Typography>
        </ActionsResult>
    );
};

export default NftPublishError;
