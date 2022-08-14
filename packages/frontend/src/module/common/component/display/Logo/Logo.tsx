import { cx } from "@peersyst/react-utils";
import { logo } from "images";
import { LogoProps } from "module/common/component/display/Logo/Logo.types";
import Link from "module/common/component/navigation/Link/Link";

export default function Logo({ className, style }: LogoProps): JSX.Element {
    return (
        <Link to="/" type="router">
            <img src={logo} alt={"logo"} className={cx("Logo", className)} style={style} />
        </Link>
    );
}
