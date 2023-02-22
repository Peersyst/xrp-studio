import { Col, Skeleton, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import DropCardCarousel from "module/drop/component/display/DropCardCarousel/DropCardCarousel";
import { LandingPageSectionRoot } from "../LandingPage.styles";
import { LandingPageDropsSectionProps } from "./LandingPageDropsSection.types";

const LandingPageDropsSection = ({ drops = [], loading = false, ...rest }: LandingPageDropsSectionProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <LandingPageSectionRoot as={Col} gap="1.5rem" {...rest}>
            <Skeleton loading={loading}>
                <Typography variant="h3" fontWeight={800}>
                    {translate("topDropsInXrpStudio")}
                </Typography>
            </Skeleton>
            <DropCardCarousel drops={drops} loading={loading} autoplay />
        </LandingPageSectionRoot>
    );
};

export default LandingPageDropsSection;
