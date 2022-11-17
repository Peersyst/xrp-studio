import { PlayerProps } from "@peersyst/react-components";

const PlayerMock = ({ url }: PlayerProps): JSX.Element => <span data-testid="Player" data-url={url} />;

export default PlayerMock;
