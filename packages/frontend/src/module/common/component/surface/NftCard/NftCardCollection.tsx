import { NftCardProps } from "./NftCard.types";
import { NftCardCollectionTypography, NftCardSlot } from "module/common/component/surface/NftCard/NftCard.styles";

export type NftCollectionProps = Pick<NftCardProps, "collection">;

const NftCardCollection = ({ collection }: NftCollectionProps): JSX.Element => (
    <NftCardSlot>
        <NftCardCollectionTypography>{collection}</NftCardCollectionTypography>
    </NftCardSlot>
);

export default NftCardCollection;
