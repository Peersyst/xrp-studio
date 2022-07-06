import { NftCardProps } from "./NftCard.types";
import { NftCardTitleTypography, NftCardSlot } from "module/common/component/surface/NftCard/NftCard.styles";

export type NftTitleProps = Pick<NftCardProps, "title">;

const NftCardTitle = ({ title }: NftTitleProps): JSX.Element => (
    <NftCardSlot>
        <NftCardTitleTypography>{title}</NftCardTitleTypography>
    </NftCardSlot>
);

export default NftCardTitle;
