import { DropLandingArtistSectionProps } from "module/drop/component/display/DropLanding/DropLandingArtistSection/DropLandingArtistSection.types";
import { Col, Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import Link from "module/common/component/navigation/Link/Link";
import { UserRoutes } from "module/user/UserRouter";
import useTranslate from "module/common/hook/useTranslate";
import { DropLandingArtistSectionRoot } from "module/drop/component/display/DropLanding/DropLandingArtistSection/DropLandingArtistSection.styles";
import Description from "module/common/component/display/Desciption/Description";

const DropLandingArtistSection = ({
    artist: { address = "", image, name = "Loading Name", description } = {},
    loading = false,
}: WithLoading<DropLandingArtistSectionProps>): JSX.Element => {
    const translate = useTranslate();

    return (
        <DropLandingArtistSectionRoot as={Col} gap="3rem" alignItems="center">
            <Avatar img={image} alt="artist-image" loading={loading} />
            <Col gap="1rem" alignItems="center" css={{ maxWidth: "clamp(280px, 70%, 500px)" }}>
                <Skeleton loading={loading}>
                    <Link to={UserRoutes.PROFILE.replace(":address", address)} variant="body2">
                        {translate("meetTheArtist")}
                    </Link>
                </Skeleton>
                <Skeleton loading={loading}>
                    <Typography variant="h3" fontWeight={800} textAlign="center">
                        {name}
                    </Typography>
                </Skeleton>
                {(loading || description) && (
                    <Description loading={loading} variant="body2" css={{ opacity: 0.72, lineHeight: "1.5rem" }} textAlign="center">
                        {description}
                    </Description>
                )}
            </Col>
        </DropLandingArtistSectionRoot>
    );
};

export default DropLandingArtistSection;
