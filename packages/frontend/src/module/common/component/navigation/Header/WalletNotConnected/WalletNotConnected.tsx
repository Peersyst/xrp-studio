import { Row, Typography } from "@peersyst/react-components";
import styled from "styled-components";
import Button from "module/common/component/input/Button/Button";

const WalletNotConnectedRoot = styled(Row).attrs({ position: "fixed" })`
    display: flex;
    padding-right: 10rem;
`;

const WalletNotConnected = (): JSX.Element => (
    <WalletNotConnectedRoot gap={26}>
        <Typography variant="body2"> Let's get started! </Typography>
        <Button> Login with your XUMM wallet </Button>
    </WalletNotConnectedRoot>
);

export default WalletNotConnected;
