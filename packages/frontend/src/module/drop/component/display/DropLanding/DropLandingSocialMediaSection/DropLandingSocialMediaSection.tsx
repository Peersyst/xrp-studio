import { Row, Col, Skeleton, Typography } from "@peersyst/react-components";
import { DropLandingFooterSectionProps } from "./DropLandingSocialMediaSection.types";
import SocialButton from "module/common/component/input/SocialButton/SocialButton";
import { DropLandingFooterSectionRoot } from "./DropLandingSocialMediaSection.styles";
import useTranslate from "module/common/hook/useTranslate";

const DropLandingSocialMediaSection = ({
    networks: { instagram, twitter, discord },
    loading,
}: DropLandingFooterSectionProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <DropLandingFooterSectionRoot as={Col} gap="1.5rem" alignItems="center">
            <Skeleton loading={loading}>
                <Typography variant="body2" textAlign="center" style={{ color: "#008CFF" }}>
                    {translate("jounOurCommunity")}
                </Typography>
                <Row gap="1rem" alignItems="center" css={{ maxWidth: "clamp(280px, 70%, 500px)" }}>
                    {twitter && <SocialButton className="footer" icon="twitter" link={twitter} />}
                    {instagram && <SocialButton className="footer" icon="instagram" link={instagram} />}
                    {discord && <SocialButton className="footer" icon="discord" link={discord} />}
                </Row>
            </Skeleton>
        </DropLandingFooterSectionRoot>
    );
};

export default DropLandingSocialMediaSection;
