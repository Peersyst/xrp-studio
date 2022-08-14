import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function CloseIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="CloseIcon" className={cx(undefined, "Icon", "CloseIcon", className)}>
            <path d="M23 1L1 23M1 1L23 23" stroke="#008CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    );
}
