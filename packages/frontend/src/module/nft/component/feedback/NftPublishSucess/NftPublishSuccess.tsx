import useTranslate from "module/common/hook/useTranslate";
import ActionsResult from "module/common/component/feedback/ActionsResult/ActionsResult";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";
import useGetNft from "module/nft/query/useGetNft";
import { LoaderIcon } from "@peersyst/react-components";

interface NftPublishSuccessProps {
    id: number | undefined;
}

const NftPublishSuccess = ({ id }: NftPublishSuccessProps): JSX.Element => {
    const translate = useTranslate();

    const { data: nftData, isLoading: isNftLoading } = useGetNft(id);

    const publishSuccessContent: InformationField[] = [
        {
            label: translate("hashTransactionCreation"),
            content: nftData?.mintTransactionHash,
        },
        {
            label: translate("tokenId"),
            content: nftData?.id,
        },
        {
            label: translate("transferFeeCost"),
            content: nftData?.transferFee?.toString(),
        },
    ];

    return (
        <ActionsResult title={translate("successTitle")} type="success">
            {isNftLoading ? <LoaderIcon /> : <InformationFields fields={publishSuccessContent} style={{ wordBreak: "break-all" }} />}
        </ActionsResult>
    );
};

export default NftPublishSuccess;
