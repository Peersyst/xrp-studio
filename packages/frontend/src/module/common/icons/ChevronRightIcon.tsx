import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function ChevronRightIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="ChevronRightIcon" className={cx(undefined, "Icon", "ChevronRightIcon", className)}>
            <path d="M9 18L15 12L9 6" stroke="#008CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    );
}
