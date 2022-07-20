import { NftCardProps } from "./NftCard.types";
import { NftCardCollectionTypography, NftCollectionSlot } from "module/common/component/surface/NftCard/NftCard.styles";
import darkTheme from "config/theme/darkTheme";

export type NftCollectionProps = Pick<NftCardProps, "collection">;

const NftCardCollection = ({ collection }: NftCollectionProps): JSX.Element => (
    <NftCollectionSlot>
        <NftCardCollectionTypography theme={darkTheme}>{collection}</NftCardCollectionTypography>
    </NftCollectionSlot>
);

export default NftCardCollection;
