import { Col, Row, Typography } from "@peersyst/react-components";
import AppLinkLogos from "./AppLinkLogos";
import { AppLinksProps } from "./AppLinks.types";

const AppLinks = ({ label, appStoreLink, googlePlayLink }: AppLinksProps): JSX.Element => (
    <Col css={{ width: "100%" }} gap="1rem">
        {label && (
            <Typography variant="body2" textAlign="center" light>
                {label}
            </Typography>
        )}
        <Row flex={1} wrap wrapGap="1.5rem" gap="1.5rem" justifyContent="center">
            <AppLinkLogos appStoreLink={appStoreLink} googlePlayLink={googlePlayLink} />
        </Row>
    </Col>
);

export default AppLinks;
