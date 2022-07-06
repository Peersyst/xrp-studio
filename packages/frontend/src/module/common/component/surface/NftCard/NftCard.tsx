import { withSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/common/component/surface/NftCard/NftCard.types";
import { NftCardFooter, NftCardRoot, NftCardBackground } from "module/common/component/surface/NftCard/NftCard.styles";
import NftCardCollection from "./NftCardCollection";
import NftCardPrice from "./NftCardPrice";
import NftCardTitle from "./NftCardTitle";
import { Children } from "react";

const NftCard = ({ id, title, collection, price, background, backgroundColor, ...rest }: NftCardProps): JSX.Element => {
    return (
        <NftCardRoot {...rest}>
            <>
                <NftCardBackground>{Children.only(background)}</NftCardBackground>
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
