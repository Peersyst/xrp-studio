import { Col, Skeleton, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ArtistsCardCarousel from "module/landing/display/ArtistsCardCarousel/ArtistsCardCarousel";
import { LandingPageSectionRoot } from "../LandingPage.styles";
import { LandingPageArtistsSectionProps } from "./LandingPageArtistsSection.types";

const LandingPageArtistsSection = ({ artists = [], loading = false, ...rest }: LandingPageArtistsSectionProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <LandingPageSectionRoot as={Col} gap="3rem" {...rest}>
            <Skeleton loading={loading}>
                <Typography variant="h3" fontWeight={800}>
                    {translate("topArtistsThatUseXRPStudio")}
                </Typography>
            </Skeleton>
            <ArtistsCardCarousel artists={artists} loading={loading} autoplay />
        </LandingPageSectionRoot>
    );
};

export default LandingPageArtistsSection;
