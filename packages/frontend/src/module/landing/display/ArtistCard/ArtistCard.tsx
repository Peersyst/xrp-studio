import { Col, Row, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import Link from "module/common/component/navigation/Link/Link";
import { LandingPageArtistProps } from "module/landing/Landing.types";
import { UserRoutes } from "module/user/UserRouter";
import { forwardRef } from "react";
import useTranslate from "module/common/hook/useTranslate";
import Username from "module/user/component/Username/Username";

const ArtistCard = forwardRef(({ artist, loading = false }: WithLoading<LandingPageArtistProps>, ref): JSX.Element => {
    const { address = "", image, name = "Loading Name", nftsCount = 0, verifiedArtist } = artist || {};
    const translate = useTranslate();

    return (
        <Row gap="1rem" alignItems="center" ref={ref} css={{ minWidth: "16.5rem", maxWidth: "16.5rem" }}>
            <Avatar img={image} alt="artist-image" loading={loading} size={"md"} />
            <Col gap="1rem" alignItems="center">
                <Skeleton loading={loading}>
                    <Link to={UserRoutes.PROFILE.replace(":address", address)} variant="body2">
                        <Col gap={"0.5rem"} css={{ maxWidth: "8rem" }}>
                            <Username name={name} verified={verifiedArtist} variant="body1" fontWeight={800} />
                            <Typography variant="body2" light>
                                {translate("nftsCount", { count: nftsCount ? nftsCount : 0 })}
                            </Typography>
                        </Col>
                    </Link>
                </Skeleton>
            </Col>
        </Row>
    );
});

export default ArtistCard;
