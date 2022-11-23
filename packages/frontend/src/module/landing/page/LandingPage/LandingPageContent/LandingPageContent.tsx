import { Col, Divider, WithLoading } from "@peersyst/react-components";
import { LandingPageProps } from "module/landing/Landing.types";

function LandingPageContent({ ...rest }: WithLoading<LandingPageProps>): JSX.Element {
    return (
        <Col {...rest}>
            <Divider />
            Content
        </Col>
    );
}

export default LandingPageContent;
