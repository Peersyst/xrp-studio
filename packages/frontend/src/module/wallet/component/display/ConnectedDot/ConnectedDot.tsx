import { cx } from "@peersyst/react-utils";
import { ConnectedDotRoot } from "./ConnectedDot.styles";
import { ConnectedDotProps } from "./ConnectedDot.types";

export const ConnectedDot = ({ active, className }: ConnectedDotProps): JSX.Element => {
    return <ConnectedDotRoot className={cx("connected-dot", className)} active={active} data-testid="connectedDot" />;
};

export default ConnectedDot;
