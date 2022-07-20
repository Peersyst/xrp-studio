import { NftCardProps } from "../NftCard/NftCard.types";
import { BaseCardTitleTypography, BaseTitleSlot } from "module/common/component/surface/BaseCard/BaseCard.styles";
import darkTheme from "config/theme/darkTheme";

export type NftTitleProps = Pick<NftCardProps, "title">;

const BaseCardTitle = ({ title }: NftTitleProps): JSX.Element => (
    <BaseTitleSlot>
        <BaseCardTitleTypography theme={darkTheme}>{title}</BaseCardTitleTypography>
    </BaseTitleSlot>
);

export default BaseCardTitle;
