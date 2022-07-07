import { withSkeleton } from "@peersyst/react-components";
import { BaseCardProps, CardType } from "module/common/component/surface/BaseCard/BaseCard.types";
import { BaseCardRoot } from "module/common/component/surface/BaseCard/BaseCard.styles";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";

const typeRouteMapping: Record<CardType, string> = {
    nft: "nft",
    collection: "collection",
};

const BaseCard = ({ type, loading, children }: BaseCardProps): JSX.Element => {
    const renderLinkCondition = !!type && !loading;

    return (
        <ConditionalLink condition={renderLinkCondition} to={"/" + typeRouteMapping[type] + "/" + 1}>
            <BaseCardRoot>{!loading && children}</BaseCardRoot>
        </ConditionalLink>
    );
};

export default withSkeleton(BaseCard);
