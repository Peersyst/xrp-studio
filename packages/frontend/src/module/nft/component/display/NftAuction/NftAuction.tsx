import { Row, Typography } from "@peersyst/react-components";
import config from "config/config";
import Button from "module/common/component/input/Button/Button";
import Link from "module/common/component/navigation/Link/Link";
import useTranslate from "module/common/hook/useTranslate";

export type NftAuctionProps = {
    nftId?: number;
};

function NftAuction({ nftId }: NftAuctionProps): JSX.Element {
    const translate = useTranslate();

    return (
        <Row justifyContent={"space-between"} alignItems="center">
            <Link type="href" target="_blank" to={config.auction.googleFormsUrl}>
                <Button variant="tertiary">{translate("bet")}</Button>
            </Link>
            <Typography fontStyle="italic" variant="body1">
                {translate("highestBet", { amount: 0 })}
            </Typography>
        </Row>
    );
}

export default NftAuction;
