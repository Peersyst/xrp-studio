import { Row } from "@peersyst/react-components";
import styled from "styled-components";
import Button from "module/common/component/input/Button/Button";
import { TypographyRoot } from "../LinkHeader/LinkHeader.styles";

const WalletNotConnectedRoot = styled(Row).attrs({ position: "fixed" })`
    display: flex;
    padding-right: 10rem;
`;

const WalletNotConnected = (): JSX.Element => (
    <WalletNotConnectedRoot gap={26}>
        <TypographyRoot variant="body2"> Let's get started! </TypographyRoot>
        <Button color="white"> Login with your XUMM wallet </Button>
    </WalletNotConnectedRoot>
);

export default WalletNotConnected;
