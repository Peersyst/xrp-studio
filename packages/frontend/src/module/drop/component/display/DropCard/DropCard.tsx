import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { DropRoutes } from "module/drop/DropRouter";
import { forwardRef } from "react";
import { setRef } from "@peersyst/react-utils";
import { DropDto } from "module/api/service";
import { config } from "config";
import {
    CollectionAvatar,
    CollectionCardCover,
    CollectionCardFooter,
    CollectionCardRoot,
} from "module/collection/component/display/CollectionCard/CollectionCard.styles";
import { Col, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

interface DropCardProps {
    size: "md" | "lg";
    drop: DropDto;
}

const DropCard = forwardRef(
    ({ loading = false, size = "md", drop: { id, items, price, collection } }: WithSkeleton<DropCardProps>, ref): JSX.Element => {
        const translate = useTranslate();

        const alt = "drop";

        return (
            <ConditionalLink condition={!loading} to={DropRoutes.DROP.replace(":id", id.toString())}>
                <CollectionCardRoot size={size} ref={(r) => setRef(ref, r)}>
                    <CollectionCardCover
                        size={size}
                        src={collection?.header || ""}
                        alt={`${alt}-cover`}
                        loading={loading}
                        fallback={config.collectionDefaultHeaderUrl}
                    />
                    <CollectionCardFooter>
                        <CollectionAvatar
                            img={collection?.image || ""}
                            alt={`${alt}-image`}
                            loading={loading}
                            fallback={config.collectionDefaultImageUrl}
                        />
                        <Col gap="0.375rem" justifyContent="flex-end" css={{ maxWidth: "63%" }}>
                            <Skeleton loading={loading}>
                                <Typography variant="body1" fontWeight={800} singleLine>
                                    {collection?.name || ""}
                                </Typography>
                            </Skeleton>
                            <Skeleton width="50%" loading={loading}>
                                <Typography variant="body2" light singleLine>
                                    {translate("itemWithCount", { count: items || 0 })} · XRP {price} mint price
                                </Typography>
                            </Skeleton>
                        </Col>
                    </CollectionCardFooter>
                </CollectionCardRoot>
            </ConditionalLink>
        );
    },
);

export default DropCard;
