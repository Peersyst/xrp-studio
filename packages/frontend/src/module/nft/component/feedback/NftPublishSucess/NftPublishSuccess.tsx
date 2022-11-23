import useTranslate from "module/common/hook/useTranslate";
import PublishResult from "module/common/component/feedback/PublishResult/PublishResult";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";

const NftPublishSuccess = (): JSX.Element => {
    const translate = useTranslate();

    const publishSuccessContent: InformationField[] = [
        {
            label: translate("hashTransactionCreation"),
            content: "mock_transactionHash",
        },
        {
            label: translate("tokenId"),
            content: "mock_id",
        },
        {
            label: translate("transferFeeCost"),
            content: "mock_transactionFee",
        },
    ];

    return (
        <PublishResult title={translate("successTitle")} type="success">
            <InformationFields fields={publishSuccessContent} />
        </PublishResult>
    );
};

export default NftPublishSuccess;
