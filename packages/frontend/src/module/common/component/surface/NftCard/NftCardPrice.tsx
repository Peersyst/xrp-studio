import { NftCardProps } from "./NftCard.types";
import { NftCardPriceTypography, NftCardSlot } from "module/common/component/surface/NftCard/NftCard.styles";

export type NftPriceProps = Pick<NftCardProps, "price">;

const NftCardPrice = ({ price }: NftPriceProps): JSX.Element => (
    <NftCardSlot>
        <NftCardPriceTypography>{price}</NftCardPriceTypography>
    </NftCardSlot>
);

export default NftCardPrice;
