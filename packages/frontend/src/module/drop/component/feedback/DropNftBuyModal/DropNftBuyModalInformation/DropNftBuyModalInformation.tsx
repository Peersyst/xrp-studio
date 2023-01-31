import useTranslate from "module/common/hook/useTranslate";
import { Row, Skeleton, Typography } from "@peersyst/react-components";
import { DropNftBuyModalInformationProps } from "./DropNftBuyModalInformation.types";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { dropsToXrp } from "xrpl";

const DropNftBuyModalInformation = ({ loading = false, drop, collection }: DropNftBuyModalInformationProps): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();
    return (
        <Skeleton loading={loading}>
            <Row flex={1} justifyContent="center">
                <Typography variant="h6" textAlign="center">
                    {translate("buyRandomNft", { collection: collection, price: formatNumber(dropsToXrp(drop?.price || "0")) })}
                </Typography>
            </Row>
        </Skeleton>
    );
};

export default DropNftBuyModalInformation;
