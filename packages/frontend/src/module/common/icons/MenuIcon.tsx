import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function MenuIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="MenuIcon" className={cx(undefined, "Icon", "MenuIcon", className)}>
            <path d="M3 8.5H21M3 15.5H21" stroke="#008CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    );
}
