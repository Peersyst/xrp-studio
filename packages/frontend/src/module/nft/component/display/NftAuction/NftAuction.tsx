import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import config from "config/config";
import Balance from "module/common/component/display/Balance/Balance";
import Button from "module/common/component/input/Button/Button";
import Link from "module/common/component/navigation/Link/Link";
import useTranslate from "module/common/hook/useTranslate";
import useGetAuctionNftById from "module/nft/query/useGetAuctionNftById";
import { Dot } from "./NftAuction.styles";

export type NftAuctionProps = {
    nftId?: number;
};

function NftAuction({ nftId }: NftAuctionProps): JSX.Element {
    const translate = useTranslate();
    const auctionConfig = config.auction.nftsInAuction.find((auction) => auction.id === nftId);
    const dateAuction = new Date(auctionConfig?.endDate || "").toLocaleString("es").split(", ");
    const { data: auction, isLoading } = useGetAuctionNftById(auctionConfig?.googleSheetId || "");
    return (
        <Row justifyContent={"space-between"} alignItems="center">
            <Row alignItems={"center"} gap="0.2rem">
                <Dot />
                <Col gap="0.5rem">
                    <Typography variant="body1">{translate("liveAcution")}</Typography>
                    <Typography variant="body2" light>
                        {translate("untilAt", { date: dateAuction && dateAuction[0], hour: dateAuction && dateAuction[1] })}
                    </Typography>
                </Col>
            </Row>
            <Skeleton loading={isLoading} width="25%">
                <Col gap="0.5rem" alignItems={"end"} style={{ textAlign: "right" }}>
                    <Typography variant="body2" light>
                        {translate("hightestBid")}
                    </Typography>
                    <Balance variant="body1" balance={auction || 0} units="€" unitsPosition="left" />
                </Col>
            </Skeleton>
            <Link type="href" target="_blank" to={auctionConfig?.googleForm || ""}>
                <Button>{translate("bet")}</Button>
            </Link>
        </Row>
    );
}

export default NftAuction;
