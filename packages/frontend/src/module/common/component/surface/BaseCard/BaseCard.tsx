import { withSkeleton } from "@peersyst/react-components";
import { BaseCardProps, CardType } from "module/common/component/surface/BaseCard/BaseCard.types";
import { BaseCardRoot } from "module/common/component/surface/BaseCard/BaseCard.styles";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";

const typeRouteMapping: Record<CardType, string> = {
    nft: "nft",
    collection: "collection",
};

const BaseCard = ({ type, loading, background }: BaseCardProps): JSX.Element => {
    const renderLinkCondition = !!type && !loading;

    return (
        <ConditionalLink condition={renderLinkCondition} to={"/" + typeRouteMapping[type] + "/" + 1}>
            <BaseCardRoot>
                {!loading && (
                    <NftCard
                        id={1}
                        loading={false}
                        title={"Contemporany Bird Fifteen"}
                        price={1000}
                        background={background}
                        collection={"Okay Birds Contemporany"}
                    />
                )}
            </BaseCardRoot>
        </ConditionalLink>
    );
};

export default withSkeleton(BaseCard);
