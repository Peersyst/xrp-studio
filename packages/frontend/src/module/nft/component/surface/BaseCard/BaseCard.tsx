import { Col, CrossIcon, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import { BaseCardProps } from "module/nft/component/surface/BaseCard/BaseCard.types";
import { BaseCardRoot, BaseCardCover, RemoveIcon, CoverImage, BaseCardStatus } from "module/nft/component/surface/BaseCard/BaseCard.styles";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { Children, forwardRef } from "react";

const BaseCard = forwardRef(
    (
        {
            loading = false,
            title,
            titlePlaceholder,
            coverUrl = "",
            defaultCoverUrl,
            children,
            note,
            to,
            onDeleteClicked,
            deleting,
            status,
            ...rest
        }: WithSkeleton<BaseCardProps>,
        ref,
    ): JSX.Element => {
        const footerContent = [
            <Typography
                variant="subtitle1"
                fontWeight={800}
                singleLine
                css={{ minWidth: "10rem" }}
                fontStyle={title ? undefined : "italic"}
            >
                {title || titlePlaceholder}
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
            <ConditionalLink condition={!!to && !loading} to={to!} {...rest}>
                <BaseCardRoot ref={ref}>
                    <Skeleton loading={loading} className="skeleton-card">
                        <BaseCardCover>
                            <CoverImage src={coverUrl} alt={title + "-img"} fallback={defaultCoverUrl} />
                            <BaseCardStatus>{status}</BaseCardStatus>
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
                                e?.preventDefault();
                                onDeleteClicked();
                            }}
                            loading={deleting}
                        >
                            <CrossIcon />
                        </RemoveIcon>
                    )}
                </BaseCardRoot>
            </ConditionalLink>
        );
    },
);

export default BaseCard;
