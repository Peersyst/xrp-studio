import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import config from "config/config";
import Balance from "module/common/component/display/Balance/Balance";
import Button from "module/common/component/input/Button/Button";
import Link from "module/common/component/navigation/Link/Link";
import useTranslate from "module/common/hook/useTranslate";
import { Dot } from "./NftSell.styles";
import useIsNftSell from "module/nft/query/useIsNftSell";

export type NftAuctionProps = {
    nftId?: number;
};

function NftSell({ nftId }: NftAuctionProps): JSX.Element {
    const translate = useTranslate();
    const nftSell = config.nftsInSell[String(nftId)];
    const { data, isLoading } = useIsNftSell(nftSell?.googleSheetId || "");

    return (
        <Skeleton loading={isLoading} width="100%" height="4rem">
            {isLoading === false && data === undefined && (
                <Row justifyContent={"space-between"} alignItems="center">
                    <Row alignItems={"center"} gap="0.2rem">
                        <Dot />
                        <Col gap="0.5rem">
                            <Typography variant="body1">{translate("forSale")}</Typography>
                        </Col>
                    </Row>
                    <Skeleton loading={isLoading} width="25%">
                        <Col gap="0.5rem" alignItems={"end"} style={{ textAlign: "right" }}>
                            <Typography variant="body2" light>
                                {translate("price")}
                            </Typography>
                            <Balance variant="body1" balance={nftSell?.price || 0} units="€" unitsPosition="left" />
                        </Col>
                    </Skeleton>
                    <Link type="href" target="_blank" to={nftSell?.googleForm || ""}>
                        <Button>{translate("buy")}</Button>
                    </Link>
                </Row>
            )}
        </Skeleton>
    );
}

export default NftSell;
