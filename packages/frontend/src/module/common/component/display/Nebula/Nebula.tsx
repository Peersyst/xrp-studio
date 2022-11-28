import { cx } from "@peersyst/react-utils";
import { nebula, nebula_rotate } from "images";
import { NebulaRoot } from "./Nebula.styles";
import { NebulaProps } from "./Nebula.types";

export default function Nebula({ className, style, height, rotate, alt, variant }: NebulaProps): JSX.Element {
    return (
        <NebulaRoot height={height} rotate={rotate} className={cx("nebula", className)}>
            <img src={variant ? nebula_rotate : nebula} height={"100%"} width={"100%"} style={style} alt={cx("nebula", alt)} />
        </NebulaRoot>
    );
}
