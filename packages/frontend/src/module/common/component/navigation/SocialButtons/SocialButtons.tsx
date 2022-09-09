import { Row } from "@peersyst/react-components";
import SocialButton from "../../display/SocialButton/SocialButton";

export const SocialButtons = (): JSX.Element => {
    return (
        <Row gap="0.5rem">
            <SocialButton type="twitter" />
            <SocialButton type="discord" />
            <SocialButton type="share" />
        </Row>
    );
};
