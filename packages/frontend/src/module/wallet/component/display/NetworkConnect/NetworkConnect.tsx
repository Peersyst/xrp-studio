import { Row, Typography } from "@peersyst/react-components";
import ConnectedDot from "../ConnectedDot/ConnectedDot";
import { config } from "config";
import useTranslate from "module/common/hook/useTranslate";

const NetworkConnect = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <Row gap={5} alignItems={"center"}>
            <ConnectedDot active={true} />
            <Typography fontWeight={600} variant="caption">
                {translate(config.network)}
            </Typography>
        </Row>
    );
};

export default NetworkConnect;
