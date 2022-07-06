import { withSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/common/component/surface/NftCard/NftCard.types";
import { NftCardFooter, NftCardRoot } from "module/common/component/surface/NftCard/NftCard.styles";
import NftCardCollection from "./NftCardCollection";
import NftCardPrice from "./NftCardPrice";
import NftCardTitle from "./NftCardTitle";
import NftCardImage from "module/common/component/surface/NftCard/NftCardImage";

const NftCard = ({ id, title, collection, price, image, backgroundColor, ...rest }: NftCardProps): JSX.Element => {
    return (
        <NftCardRoot {...rest}>
            <>
                <NftCardImage image={image} />
                <NftCardFooter>
                    <NftCardTitle title={title} />
                    <NftCardPrice price={price} />
                    <NftCardCollection collection={collection} />
                </NftCardFooter>
            </>
        </NftCardRoot>
    );
};

export default withSkeleton(NftCard);
