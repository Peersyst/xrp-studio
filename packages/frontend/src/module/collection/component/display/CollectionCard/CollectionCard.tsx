import { Col, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import {
    CollectionAvatar,
    CollectionCardCover,
    CollectionCardFooter,
    CollectionCardRoot,
} from "module/collection/component/display/CollectionCard/CollectionCard.styles";
import { CollectionCardProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";
import useTranslate from "module/common/hook/useTranslate";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { forwardRef } from "react";
import { setRef } from "@peersyst/react-utils";
import { CollectionRoutes } from "module/collection/CollectionRouter";

const CollectionCard = forwardRef(
    (
        { collection: { id, name = "", image = "", items, header }, loading = false }: WithSkeleton<CollectionCardProps>,
        ref,
    ): JSX.Element => {
        const translate = useTranslate();

        const alt = "collection-" + id;

        return (
            <ConditionalLink condition={!loading} to={`${CollectionRoutes.COLLECTIONS}${id}`}>
                <CollectionCardRoot ref={(r) => setRef(ref, r)}>
                    <CollectionCardCover src={header} alt={`${alt}-cover`} loading={loading} />
                    <CollectionCardFooter>
                        <CollectionAvatar img={image} alt={`${alt}-image`} loading={loading} />
                        <Col gap="0.375rem" justifyContent="flex-end" css={{ maxWidth: "63%" }}>
                            <Skeleton loading={loading}>
                                <Typography variant="body1" fontWeight={800} singleLine>
                                    {name}
                                </Typography>
                            </Skeleton>
                            <Skeleton width="50%" loading={loading}>
                                <Typography variant="body2" light singleLine>
                                    {translate("itemWithCount", { count: items })}
                                </Typography>
                            </Skeleton>
                        </Col>
                    </CollectionCardFooter>
                </CollectionCardRoot>
            </ConditionalLink>
        );
    },
);

export default CollectionCard;
