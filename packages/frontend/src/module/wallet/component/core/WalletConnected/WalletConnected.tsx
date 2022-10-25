import { Col, Hash, Popover, Row } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import useWallet from "../../hooks/useWallet";
import Menu from "../../navigation/Menu/Menu";
import NetworkConnect from "../../display/NetworkConnect/NetworkConnect";
import useGetUser from "module/user/query/useGetUser";

const WalletConnected = (): JSX.Element => {
    const { address } = useWallet();
    const { data: user } = useGetUser(address);
    return (
        <Popover showOn="click" position="bottom" arrow>
            <Popover.Popper>
                <Menu />
            </Popover.Popper>
            <Popover.Content>
                <Row gap={10}>
                    <Row alignItems={"center"}>
                        <Avatar size={"sm"} img={user?.image ? user?.image : ""} alt="avatar" />
                    </Row>
                    <Col gap={2} css={{ cursor: "pointer" }}>
                        <Hash hash={address as string} length={6} variant="body2" copy={false} />
                        <NetworkConnect />
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>
    );
};

export default WalletConnected;
