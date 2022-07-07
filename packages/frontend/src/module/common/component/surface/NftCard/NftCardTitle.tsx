import { NftCardProps } from "./NftCard.types";
import { NftCardTitleTypography, NftTitleSlot } from "module/common/component/surface/NftCard/NftCard.styles";

export type NftTitleProps = Pick<NftCardProps, "title">;

const NftCardTitle = ({ title }: NftTitleProps): JSX.Element => (
    <NftTitleSlot>
        <NftCardTitleTypography>{title}</NftCardTitleTypography>
    </NftTitleSlot>
);

export default NftCardTitle;
