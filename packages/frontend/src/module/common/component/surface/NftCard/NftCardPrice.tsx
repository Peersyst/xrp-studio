import { NftCardProps } from "./NftCard.types";
import { NftCardPriceTypography, NftPriceSlot } from "module/common/component/surface/NftCard/NftCard.styles";

export type NftPriceProps = Pick<NftCardProps, "price">;

const NftCardPrice = ({ price }: NftPriceProps): JSX.Element => (
    <NftPriceSlot>
        <NftCardPriceTypography>XRP {price}</NftCardPriceTypography>
    </NftPriceSlot>
);

export default NftCardPrice;
