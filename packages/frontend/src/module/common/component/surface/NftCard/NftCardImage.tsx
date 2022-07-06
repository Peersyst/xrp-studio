import { NftCardProps } from "./NftCard.types";
import { NftCardPriceTypography, NftCardSlot } from "module/common/component/surface/NftCard/NftCard.styles";

export type NftImageProps = Pick<NftCardProps, "image">;

const NftCardImage = ({ image }: NftImageProps): JSX.Element => (
    <NftCardSlot>
        <NftCardPriceTypography>{image}</NftCardPriceTypography>
    </NftCardSlot>
);

export default NftCardImage;
