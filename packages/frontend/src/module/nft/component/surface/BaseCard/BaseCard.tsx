import { Col, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import { BaseCardProps } from "module/nft/component/surface/BaseCard/BaseCard.types";
import { BaseCardRoot, BaseCardCover } from "module/nft/component/surface/BaseCard/BaseCard.styles";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { Children } from "react";

const BaseCard = ({ loading, title, cover, children, note, to }: WithSkeleton<BaseCardProps>): JSX.Element => {
    const footerContent = [
        <Typography variant="subtitle1" fontWeight={800} singleLine css={{ minWidth: "10rem" }}>
            {title}
        </Typography>,
        ...(note
            ? [
                  <Typography variant="body2" light css={{ minWidth: "14rem" }}>
                      {note}
                  </Typography>,
              ]
            : []),
        ...Children.toArray(children),
    ];

    return (
        <ConditionalLink condition={!loading} to={to}>
            <BaseCardRoot>
                <Skeleton loading={loading}>
                    <BaseCardCover>{cover}</BaseCardCover>
                </Skeleton>
                <Col gap="0.5rem">
                    {footerContent.map((child, i) => (
                        <Skeleton key={i} loading={loading}>
                            {child}
                        </Skeleton>
                    ))}
                </Col>
            </BaseCardRoot>
        </ConditionalLink>
    );
};

export default BaseCard;