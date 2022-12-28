import { Row, Col, Skeleton, Typography } from "@peersyst/react-components";
import { DropLandingFooterSectionProps } from "./DropLandingSocialMediaSection.types";
import SocialButton from "module/common/component/input/SocialButton/SocialButton";
import { DropLandingFooterSectionRoot } from "./DropLandingSocialMediaSection.styles";
import useTranslate from "module/common/hook/useTranslate";

const DropLandingSocialMediaSection = ({
    networks: { instagram, twitter, discord },
    loading,
    ...rest
}: DropLandingFooterSectionProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <DropLandingFooterSectionRoot as={Col} gap="1.5rem" alignItems="center" {...rest}>
            <Skeleton loading={loading}>
                <Typography variant="body2" textAlign="center">
                    {translate("joinOurCommunity")}
                </Typography>
            </Skeleton>
            <Skeleton width="19rem" height="3.25rem" loading={loading}>
                <Row gap="1rem" alignItems="center">
                    {twitter && <SocialButton className="footer" icon="twitter" link={`https://twitter.com/${twitter}`} />}
                    {instagram && <SocialButton className="footer" icon="instagram" link={`https://instagram.com/${instagram}`} />}
                    {discord && <SocialButton className="footer" icon="discord" link={discord} />}
                </Row>
            </Skeleton>
        </DropLandingFooterSectionRoot>
    );
};

export default DropLandingSocialMediaSection;
