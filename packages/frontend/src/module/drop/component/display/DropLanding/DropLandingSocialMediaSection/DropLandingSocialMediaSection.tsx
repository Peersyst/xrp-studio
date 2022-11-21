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
                    {translate("jounOurCommunity")}
                </Typography>
            </Skeleton>
            <Row gap="1rem" alignItems="center">
                {twitter && (
                    <Skeleton loading={loading}>
                        <SocialButton className="footer" icon="twitter" link={twitter} />
                    </Skeleton>
                )}
                {instagram && (
                    <Skeleton loading={loading}>
                        <SocialButton className="footer" icon="instagram" link={instagram} />{" "}
                    </Skeleton>
                )}
                {discord && (
                    <Skeleton loading={loading}>
                        <SocialButton className="footer" icon="discord" link={discord} />
                    </Skeleton>
                )}
            </Row>
        </DropLandingFooterSectionRoot>
    );
};

export default DropLandingSocialMediaSection;
