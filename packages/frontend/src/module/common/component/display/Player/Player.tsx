import { PlayerProps, WithSkeleton } from "@peersyst/react-components";
import { PlayIcon } from "icons";
import { PlayButton, PlayerRoot, PlayerSkeleton } from "module/common/component/display/Player/Player.styles";

const Player = ({ loading, ...rest }: WithSkeleton<Omit<PlayerProps, "light" | "playIcon">>): JSX.Element => (
    <PlayerSkeleton loading={loading} {...rest}>
        <PlayerRoot
            playIcon={
                <PlayButton>
                    <PlayIcon />
                </PlayButton>
            }
            {...rest}
        />
    </PlayerSkeleton>
);

export default Player;
