import { SvgIcon, SvgIconProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
export default function SunIcon({ className, ...rest }: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon {...rest} data-testid="SunIcon" className={cx(undefined, "Icon", className)} fill="none">
            <path
                d="M13 1V3.4M13 22.6V25M3.4 13H1M6.17694 6.17694L4.47988 4.47988M19.8231 6.17694L21.5201 4.47988M6.17694 19.828L4.47988 21.5251M19.8231 19.828L21.5201 21.5251M25 13H22.6M19 13C19 16.3137 16.3137 19 13 19C9.68629 19 7 16.3137 7 13C7 9.68629 9.68629 7 13 7C16.3137 7 19 9.68629 19 13Z"
                stroke="#008CFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </SvgIcon>
    );
}
