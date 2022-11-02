import { Col, Hash, Popover, Row, Typography } from "@peersyst/react-components";
import Avatar from "module/common/component/display/Avatar/Avatar";
import useWallet from "../../hooks/useWallet";
import WalletMenu from "../../navigation/WalletMenu/WalletMenu";
import NetworkConnect from "../../display/NetworkConnect/NetworkConnect";
import useGetUser from "module/user/query/useGetUser";
import { useState } from "react";

const WalletConnected = (): JSX.Element => {
    const { address = "" } = useWallet();
    const { data: user } = useGetUser(address);
    const [visible, setVisible] = useState(false);
    return (
        <Popover showOn="click" position="bottom-end" onHide={() => setVisible(false)} visible={visible} disablePortal>
            <Popover.Popper elevation={0}>
                <WalletMenu setVisible={setVisible} />
            </Popover.Popper>
            <Popover.Content>
                <Row gap={10} css={{ cursor: "pointer" }} onClick={() => setVisible((v) => !v)}>
                    <Row alignItems={"center"}>
                        <Avatar size={"sm"} img={user?.image ?? ""} alt="avatar" />
                    </Row>
                    <Col gap={2}>
                        {user?.name ? (
                            <Typography variant={"body2"}>@{user.name}</Typography>
                        ) : (
                            <Hash hash={address} length={6} variant="body2" copy={false} />
                        )}
                        <NetworkConnect />
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>
    );
};

export default WalletConnected;
