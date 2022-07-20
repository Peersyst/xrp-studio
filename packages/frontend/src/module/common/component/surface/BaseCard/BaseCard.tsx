import { withSkeleton } from "@peersyst/react-components";
import { BaseCardProps } from "module/common/component/surface/BaseCard/BaseCard.types";
import { BaseCardRoot, BaseCardFooter } from "module/common/component/surface/BaseCard/BaseCard.styles";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import BaseCardTitle from "module/common/component/surface/BaseCard/BaseCardTitle";

const BaseCard = ({ loading, title, cover, children }: BaseCardProps): JSX.Element => {
    const renderLinkCondition = !loading;

    return (
        <ConditionalLink condition={renderLinkCondition} to={"/nft/" + 1}>
            <BaseCardRoot>
                {!loading && cover}
                <BaseCardFooter>
                    <BaseCardTitle title={title} />
                    {!loading && children}
                </BaseCardFooter>
            </BaseCardRoot>
        </ConditionalLink>
    );
};

export default withSkeleton(BaseCard);
