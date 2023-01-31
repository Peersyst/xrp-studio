import useTranslate from "module/common/hook/useTranslate";
import { DropCostProps } from "module/drop/component/display/DropCost/DropCost.types";
import { XrpIcon } from "icons";
import { Label, Row, Typography } from "@peersyst/react-components";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import useDropCost from "module/drop/hook/useDropCost";

const DropCost = ({ items }: DropCostProps): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();

    const cost = useDropCost(items);

    return (
        <Label gap="0.5rem" label={translate("dropMintingCost") + ":"} placement="left">
            <Row gap="0.25rem" alignItems="center">
                <Typography variant="body1" fontWeight="bold">
                    {formatNumber(cost).toString()}
                </Typography>
                <XrpIcon />
            </Row>
        </Label>
    );
};

export default DropCost;
