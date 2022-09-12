import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function FilterLinesIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="FilterLinesIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path d="M6 12H18M3 6H21M9 18H15" stroke="#008CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    );
}
