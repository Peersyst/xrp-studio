import { Col, Row, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import { LandingPageArtistProps } from "module/landing/Landing.types";
import { UserRoutes } from "module/user/UserRouter";
import { forwardRef } from "react";
import useTranslate from "module/common/hook/useTranslate";
import { ArtistCardRoot } from "module/landing/display/ArtistCard/ArtistCard.styles";

const ArtistCard = forwardRef(({ artist, loading = false }: WithLoading<LandingPageArtistProps>, ref): JSX.Element => {
    const { address = "", image, name = "Loading Name", nftsCount = 0 } = artist || {};
    const translate = useTranslate();

    return (
        <ArtistCardRoot to={UserRoutes.PROFILE.replace(":address", address)}>
            <Row gap="1rem" alignItems="center" ref={ref} css={{ minWidth: "16.5rem", maxWidth: "16.5rem" }}>
                <Avatar img={image} alt="artist-image" loading={loading} size={"md"} />
                <Col gap="1rem" alignItems="center">
                    <Skeleton loading={loading} style={{ maxWidth: "8rem", minWidth: "8rem" }}>
                        <Col gap={"0.5rem"} css={{ maxWidth: "9.5rem" }}>
                            <Typography className="username" variant="body1" fontWeight={800} singleLine>
                                {name}
                            </Typography>
                            <Typography variant="body2" light>
                                {translate("nftsCount", { count: nftsCount || 0 })}
                            </Typography>
                        </Col>
                    </Skeleton>
                </Col>
            </Row>
        </ArtistCardRoot>
    );
});

export default ArtistCard;
