import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function MinusCircleIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="MinusCircleIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path
                d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="#AEB3B7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </SvgIcon>
    );
}
