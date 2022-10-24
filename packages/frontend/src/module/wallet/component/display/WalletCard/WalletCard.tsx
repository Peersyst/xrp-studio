import { Col, Typography } from "@peersyst/react-components";
import useWallet from "../../hooks/useWallet";
import BlockchainAddressLabel from "../BlockchainAddressLabel/BlockchainAddressLabel";
import NetworkConnect from "../NetworkConnect/NetworkConnect";
import { CardRoot } from "./WalletCard.styles";

const WalletCard = (): JSX.Element => {
    const { address } = useWallet();
    return (
        <CardRoot>
            <Col gap={15}>
                <BlockchainAddressLabel address={address as string} type="address" length={12} variant="caption" light />
                <Col gap={10}>
                    <Typography variant="caption">12.324</Typography>
                    <Typography variant="caption">{"(= 1223 EUR)"}</Typography>
                </Col>
                <NetworkConnect />
            </Col>
        </CardRoot>
    );
};

export default WalletCard;
