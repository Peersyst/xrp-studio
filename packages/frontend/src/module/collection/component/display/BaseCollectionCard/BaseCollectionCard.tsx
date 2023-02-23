import { Col, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import { forwardRef } from "react";
import { setRef } from "@peersyst/react-utils";
import { config } from "config";
import { BaseCollectionCardProps } from "./BaseCollectionCard.types";
import { BaseCollectionCardRoot, BaseCollectionCardCover, BaseCollectionCardFooter, GroupAvatar } from "./BaseCollectionCard.styles";

const BaseCollectionCard = forwardRef(
    (
        {
            loading = false,
            size = "md",
            to,
            header = "",
            alt,
            image = "",
            name,
            namePlaceholder,
            description,
            gridWidth,
        }: WithSkeleton<BaseCollectionCardProps>,
        ref,
    ): JSX.Element => {
        return (
            <BaseCollectionCardRoot condition={!loading} to={to} size={size} ref={(r) => setRef(ref, r)} gridWidth={gridWidth}>
                <BaseCollectionCardCover
                    size={size}
                    src={header}
                    alt={`${alt}-cover`}
                    loading={loading}
                    fallback={config.collectionDefaultHeaderUrl}
                />
                <BaseCollectionCardFooter>
                    <GroupAvatar img={image} alt={`${alt}-image`} loading={loading} fallback={config.collectionDefaultImageUrl} />
                    <Col gap="0.375rem" justifyContent="flex-end" css={{ maxWidth: "63%" }}>
                        <Skeleton loading={loading}>
                            <Typography variant="body1" fontWeight={800} singleLine fontStyle={!name ? "italic" : undefined}>
                                {name || namePlaceholder}
                            </Typography>
                        </Skeleton>
                        <Skeleton width="50%" loading={loading}>
                            <Typography variant="body2" light singleLine>
                                {description}
                            </Typography>
                        </Skeleton>
                    </Col>
                </BaseCollectionCardFooter>
            </BaseCollectionCardRoot>
        );
    },
);

export default BaseCollectionCard;
