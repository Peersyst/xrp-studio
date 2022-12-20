import useTranslate from "module/common/hook/useTranslate";
import { Row, Typography } from "@peersyst/react-components";
import { DropNftBuyModalInformationProps } from "./DropNftBuyModalInformation.types";
import { useFormatNumber } from "module/common/hook/useFormatNumber";

const DropNftBuyModalInformation = ({ drop: { price: price }, collection }: DropNftBuyModalInformationProps): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();
    return (
        <Row flex={1} justifyContent="center">
            <Typography variant="h6" textAlign="center">
                {translate("buyRandomNft", { collection: collection, price: formatNumber(price) })}
            </Typography>
        </Row>
    );
};

export default DropNftBuyModalInformation;
