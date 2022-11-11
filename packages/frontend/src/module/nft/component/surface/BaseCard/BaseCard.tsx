import { Col, CrossIcon, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import { BaseCardProps } from "module/nft/component/surface/BaseCard/BaseCard.types";
import { BaseCardRoot, BaseCardCover, BaseCardCoverDefault, RemoveIcon } from "module/nft/component/surface/BaseCard/BaseCard.styles";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { Children } from "react";

const BaseCard = ({
    loading = false,
    title,
    coverUrl,
    defaultUrl,
    children,
    note,
    to,
    onDeleteClicked,
    status,
}: WithSkeleton<BaseCardProps>): JSX.Element => {
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
        <ConditionalLink condition={!!to && !loading} to={to!} css={{ height: "100%", width: "100%" }}>
            <BaseCardRoot>
                <Skeleton loading={loading} className="skeleton-card">
                    <BaseCardCover imageUrl={coverUrl}>
                        <BaseCardCoverDefault imageUrl={defaultUrl} />
                        {status}
                    </BaseCardCover>
                </Skeleton>
                <Col gap="0.5rem">
                    {footerContent.map((child, i) => (
                        <Skeleton key={i} loading={loading} className="skeleton-footer">
                            {child}
                        </Skeleton>
                    ))}
                </Col>
                {onDeleteClicked && (
                    <RemoveIcon
                        onClick={(e) => {
                            e?.stopPropagation();
                            e?.preventDefault();
                            onDeleteClicked();
                        }}
                    >
                        <CrossIcon />
                    </RemoveIcon>
                )}
            </BaseCardRoot>
        </ConditionalLink>
    );
};

export default BaseCard;
