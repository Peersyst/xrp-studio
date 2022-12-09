import { useTheme } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { logo, logo_dark } from "images";
import { LogoProps } from "module/common/component/display/Logo/Logo.types";
import Link from "module/common/component/navigation/Link/Link";

export default function Logo({ className, style, fullSize = true }: LogoProps): JSX.Element {
    const {
        palette: { mode },
    } = useTheme();

    return (
        <Link to="/" type="router" style={{ width: !fullSize ? "2.25rem" : "fit-content", marginRight: !fullSize ? "1rem" : "0" }}>
            <img src={mode === "dark" ? logo : logo_dark} className={cx("Logo", className)} style={style} />
        </Link>
    );
}
