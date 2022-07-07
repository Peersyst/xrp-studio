import { NftCardProps } from "./NftCard.types";
import { NftCardCollectionTypography, NftCollectionSlot } from "module/common/component/surface/NftCard/NftCard.styles";

export type NftCollectionProps = Pick<NftCardProps, "collection">;

const NftCardCollection = ({ collection }: NftCollectionProps): JSX.Element => (
    <NftCollectionSlot>
        <NftCardCollectionTypography>{collection}</NftCardCollectionTypography>
    </NftCollectionSlot>
);

export default NftCardCollection;
