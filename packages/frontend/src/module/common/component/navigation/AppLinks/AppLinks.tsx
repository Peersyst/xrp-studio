import { Col, Row, Typography } from "@peersyst/react-components";
import { google_play_store, ios_app_store } from "images";
import AppLink from "./AppLink";
import { AppLinksProps } from "./AppLinks.types";

const AppLinks = ({ label, appStoreLink, googlePlayLink }: AppLinksProps): JSX.Element => (
    <Col css={{ width: "100%" }} gap="1rem">
        {label && (
            <Typography variant="body2" textAlign="center" light>
                {label}
            </Typography>
        )}
        <Row flex={1} wrap wrapGap="1.5rem" gap="1.5rem" justifyContent="center">
            <AppLink link={appStoreLink} img={ios_app_store} alt="app-store-logo" />
            <AppLink link={googlePlayLink} img={google_play_store} alt="play-store-logo" />
        </Row>
    </Col>
);

export default AppLinks;
