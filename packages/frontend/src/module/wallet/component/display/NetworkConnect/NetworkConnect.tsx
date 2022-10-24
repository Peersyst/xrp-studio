import { Row, Typography } from "@peersyst/react-components";
import ConnectedDot from "../ConnectedDot/ConnectedDot";
import { config } from "config";

const NetworkConnect = (): JSX.Element => {
    return (
        <Row gap={5} alignItems={"center"}>
            <ConnectedDot active={true} />
            <Typography fontWeight={600} variant="caption">
                {config.network}
            </Typography>
        </Row>
    );
};

export default NetworkConnect;
