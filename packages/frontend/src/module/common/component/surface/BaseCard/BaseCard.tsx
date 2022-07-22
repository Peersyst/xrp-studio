import { Skeleton, Typography, withSkeleton } from "@peersyst/react-components";
import { BaseCardProps } from "module/common/component/surface/BaseCard/BaseCard.types";
import { BaseCardRoot, BaseCardFooter } from "module/common/component/surface/BaseCard/BaseCard.styles";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { Children } from "react";

const BaseCard = ({ loading, title, cover, children, note, to }: BaseCardProps): JSX.Element => {
    const footerContent = [
        <Typography variant="subtitle1" fontWeight={800} singleLine>
            {title}
        </Typography>,
        <Typography variant="body2" light>
            {note}
        </Typography>,
        ...Children.toArray(children),
    ];

    return (
        <ConditionalLink condition={!loading} to={to}>
            <BaseCardRoot>
                <Skeleton loading={loading}>{cover}</Skeleton>
                <BaseCardFooter gap={8}>
                    {footerContent.map((child, i) => (
                        <Skeleton key={i} loading={loading}>
                            {child}
                        </Skeleton>
                    ))}
                </BaseCardFooter>
            </BaseCardRoot>
        </ConditionalLink>
    );
};

export default withSkeleton(BaseCard);
