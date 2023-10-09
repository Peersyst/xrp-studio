import { Row, Skeleton, Typography } from "@peersyst/react-components";
import config from "config/config";
import Button from "module/common/component/input/Button/Button";
import Link from "module/common/component/navigation/Link/Link";
import useTranslate from "module/common/hook/useTranslate";
import useGetAuctionNftById from "module/nft/query/useGetAuctionNftById";

export type NftAuctionProps = {
    nftId?: number;
};

function NftAuction({ nftId }: NftAuctionProps): JSX.Element {
    const translate = useTranslate();
    const { data: auction, isLoading } = useGetAuctionNftById(nftId);
    return (
        <Row justifyContent={"space-between"} alignItems="center">
            <Link type="href" target="_blank" to={config.auction.googleFormsUrl}>
                <Button variant="tertiary">{translate("bet")}</Button>
            </Link>
            <Skeleton loading={isLoading} width="50%">
                <Typography fontStyle="italic" variant="body1">
                    {translate("highestBet", { amount: auction || 0 })}
                </Typography>
            </Skeleton>
        </Row>
    );
}

export default NftAuction;
