import useTranslate from "module/common/hook/useTranslate";
import { Col, ErrorIcon, Row, Skeleton, Typography } from "@peersyst/react-components";
import { DropNftBuyModalInformationProps } from "./DropNftBuyModalInformation.types";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { dropsToXrp } from "xrpl";
import { XrpIcon } from "icons";

const DropNftBuyModalInformation = ({
    loading = false,
    drop,
    collection,
    hasEnoughBalance,
}: DropNftBuyModalInformationProps): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const formatNumber = useFormatNumber();

    return (
        <Skeleton loading={loading}>
            <Row flex={1} alignItems="center">
                <Col flex={1} justifyContent="center" alignItems="center" gap="1rem">
                    {hasEnoughBalance ? (
                        <>
                            <XrpIcon css={{ fontSize: "2.5rem" }} />
                            <Typography variant="body1" textAlign="center">
                                {translate("buyRandomNft", { collection: collection, price: formatNumber(dropsToXrp(drop?.price || "0")) })}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <ErrorIcon css={{ fontSize: "2.5rem" }} />
                            <Typography variant="body1" textAlign="center">
                                {translateError("notEnoughBalanceToBuyNftFromDrop")}
                            </Typography>
                        </>
                    )}
                </Col>
            </Row>
        </Skeleton>
    );
};

export default DropNftBuyModalInformation;
