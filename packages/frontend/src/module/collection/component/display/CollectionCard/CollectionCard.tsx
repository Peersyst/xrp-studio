import { Col, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import { CollectionCardProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";
import useTranslate from "module/common/hook/useTranslate";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { forwardRef } from "react";
import { setRef } from "@peersyst/react-utils";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { config } from "config";
import { GroupAvatar, GroupCardCover, GroupCardFooter, GroupCardRoot } from "module/common/component/display/GroupCard/GroupCard.styles";

const CollectionCard = forwardRef(
    (
        { collection: { id, name = "", image = "", items, header = "" }, loading = false, size = "md" }: WithSkeleton<CollectionCardProps>,
        ref,
    ): JSX.Element => {
        const translate = useTranslate();

        const alt = "collection-" + id;

        return (
            <ConditionalLink condition={!loading} to={CollectionRoutes.VIEW_COLLECTION.replace(":id", id.toString())}>
                <GroupCardRoot size={size} ref={(r) => setRef(ref, r)}>
                    <GroupCardCover
                        size={size}
                        src={header}
                        alt={`${alt}-cover`}
                        loading={loading}
                        fallback={config.collectionDefaultHeaderUrl}
                    />
                    <GroupCardFooter>
                        <GroupAvatar img={image} alt={`${alt}-image`} loading={loading} fallback={config.collectionDefaultImageUrl} />
                        <Col gap="0.375rem" justifyContent="flex-end" css={{ maxWidth: "63%" }}>
                            <Skeleton loading={loading}>
                                <Typography variant="body1" fontWeight={800} singleLine>
                                    {name}
                                </Typography>
                            </Skeleton>
                            <Skeleton width="50%" loading={loading}>
                                <Typography variant="body2" light singleLine>
                                    {translate("itemWithCount", { count: items || 0 })}
                                </Typography>
                            </Skeleton>
                        </Col>
                    </GroupCardFooter>
                </GroupCardRoot>
            </ConditionalLink>
        );
    },
);

export default CollectionCard;
