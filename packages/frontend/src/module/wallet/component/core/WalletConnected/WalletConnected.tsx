import { Col, Hash, Popover, Row } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import useWallet from "../../hooks/useWallet";
import BlockchainAddressLabel from "../../display/BlockchainAddressLabel/BlockchainAddressLabel";
import Menu from "../../navigation/Menu/Menu";
import NetworkConnect from "../../display/NetworkConnect/NetworkConnect";

const WalletConnected = (): JSX.Element => {
    const { address } = useWallet();
    return (
        <Popover showOn="click" position="bottom" arrow>
            <Popover.Popper>
                <Menu />
            </Popover.Popper>
            <Popover.Content>
                <Row gap={10}>
                    <Row alignItems={"center"}>
                        <Avatar size={"sm"} img={"https://avatars.githubusercontent.com/u/2675924?s=40&v=4"} alt="avatar" />
                    </Row>
                    <Col gap={2} css={{ cursor: "pointer" }}>
                        <Hash hash={address as string} length={6} variant="body2" />
                        <BlockchainAddressLabel address={address as string} type="address" length={6} variant="body2" />
                        <NetworkConnect />
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>
    );
};

export default WalletConnected;
