import { Col, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import {
    CollectionAvatar,
    CollectionCardCover,
    CollectionCardFooter,
    CollectionCardRoot,
} from "module/common/component/surface/CollectionCard/CollectionCard.styles";
import { CollectionCardProps } from "module/common/component/surface/CollectionCard/CollectionCard.types";
import useTranslate from "module/common/hook/useTranslate";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";

const CollectionCard = ({
    collection: { id, name = "", image = "", items, header },
    loading = false,
}: WithSkeleton<CollectionCardProps>): JSX.Element => {
    const translate = useTranslate();

    const alt = "collection-" + id;

    return (
        <ConditionalLink condition={!loading} to={`/collections/${id}`}>
            <CollectionCardRoot>
                <CollectionCardCover src={header} alt={`${alt}-cover`} loading={loading} />
                <CollectionCardFooter>
                    <CollectionAvatar img={image} alt={`${alt}-image`} loading={loading} />
                    <Col gap="0.375rem" justifyContent="flex-end" css={{ maxWidth: "63%" }}>
                        <Skeleton width="200%" loading={loading}>
                            <Typography variant="body1" fontWeight={800} singleLine>
                                {name}
                            </Typography>
                        </Skeleton>
                        <Skeleton width="90%" loading={loading}>
                            <Typography variant="body2" light singleLine>
                                {`${Intl.NumberFormat().format(items)} ${translate("items").toLowerCase()}`}
                            </Typography>
                        </Skeleton>
                    </Col>
                </CollectionCardFooter>
            </CollectionCardRoot>
        </ConditionalLink>
    );
};

export default CollectionCard;