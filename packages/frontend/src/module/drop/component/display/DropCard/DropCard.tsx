import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";
import { DropRoutes } from "module/drop/DropRouter";
import { forwardRef } from "react";
import { setRef } from "@peersyst/react-utils";
import { DropDto } from "module/api/service";
import { config } from "config";
import { Col, Skeleton, Typography, WithSkeleton } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { GroupAvatar, GroupCardCover, GroupCardFooter, GroupCardRoot } from "module/common/component/display/GroupCard/GroupCard.styles";
import { GroupCardProps } from "module/common/component/display/GroupCard/GroupCard.types";

interface DropCardProps extends GroupCardProps {
    drop: DropDto;
}

const DropCard = forwardRef(
    ({ loading = false, size = "md", drop: { id, items, price, collection } }: WithSkeleton<DropCardProps>, ref): JSX.Element => {
        const translate = useTranslate();

        const alt = "drop";

        return (
            <ConditionalLink condition={!loading} to={DropRoutes.DROP.replace(":id", id.toString())}>
                <GroupCardRoot size={size} ref={(r) => setRef(ref, r)}>
                    <GroupCardCover
                        size={size}
                        src={collection?.header || config.collectionDefaultHeaderUrl}
                        alt={`${alt}-cover`}
                        loading={loading}
                        fallback={config.collectionDefaultHeaderUrl}
                    />
                    <GroupCardFooter>
                        <GroupAvatar
                            img={collection?.image || config.collectionDefaultImageUrl}
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
                                    {translate("itemWithCount", { count: items || 0 })} · XRP {price} {translate("mintPrice")}
                                </Typography>
                            </Skeleton>
                        </Col>
                    </GroupCardFooter>
                </GroupCardRoot>
            </ConditionalLink>
        );
    },
);

export default DropCard;
