import { useTheme } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { logo, logo_dark } from "images";
import { LogoProps } from "module/common/component/display/Logo/Logo.types";
import Link from "module/common/component/navigation/Link/Link";

export default function Logo({ className, style }: LogoProps): JSX.Element {
    const {
        palette: { mode },
    } = useTheme();

    return (
        <Link to="/" type="router">
            <img src={mode === "dark" ? logo : logo_dark} className={cx("Logo", className)} style={style} />
        </Link>
    );
}
