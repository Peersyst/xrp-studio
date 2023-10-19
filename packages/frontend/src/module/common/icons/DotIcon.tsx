import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function DotIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="DotIcon" className={cx(undefined, "Icon", className)} fill="none">
            <circle cx="8" cy="8" r="8" fill="#37FF33" fillOpacity="0.5" />
            <circle cx="8" cy="8" r="5.5" fill="#37FF33" />
        </SvgIcon>
    );
}
