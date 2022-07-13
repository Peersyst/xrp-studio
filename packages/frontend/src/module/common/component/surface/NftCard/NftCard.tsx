import { withSkeleton } from "@peersyst/react-components";
import { NftCardProps } from "module/common/component/surface/NftCard/NftCard.types";
import { NftCardFooter, NftCardBackground } from "module/common/component/surface/NftCard/NftCard.styles";
import { Children } from "react";
import NftCardTitle from "module/common/component/surface/NftCard/NftCardTitle";
import NftCardPrice from "module/common/component/surface/NftCard/NftCardPrice";
import NftCardCollection from "module/common/component/surface/NftCard/NftCardCollection";

const NftCard = ({ title, collection, price, cover }: NftCardProps): JSX.Element => {
    return (
        <>
            <NftCardBackground>{Children.only(cover)}</NftCardBackground>
            <NftCardFooter>
                <NftCardTitle title={title} />
                <NftCardPrice price={price} />
                <NftCardCollection collection={collection} />
            </NftCardFooter>
        </>
    );
};

export default withSkeleton(NftCard);
