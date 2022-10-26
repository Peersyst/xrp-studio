import { NetworkType } from "config/config.declarations";
import { NetworkDotRoot } from "./NetworkDot.styles";

export const NetworkDot = ({ network }: { network: NetworkType }): JSX.Element => {
    return <NetworkDotRoot network={network} data-testid="connectedDot" />;
};

export default NetworkDot;
