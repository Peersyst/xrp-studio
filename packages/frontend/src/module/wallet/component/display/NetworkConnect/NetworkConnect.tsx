import { Row, Typography } from "@peersyst/react-components";
import { config } from "config";
import useTranslate from "module/common/hook/useTranslate";
import NetworkDot from "module/wallet/component/display/NetworkDot/NetworkDot";

const NetworkConnect = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <Row gap={5} alignItems={"center"}>
            <NetworkDot network={config.network} />
            <Typography fontWeight={600} variant="caption">
                {translate(config.network)}
            </Typography>
        </Row>
    );
};

export default NetworkConnect;
