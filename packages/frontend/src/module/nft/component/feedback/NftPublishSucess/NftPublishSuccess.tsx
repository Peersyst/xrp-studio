import useTranslate from "module/common/hook/useTranslate";
import ActionsResult from "module/common/component/feedback/ActionsResult/ActionsResult";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";
import useGetNft from "module/nft/query/useGetNft";
import { LoaderIcon } from "@peersyst/react-components";
import { config } from "config";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import { useFormatBalance } from "module/common/component/display/Balance/hook/useFormatBalance";

interface NftPublishSuccessProps {
    id: number | undefined;
}

const NftPublishSuccess = ({ id }: NftPublishSuccessProps): JSX.Element => {
    const translate = useTranslate();
    const formatBalance = useFormatBalance();

    const { data: nftData, isLoading: isNftLoading } = useGetNft(id);

    const publishSuccessContent: InformationField[] = [
        {
            label: translate("mintTransactionHash"),
            content: nftData?.mintTransactionHash,
        },
        {
            label: translate("tokenId"),
            content: nftData?.id,
        },
        {
            label: translate("transferFeeCost"),
            content: formatBalance(XrplService.dropsToXrp(config.feeInDrops.toString()), { units: config.tokenName }),
        },
    ];

    return (
        <ActionsResult title={translate("publishNftSuccessStepTitle")} type="success">
            {isNftLoading ? <LoaderIcon /> : <InformationFields fields={publishSuccessContent} css={{ wordBreak: "break-all" }} />}
        </ActionsResult>
    );
};

export default NftPublishSuccess;
