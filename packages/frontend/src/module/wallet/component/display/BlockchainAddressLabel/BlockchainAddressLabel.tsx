import { BlockchainAddressLabelRoot } from "./BlockchainAddressLabel.styles";
import { BlockchainAddressLabelProps } from "./BlockchainAddressLabel.types";

const BlockchainAddressLabel = ({ address, type, ...rest }: BlockchainAddressLabelProps): JSX.Element => {
    return <BlockchainAddressLabelRoot address={address} type={type} {...rest} />;
};

export default BlockchainAddressLabel;
